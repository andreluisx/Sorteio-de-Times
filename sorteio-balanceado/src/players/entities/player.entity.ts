import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Players {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  stars: number;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  loses: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.players, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  get winRate(): number {
    const totalGames = this.wins + this.loses;
    return totalGames > 0 ? (this.wins / totalGames) * 100 : 0;
  }

  get matchs(): number {
    return this.wins + this.loses;
  }
}
