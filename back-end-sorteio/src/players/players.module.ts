import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Players } from './entities/player.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([Players])],
  providers: [PlayersService],
  controllers: [PlayersController],
  exports: [TypeOrmModule.forFeature([Players])],
})
export class PlayersModule {}
