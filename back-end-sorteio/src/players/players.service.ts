import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Players } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Players)
    private readonly playersRepository: Repository<Players>,
  ) {}

  async create(
    createPlayerDto: CreatePlayerDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const player = this.playersRepository.create(createPlayerDto);
    const newPlayer = {
      id: uuid(),
      ...player,
      winRate: player.winRate,
      matchs: player.matchs,
      rank: player.rank,
      userId: tokenPayload.sub,
    };
    await this.playersRepository.save(newPlayer);
    return newPlayer;
  }

  async findAll(filters: { userId: string; name?: string }) {
    const { userId, name } = filters;

    const query = this.playersRepository
      .createQueryBuilder('player')
      .where('player.userId = :userId', { userId })
      .andWhere('player.deleted_at IS NULL');

    if (name) {
      query.andWhere('LOWER(player.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    const queryResult = await query.getMany();

    const allPlayers = queryResult.map((player) => {
      return {
        id: player.id,
        name: player.name,
        rank: player.rank,
        stars: player.stars,
        winRate: Math.ceil(player.winRate),
        wins: player.wins,
        loses: player.loses,
        points: player.points,
        matchs: player.matchs,
        idealStar: player.idealStar,
        isActive: player.isActive,
        createdAt: player.createdAt,
      };
    });

    return allPlayers;
  }

  async findOne(id: string) {
    const player = await this.playersRepository.findOne({
      where: { id, deleted_at: null },
    });

    if (!player) {
      throw new NotFoundException('Player não encontrado.');
    }

    return {
      ...player,
      winRate: Math.ceil(player.winRate),
      rank: player.rank,
      matchs: player.matchs,
      points: player.points,
    };
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playersRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException('Player não encontrado.');
    }

    player.name = updatePlayerDto?.name ?? player.name;
    player.stars = updatePlayerDto?.stars ?? player.stars;
    player.wins = updatePlayerDto?.wins ?? player.wins;
    player.isActive =
      updatePlayerDto?.isActive === undefined
        ? player.isActive
        : Boolean(updatePlayerDto.isActive);

    const playersDatas = await this.playersRepository.save(player);

    return {
      ...playersDatas,
      winRate: Math.ceil(playersDatas.winRate),
      rank: playersDatas.rank,
      matchs: playersDatas.matchs,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const player = await this.playersRepository.findOne({ where: { id } });

      if (!player) {
        throw new NotFoundException('Jogador não encontrado.');
      }

      player.deleted_at = new Date(); // Marca como deletado (soft delete)
      await this.playersRepository.save(player);

      return { message: 'Jogador marcado como deletado.' };
    } catch (error) {
      console.error('Erro ao deletar jogador:', error);
      throw new InternalServerErrorException(
        'Erro ao tentar deletar o jogador.',
      );
    }
  }

  async betterBalancedPlayers(token: TokenPayloadDto) {
    const allPlayers = await this.playersRepository.find({
      where: { userId: token.sub },
    });
  
    const betterPlayers = allPlayers
      .map((player) => {
        const difference = Math.abs(player.idealStar - player.stars);
        return {
          ...player,
          difference,
          matchs: player.matchs,
          wins: player.wins,
          loses: player.loses,
          rank: player.rank,
          points: player.points,
          winRate: Math.ceil(player.winRate), // opcional arredondar aqui
          idealStar: player.idealStar,
        };
      })
      .sort((a, b) => {
        // Ordena por:
        // 1. Menor diferença entre stars e idealStar
        // 2. Mais partidas jogadas
        // 3. Maior winRate
        if (a.difference !== b.difference) {
          return a.difference - b.difference;
        } else if (a.matchs !== b.matchs) {
          return b.matchs - a.matchs;
        } else {
          return b.winRate - a.winRate;
        }
      })
      .slice(0, 10); // Retorna apenas os 10 melhores
  
      return { betterPlayers };
  }
  

  async betterPlayers(token: TokenPayloadDto) {
    const allPlayers = await this.playersRepository.find({
      where: { userId: token.sub, deleted_at: null },
    });
  
    const betterPlayers = allPlayers
      .sort((a, b) => {
        // Criando uma pontuação que combina win rate e número de partidas
        // Multiplicamos o win rate pela raiz quadrada do número de partidas
        // para dar mais peso aos jogadores com mais experiência, mas sem penalizar
        // demais os novos jogadores com bom desempenho
        const scoreA = a.winRate * Math.sqrt(a.matchs);
        const scoreB = b.winRate * Math.sqrt(b.matchs);
        return scoreB - scoreA; // Ordenação decrescente
      })
      .slice(0, 10)
      .map((player) => {
        return {
          id: player.id,
          name: player.name,
          stars: player.stars,
          wins: player.wins,
          loses: player.loses,
          rank: player.rank,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });
  
    return { betterPlayers };
  }

  async ranking(token: TokenPayloadDto) {
    const allPlayers = await this.playersRepository.find({
      where: { userId: token.sub, deleted_at: null },
      order: { points: 'DESC'}
    });
  
    const betterPlayers = allPlayers
      .slice(0, 10)
      .map((player) => {
        return {
          id: player.id,
          name: player.name,
          stars: player.stars,
          wins: player.wins,
          loses: player.loses,
          rank: player.rank,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
          points: player.points,
        };
      });
  
    return { betterPlayers };
  }
}
