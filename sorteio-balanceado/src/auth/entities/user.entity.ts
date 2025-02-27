import { Match } from 'src/matchs/entities/match.entity';
import { Players } from 'src/players/entities/player.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Players, (players) => players.user)
  players: Players[];

  @OneToMany(() => Match, (matchs) => matchs.user)
  matchs: Match;
}
