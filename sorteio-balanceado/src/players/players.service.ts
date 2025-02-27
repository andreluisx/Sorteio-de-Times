import {
  Delete,
  Get,
  Injectable,
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
      userId: tokenPayload.sub,
    };
    await this.playersRepository.save(newPlayer);
    return newPlayer;
  }

  async findAll(filters: { userId: string; name?: string }) {
    const { userId, name } = filters;

    const query = this.playersRepository
      .createQueryBuilder('player')
      .where('player.userId = :userId', { userId });

    if (name) {
      query.andWhere('LOWER(player.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    const queryResult = await query.getMany()

    const allPlayers = queryResult.map((player)=>{
      return {
        id: player.id,
        name: player.name,
        stars: player.stars,
        winRate: Math.ceil(player.winRate),
        wins: player.wins,
        loses: player.loses,
        matchs: player.matchs,
        isActive: player.isActive,
        createdAt: player.createdAt,
      }
    })

    return allPlayers;
  }

  @Get(':id')
  async findOne(id: string) {
    const player = await this.playersRepository.findOneBy({ id: id });

    if (!player) {
      throw new NotFoundException('Player não encontrado.');
    }

    return player;
  }

  @Patch(':id')
  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playersRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException('Player não encontrado.');
    }

    player.name = updatePlayerDto?.name ?? player.name;
    player.stars = updatePlayerDto?.stars ?? player.stars;
    player.isActive =
      updatePlayerDto?.isActive === undefined
        ? player.isActive
        : Boolean(updatePlayerDto.isActive);

    return await this.playersRepository.save(player);
  }

  @Delete()
  async remove(id: string) {
    const player = await this.playersRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException('Player não encontrado.');
    }
    return await this.playersRepository.remove(player);
  }
}
