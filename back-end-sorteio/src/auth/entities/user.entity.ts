import { Match } from 'src/matchs/entities/match.entity';
import { Players } from 'src/players/entities/player.entity';
import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  isPremium: boolean;

  @Column({default: false})
  twoFactor: boolean;

  @OneToMany(() => Players, (players) => players.user)
  players: Players[];

  @OneToMany(() => Match, (matchs) => matchs.user)
  matchs: Match;
}
