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
import { v4 as uuid } from 'uuid';

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
          id: tp.player?.id || uuid(),
          name: tp.player?.name || 'Jogador Deletado',
          stars: tp.player?.stars || 0,
          winRate: tp.player ? Math.ceil(tp.player.winRate) : 0,
          matchs: tp.player?.matchs || 0,
          isDeleted: !tp.player,
        }));

      const team2 = match.teamPlayers
        .filter((tp) => tp.teamNumber === 2)
        .map((tp) => ({
          id: tp.player?.id || uuid(),
          name: tp.player?.name || 'Jogador Deletado',
          stars: tp.player?.stars || 0,
          winRate: tp.player ? Math.ceil(tp.player.winRate) : 0,
          matchs: tp.player?.matchs || 0,
          isDeleted: !tp.player,
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
        points: tp.player.points,
        id: tp.player?.id || uuid(),
        name: tp.player?.name || 'Jogador Deletado',
        stars: tp.player?.stars || 0,
        winRate: tp.player ? Math.ceil(tp.player.winRate) : 0,
        matchs: tp.player?.matchs || 0,
        isDeleted: !tp.player,
      }));

    const team2 = match.teamPlayers
      .filter((tp) => tp.teamNumber === 2)
      .map((tp) => ({
        points: tp.player.points,
        id: tp.player?.id || uuid(),
        name: tp.player?.name || 'Jogador Deletado',
        stars: tp.player?.stars || 0,
        winRate: tp.player ? Math.ceil(tp.player.winRate) : 0,
        matchs: tp.player?.matchs || 0,
        isDeleted: !tp.player,
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
    // 1. Busca a partida com os relacionamentos
    const match = await this.matchsRepository.findOne({
      where: { id },
      relations: ['teamPlayers', 'teamPlayers.player'],
    });

    if (!match) {
      throw new NotFoundException('Partida não encontrada');
    }

    // 2. Verifica se houve mudança no vencedor
    if (
      (match.winner === 0 && updateMatchDto.winner !== 0) ||
      (match.winner !== 0 && updateMatchDto.winner !== match.winner)
    ) {
      // 3. Atualiza o tempo da partida se for a primeira definição
      if (match.winner === 0) {
        match.matchTime =
          new Date().getTime() - new Date(match.createdAt).getTime();
      }

      // 4. Separa vencedores e perdedores
      const winners = match.teamPlayers
        .filter((tp) => tp.teamNumber === updateMatchDto.winner)
        .map((tp) => tp.player);

      const losers = match.teamPlayers
        .filter((tp) => tp.teamNumber !== updateMatchDto.winner)
        .map((tp) => tp.player);

      // 5. Cálculo do Elo
      const avgWinnerPoints =
        winners.reduce((sum, p) => sum + p.points, 0) / winners.length;
      const avgLoserPoints =
        losers.reduce((sum, p) => sum + p.points, 0) / losers.length;
      const expectedWin =
        1 / (1 + Math.pow(10, (avgLoserPoints - avgWinnerPoints) / 400));

      const K = 140;
      const winnerPointsChange = K * (1 - expectedWin);
      const loserPointsChange = winnerPointsChange * -0.7; // 70% dos pontos

      match.pointsChanges = {};

      winners.forEach((player) => {
        match.pointsChanges[player.id] = winnerPointsChange;
      });

      losers.forEach((player) => {
        match.pointsChanges[player.id] = loserPointsChange;
      });

      // 6. Atualiza os jogadores no banco de dados
      await Promise.all([
        // Vencedores
        this.playersRepository
          .createQueryBuilder()
          .update(Players)
          .set({
            points: () => `points + ${winnerPointsChange}`,
            wins: () => `wins + 1`,
          })
          .where({ id: In(winners.map((p) => p.id)) })
          .execute(),

        // Perdedores
        this.playersRepository
          .createQueryBuilder()
          .update(Players)
          .set({
            points: () => `points + ${loserPointsChange}`,
            loses: () => `loses + 1`,
          })
          .where({ id: In(losers.map((p) => p.id)) })
          .execute(),
      ]);

      // 7. Recarrega TODOS os dados dos jogadores atualizados
      const updatedPlayers = await this.playersRepository.find({
        where: { id: In([...winners, ...losers].map((p) => p.id)) },
      });

      // 8. Atualiza as referências na partida
      match.teamPlayers.forEach((tp) => {
        const updatedPlayer = updatedPlayers.find((p) => p.id === tp.player.id);
        if (updatedPlayer) {
          tp.player = updatedPlayer;
        }
      });

      match.winner = updateMatchDto.winner;
    }

    // 9. Salva e retorna a partida com dados atualizados
    const updatedMatch = await this.matchsRepository.save(match);

    return {
      ...updatedMatch,
      winnerPoints: match.pointsChanges,
      teamPlayers: updatedMatch.teamPlayers.map((team) => ({
        ...team,
        player: {
          ...team.player,
          points: team.player.points,
          rank: team.player.rank,
          winRate: Math.ceil(team.player.winRate) || 0,
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
        return {
          name: player.name,
          points: player.points,
          stars: player.stars,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });

      const team2R = team2.map((player) => {
        return {
          name: player.name,
          points: player.points,
          stars: player.stars,
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
        return {
          name: player.name,
          points: player.points,
          stars: player.stars,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });

      const team2R = team2.map((player) => {
        return {
          name: player.name,
          points: player.points,
          stars: player.stars,
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
          points: player.points,
          stars: player.stars,
          winRate: Math.ceil(player.winRate),
          matchs: player.matchs,
        };
      });

      const team2R = team2.map((player) => {
        return {
          name: player.name,
          points: player.points,
          stars: player.stars,
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

  async PlayerMatchs(id: string, tokenPayloadDto: TokenPayloadDto) {
    try {
      const matches = await this.matchsRepository
        .createQueryBuilder('match')
        .innerJoinAndSelect('match.teamPlayers', 'teamPlayer')
        .innerJoinAndSelect('teamPlayer.player', 'player')
        .leftJoinAndSelect('match.teamPlayers', 'allTeamPlayers')
        .leftJoinAndSelect('allTeamPlayers.player', 'allPlayers')
        .where('player.id = :id', { id })
        .andWhere('player.userId = :idUser', { idUser: tokenPayloadDto.sub })
        .orderBy('match.createdAt', 'DESC')
        .getMany();

      return matches.map((match) => {
        // Identifica o time do jogador
        const playerTeam = match.teamPlayers.find(
          (tp) => tp.player?.id === id,
        )?.teamNumber;

        // Calcula os pontos ganhos/perdidos
        let pointsDiff = 0;
        if (match.winner !== 0) {
          // Encontra o jogador específico na partida
          const playerInMatch = match.teamPlayers.find(
            (tp) => tp.player?.id === id,
          );

          if (playerInMatch) {
            const currentPoints = playerInMatch.player?.points || 0;
            // Você precisaria ter armazenado os pontos antes da partida ou calcular a diferença
            // Como solução alternativa, podemos estimar baseado no resultado:
            const basePoints = match.winner === playerTeam ? 20 : -10; // Valores exemplos
            pointsDiff =
              match.winner === playerTeam
                ? Math.abs(
                    basePoints * (1 + (playerInMatch.player?.stars || 0) / 10),
                  )
                : -Math.abs(
                    basePoints * (1 + (playerInMatch.player?.stars || 0) / 10),
                  );
          }
        }

        const team1 = match.teamPlayers
          .filter((tp) => tp.teamNumber === 1)
          .map((tp) => ({
            id: tp.player?.id || uuid(),
            points: tp.player?.points,
            name: tp.player?.name || 'Jogador Deletado',
            stars: tp.player?.stars || 0,
            winRate: tp.player ? Math.ceil(tp.player.winRate) : 0,
            matchs: tp.player?.matchs || 0,
            isDeleted: !tp.player,
          }));

        const team2 = match.teamPlayers
          .filter((tp) => tp.teamNumber === 2)
          .map((tp) => ({
            id: tp.player?.id || uuid(),
            points: tp.player?.points,
            name: tp.player?.name || 'Jogador Deletado',
            stars: tp.player?.stars || 0,
            winRate: tp.player ? Math.ceil(tp.player.winRate) : 0,
            matchs: tp.player?.matchs || 0,
            isDeleted: !tp.player,
          }));

        let playerWon = 0;
        if (match.winner !== 0) {
          playerWon = match.winner === playerTeam ? 1 : 2;
        }

        return {
          id: match.id,
          winner: match.winner,
          matchTime: match.matchTime,
          createdAt: match.createdAt,
          updatedAt: match.updatedAt,
          team1,
          team2,
          playerWon,
          pointsChange: Math.ceil(match.pointsChanges?.[id]) || 0,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
