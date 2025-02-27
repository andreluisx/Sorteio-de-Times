import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { PlayersModule } from 'src/players/players.module';
import { TeamPlayer } from './entities/team-player.entity';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, TeamPlayer]), PlayersModule],
  controllers: [MatchsController],
  providers: [MatchsService, ListService],
  exports: [TypeOrmModule.forFeature([Match])],
})
export class MatchsModule {}
