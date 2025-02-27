import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { TeamPlayer } from './entities/team-player.entity';
import { Players } from '../players/entities/player.entity';
import { UpdateMatchDto } from './dto/update-match.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { RandomMatchDto } from './dto/create-random-match.dto';
import { ListService } from './list.service';
import { BalancedTypes } from './utils/balanced-types.enum';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match)
    private matchsRepository: Repository<Match>,
    @InjectRepository(TeamPlayer)
    private teamPlayerRepository: Repository<TeamPlayer>,
    @InjectRepository(Players)
    private playersRepository: Repository<Players>,
    private readonly listService: ListService,
  ) {}

  async create(
    createMatchDto: CreateMatchDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    // Criar uma nova partida
    const match = this.matchsRepository.create();
    match['userId'] = tokenPayloadDto?.sub ?? match['userId'];
    await this.matchsRepository.save(match);

    // Buscar jogadores para o time 1
    const time1Players = await this.playersRepository.findBy({
      id: In(createMatchDto.team1),
    });

    // Buscar jogadores para o time 2
    const time2Players = await this.playersRepository.findBy({
      id: In(createMatchDto.team2),
    });

    // Criar associações para time 1
    const team1Associations = time1Players.map((player) => {
      const teamPlayer = new TeamPlayer();
      teamPlayer.match = match;
      teamPlayer.player = player;
      teamPlayer.teamNumber = 1;
      return teamPlayer;
    });

    // Criar associações para time 2
    const team2Associations = time2Players.map((player) => {
      const teamPlayer = new TeamPlayer();
      teamPlayer.match = match;
      teamPlayer.player = player;
      teamPlayer.teamNumber = 2;
      return teamPlayer;
    });

    // Salvar todas as associações
    await this.teamPlayerRepository.save([
      ...team1Associations,
      ...team2Associations,
    ]);

    return this.findOne(match.id);
  }

  async findAll(tokenPayloadDto: TokenPayloadDto) {
    const matches = await this.matchsRepository.find({
      relations: ['teamPlayers', 'teamPlayers.player'],
      order: { createdAt: 'desc' },
      where: { userId: tokenPayloadDto.sub },
      select: {
        id: true,
        createdAt: true,
        winner: true,
        matchTime: true,
      },
    });

    return matches.map((match) => {
      const time1 = match.teamPlayers
        .filter((tp) => tp.teamNumber === 1)
        .map((tp) => ({
          name: tp.player.name,
          star: tp.player.stars,
          winRate: Math.ceil(tp.player.winRate),
          matchs: tp.player.matchs,
        }));

      const time2 = match.teamPlayers
        .filter((tp) => tp.teamNumber === 2)
        .map((tp) => ({
          name: tp.player.name,
          star: tp.player.stars,
          winRate: Math.ceil(tp.player.winRate),
          matchs: tp.player.matchs,
        }));

      return {
        id: match.id,
        createdAt: match.createdAt,
        updatedAt: match.updatedAt,
        winner: match.winner,
        matchTime: match.matchTime,
        time1,
        time2,
      };
    });
  }

  async findOne(id: number) {
    const match = await this.matchsRepository.findOne({
      where: { id },
      relations: ['teamPlayers', 'teamPlayers.player'],
    });

    if (!match) {
      throw new NotFoundException('Partida não encontrada.');
    }

    const time1 = match.teamPlayers
      .filter((tp) => tp.teamNumber === 1)
      .map((tp) => ({
        name: tp.player.name,
        star: tp.player.stars,
        winRate: Math.ceil(tp.player.winRate),
        matchs: tp.player.matchs,
      }));

    const time2 = match.teamPlayers
      .filter((tp) => tp.teamNumber === 2)
      .map((tp) => ({
        name: tp.player.name,
        star: tp.player.stars,
        winRate: Math.ceil(tp.player.winRate),
        matchs: tp.player.matchs,
      }));

    return {
      id: match.id,
      createdAt: match.createdAt,
      updatedAt: match.updatedAt,
      winner: match.winner,
      matchTime: match.matchTime,
      time1,
      time2,
    };
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.matchsRepository.findOneBy({ id });

    if (!match) {
      throw new NotFoundException('Partida não encontrada.');
    }

    if (match.winner === 0 && updateMatchDto.winner !== 0) {
      const created = new Date(match.createdAt).getTime();
      const updated = new Date().getTime();
      match.matchTime = updated - created;

      const winners: string[] = [];
      const losers: string[] = [];

      match.teamPlayers.forEach(async (team) => {
        if (team.teamNumber === match.winner) {
          winners.push(team.player.id);
        } else {
          losers.push(team.player.id);
        }
      });
      await this.playersRepository.update(
        { id: In(winners) },
        { wins: () => `wins + 1` },
      );

      await this.playersRepository.update(
        { id: In(losers) },
        { loses: () => `loses + 1` },
      );

      match.winner = updateMatchDto.winner;
    }

    return await this.matchsRepository.save(match);
  }

  async remove(id: number) {
    const match = await this.matchsRepository.findOneBy({ id });

    if (!match) {
      throw new NotFoundException('Partida não encontrada.');
    }

    return this.matchsRepository.remove(match);
  }

  async randomMatch(
    tokenPayloadDto: TokenPayloadDto,
    randomMatchDto: RandomMatchDto,
  ) {
    try {
      const match = this.matchsRepository.create();
      match['userId'] = tokenPayloadDto?.sub ?? match['userId'];
      await this.matchsRepository.save(match);

      const players = await this.playersRepository.findBy({
        id: In(randomMatchDto.players),
      });

      const listPlayersLength = players.length;

      if (listPlayersLength % 2 !== 0) {
        throw new BadRequestException(
          'A quantidade de jogadores tem que ser um número par',
        );
      }

      const sortedList = this.listService.shuffle(players);
      const [team1, team2] = this.listService.split(sortedList);
      // Criar associações para time 1
      const team1Associations = team1.map((player) => {
        const teamPlayer = new TeamPlayer();
        teamPlayer.match = match;
        teamPlayer.player = player;
        teamPlayer.teamNumber = 1;
        return teamPlayer;
      });

      const team2Associations = team2.map((player) => {
        const teamPlayer = new TeamPlayer();
        teamPlayer.match = match;
        teamPlayer.player = player;
        teamPlayer.teamNumber = 2;
        return teamPlayer;
      });

      await this.teamPlayerRepository.save([
        ...team1Associations,
        ...team2Associations,
      ]);
      const team1R = team1.map((player) => {
        return { name: player.name, star: player.stars };
      });

      const team2R = team2.map((player) => {
        return { name: player.name, star: player.stars };
      });

      return {
        id: match.id,
        matchTime: match.matchTime,
        winner: match.winner,
        createdAt: match.createdAt,
        team1: team1R,
        team2: team2R,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async starBalancedMatch(
    tokenPayloadDto: TokenPayloadDto,
    randomMatchDto: RandomMatchDto,
  ) {
    try {
      const match = this.matchsRepository.create();
      match['userId'] = tokenPayloadDto?.sub ?? match['userId'];
      await this.matchsRepository.save(match);

      // Buscar jogadores para o time 1
      const players = await this.playersRepository.findBy({
        id: In(randomMatchDto.players),
      });

      const listPlayersLength = players.length;

      if (listPlayersLength % 2 !== 0) {
        throw new BadRequestException(
          'A quantidade de jogadores tem que ser um número par',
        );
      }

      const [team1, team2] = this.listService.BalancedTeam(
        players,
        BalancedTypes.stars,
      );
      // Criar associações para time 1
      const team1Associations = team1.map((player) => {
        const teamPlayer = new TeamPlayer();
        teamPlayer.match = match;
        teamPlayer.player = player;
        teamPlayer.teamNumber = 1;
        return teamPlayer;
      });

      // Criar associações para time 2
      const team2Associations = team2.map((player) => {
        const teamPlayer = new TeamPlayer();
        teamPlayer.match = match;
        teamPlayer.player = player;
        teamPlayer.teamNumber = 2;
        return teamPlayer;
      });

      // Salvar todas as associações
      await this.teamPlayerRepository.save([
        ...team1Associations,
        ...team2Associations,
      ]);

      const team1R = team1.map((player) => {
        return { name: player.name, star: player.stars };
      });

      const team2R = team2.map((player) => {
        return { name: player.name, star: player.stars };
      });

      return {
        id: match.id,
        matchTime: match.matchTime,
        winner: match.winner,
        createdAt: match.createdAt,
        team1: team1R,
        team2: team2R,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async winRateBalancedMatch(
    tokenPayloadDto: TokenPayloadDto,
    randomMatchDto: RandomMatchDto,
  ) {
    try {
      const match = this.matchsRepository.create();
      match['userId'] = tokenPayloadDto?.sub ?? match['userId'];
      await this.matchsRepository.save(match);

      // Buscar jogadores para o time 1
      const players = await this.playersRepository.findBy({
        id: In(randomMatchDto.players),
      });

      const listPlayersLength = players.length;

      if (listPlayersLength % 2 !== 0) {
        throw new BadRequestException(
          'A quantidade de jogadores tem que ser um número par',
        );
      }

      const [team1, team2] = this.listService.BalancedTeam(
        players,
        BalancedTypes.winRate,
      );
      // Criar associações para time 1
      const team1Associations = team1.map((player) => {
        const teamPlayer = new TeamPlayer();
        teamPlayer.match = match;
        teamPlayer.player = player;
        teamPlayer.teamNumber = 1;
        return teamPlayer;
      });

      // Criar associações para time 2
      const team2Associations = team2.map((player) => {
        const teamPlayer = new TeamPlayer();
        teamPlayer.match = match;
        teamPlayer.player = player;
        teamPlayer.teamNumber = 2;
        return teamPlayer;
      });

      // Salvar todas as associações
      await this.teamPlayerRepository.save([
        ...team1Associations,
        ...team2Associations,
      ]);

      const team1R = team1.map((player) => {
        return {
          name: player.name,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });

      const team2R = team2.map((player) => {
        return {
          name: player.name,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });

      return {
        id: match.id,
        matchTime: match.matchTime,
        winner: match.winner,
        createdAt: match.createdAt,
        team1: team1R,
        team2: team2R,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
