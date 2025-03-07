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
    const team1Players = await this.playersRepository.findBy({
      id: In(createMatchDto.team1),
    });

    // Buscar jogadores para o time 2
    const team2Players = await this.playersRepository.findBy({
      id: In(createMatchDto.team2),
    });

    // Criar associações para time 1
    const team1Associations = team1Players.map((player) => {
      const teamPlayer = new TeamPlayer();
      teamPlayer.match = match;
      teamPlayer.player = player;
      teamPlayer.teamNumber = 1;
      return teamPlayer;
    });

    // Criar associações para time 2
    const team2Associations = team2Players.map((player) => {
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
      const team1 = match.teamPlayers
        .filter((tp) => tp.teamNumber === 1)
        .map((tp) => ({
          name: tp.player.name,
          star: tp.player.stars,
          winRate: Math.ceil(tp.player.winRate),
          matchs: tp.player.matchs,
        }));

      const team2 = match.teamPlayers
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
        team1,
        team2,
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

    const team1 = match.teamPlayers
      .filter((tp) => tp.teamNumber === 1)
      .map((tp) => ({
        name: tp.player.name,
        stars: tp.player.stars,
        winRate: Math.ceil(tp.player.winRate),
        matchs: tp.player.matchs,
      }));

    const team2 = match.teamPlayers
      .filter((tp) => tp.teamNumber === 2)
      .map((tp) => ({
        name: tp.player.name,
        stars: tp.player.stars,
        winRate: Math.ceil(tp.player.winRate),
        matchs: tp.player.matchs,
      }));

    return {
      id: match.id,
      createdAt: match.createdAt,
      updatedAt: match.updatedAt,
      winner: match.winner,
      matchTime: match.matchTime,
      team1,
      team2,
    };
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.matchsRepository.findOneBy({ id });

    if (!match) {
      throw new NotFoundException('Partida não encontrada.');
    }

    // Verificamos se estamos definindo um vencedor (onde antes não havia)
    // OU se estamos mudando o vencedor previamente definido
    if ((match.winner === 0 && updateMatchDto.winner !== 0) || 
        (match.winner !== 0 && updateMatchDto.winner !== match.winner && updateMatchDto.winner !== 0)) {
      
      // Atualizamos o tempo de partida apenas se estamos definindo o vencedor pela primeira vez
      if (match.winner === 0) {
        const created = new Date(match.createdAt).getTime();
        const updated = new Date().getTime();
        match.matchTime = updated - created;
      }

      const winners: string[] = [];
      const losers: string[] = [];

      // Coletamos os IDs dos jogadores com base no novo valor do vencedor
      for (const team of match.teamPlayers) {
        if (team.teamNumber === updateMatchDto.winner) {
          winners.push(team.player.id);
        } else {
          losers.push(team.player.id);
        }
      }

      // Se tivermos jogadores vencedores, atualizamos seus contadores de vitórias
      if (winners.length > 0) {
        await this.playersRepository.update(
          { id: In(winners) },
          { wins: () => `wins + 1` },
        );
      }

      // Se tivermos jogadores perdedores, atualizamos seus contadores de derrotas
      if (losers.length > 0) {
        await this.playersRepository.update(
          { id: In(losers) },
          { loses: () => `loses + 1` },
        );
      }

      // Atualizamos o vencedor da partida
      match.winner = updateMatchDto.winner;
    }

    // Salvamos as alterações da partida
    const updatedMatch = await this.matchsRepository.save(match);

    // Retornamos a partida atualizada com os dados dos jogadores
    return {
        ...updatedMatch,
        teamPlayers: updatedMatch.teamPlayers.map((team) => ({
            ...team,
            player: {
                ...team.player,
                matchs: team.player.matchs,
                winRate: Math.ceil(team.player.winRate), 
                rank: team.player.rank, 
            },
        })),
    };
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
        return { name: player.name, stars: player.stars, winRate: Math.ceil(player.winRate), matchs: player.matchs };
      });

      const team2R = team2.map((player) => {
        return { name: player.name, stars: player.stars, winRate: Math.ceil(player.winRate), matchs: player.matchs };
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
        return { name: player.name, stars: player.stars, winRate: Math.ceil(player.winRate), matchs: player.matchs };
      });

      const team2R = team2.map((player) => {
        return { name: player.name, stars: player.stars, winRate: Math.ceil(player.winRate), matchs: player.matchs };
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
        return { name: player.name, stars: player.stars, winRate: Math.ceil(player.winRate), matchs: player.matchs };
      });

      const team2R = team2.map((player) => {
        return { name: player.name, stars: player.stars, winRate: Math.ceil(player.winRate), matchs: player.matchs };
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

  async PlayerMatchs(id: string) {
    try {
      const matches = await this.matchsRepository
        .createQueryBuilder('match')
        .innerJoinAndSelect('match.teamPlayers', 'teamPlayer') // Carrega todos os TeamPlayers
        .innerJoinAndSelect('teamPlayer.player', 'player') // Carrega todos os Players
        .leftJoinAndSelect('match.teamPlayers', 'allTeamPlayers') // Carrega todos os TeamPlayers novamente
        .leftJoinAndSelect('allTeamPlayers.player', 'allPlayers') // Carrega todos os Players novamente
        .where('player.id = :id', { id })
        .orderBy('match', 'DESC') // Filtra as partidas em que o jogador participa
        .getMany();
  
      // Estrutura os dados para incluir team1, team2 e userWon
      return matches.map(match => {
        const team1 = match.teamPlayers
          .filter(tp => tp.teamNumber === 1) // Filtra os jogadores do time 1
          .map(tp => tp.player); // Extrai os jogadores
  
        const team2 = match.teamPlayers
          .filter(tp => tp.teamNumber === 2) // Filtra os jogadores do time 2
          .map(tp => tp.player); // Extrai os jogadores
  
        // Verifica se o usuário ganhou a partida
        let playerWon = 0
        const userTeam = match.teamPlayers.find(tp => tp.player.id === id)?.teamNumber;
        if(match.winner === 0){
          playerWon = 0
        }
        else if(userTeam === match.winner){
          playerWon = 1
        }
        else if(userTeam !== match.winner && match.winner !== 0){
          playerWon = 2
        }
  
        return {
          id: match.id,
          winner: match.winner,
          matchTime: match.matchTime,
          createdAt: match.createdAt,
          updatedAt: match.updatedAt,
          team1, // Time 1 com os jogadores
          team2, // Time 2 com os jogadores
          playerWon, // true se o usuário ganhou, false caso contrário
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }

}