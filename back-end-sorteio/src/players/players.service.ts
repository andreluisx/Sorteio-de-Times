import {
  Delete,
  Get,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Players } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { date } from 'joi';
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
    const betterBalanced = allPlayers
      .filter((player) => {
        const difference = Math.abs(player.idealStar - player.stars);
        return difference <= 1;
      })
      .map((player) => {
        return {
          ...player,
          matchs: player.matchs,
          winRate: Math.ceil(player.winRate),
          idealStar: player.idealStar,
        };
      });
    const balanced = allPlayers
      .filter((player) => {
        const difference = Math.abs(player.idealStar - player.stars);
        return difference <= 3;
      })
      .map((player) => {
        return {
          ...player,
          matchs: player.matchs,
          winRate: Math.ceil(player.winRate),
          idealStar: player.idealStar,
        };
      });

    const worstBalanced = allPlayers
      .filter((player) => {
        const difference = Math.abs(player.idealStar - player.stars);
        return difference > 3;
      })
      .map((player) => {
        return {
          ...player,
          matchs: player.matchs,
          winRate: Math.ceil(player.winRate),
          idealStar: player.idealStar,
        };
      });

    return { betterBalanced, balanced, worstBalanced };
  }

  async betterPlayers(token: TokenPayloadDto) {
    const allPlayers = await this.playersRepository.find({
      where: { userId: token.sub, deleted_at: null },
    });

    const betterPlayers = allPlayers
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, 5)
      .map((player) => {
        return {
          id: player.id,
          name: player.name,
          stars: player.stars,
          wins: player.wins,
          loses: player.loses,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });

    return { betterPlayers };
  }
}
