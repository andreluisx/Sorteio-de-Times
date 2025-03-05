import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { Players } from 'src/players/entities/player.entity';

@Entity()
export class TeamPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.teamPlayers, {
    onDelete: 'CASCADE',
  })
  match: Match;

  @ManyToOne(() => Players, { eager: true })
  player: Players;

  @Column()
  teamNumber: number;
}
