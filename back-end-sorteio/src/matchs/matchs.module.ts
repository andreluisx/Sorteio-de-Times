import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { PlayersModule } from 'src/players/players.module';
import { TeamPlayer } from './entities/team-player.entity';
import { ListService } from './list.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match, TeamPlayer]), PlayersModule, AuthModule],
  controllers: [MatchsController],
  providers: [MatchsService, ListService],
  exports: [TypeOrmModule.forFeature([Match])],
})
export class MatchsModule {}
