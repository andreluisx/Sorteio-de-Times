// match.entity.ts
import { Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamPlayer } from './team-player.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => TeamPlayer, (teamPlayer) => teamPlayer.match, {
    cascade: true,
    eager: true,
  })
  teamPlayers: TeamPlayer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  @Max(2)
  @Min(0)
  winner: number;

  @Column({ type: 'bigint', nullable: true })
  matchTime: number | null;

  @ManyToOne(() => User, (user) => user.matchs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column('simple-json', { nullable: true })
  pointsChanges: Record<string, number>; // { [playerId]: pointsChange }
}
