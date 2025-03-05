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

  get rank(): string {
    if (this.winRate > 70) {
      return 'challenger';
    } else if (this.winRate > 60) {
      return 'grão-mestre';
    } else if (this.winRate > 55) {
      return 'diamante';
    } else if (this.winRate > 49) {
      return 'esmeralda';
    } else if (this.winRate > 39) {
      return 'gold';
    } else if (this.winRate > 20) {
      return 'prata';
    } else {
      return 'ferro';
    }
  }
}

// 0 >= 20 (prata) 20 >= 40 (gold) 40 >= 50 (platina) 51 >= 55 (esmeralda) 55 >= 61 (diamante) 61 >= 70 (grao mestre) 70+ (challenger)//