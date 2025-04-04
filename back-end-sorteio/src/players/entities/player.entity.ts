import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  AfterLoad,
  ViewColumn,
  DeleteDateColumn,
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

  @DeleteDateColumn({ default: null }) // Coluna que indica se foi "deletado"
  deleted_at?: Date;

  get matchs(): number {
    return this.wins + this.loses;
  }

  get idealStar(): number {
    const idealWinRate = 65; // WinRate ideal
    const winRate = this.winRate;

    const deviation = Math.abs(winRate - idealWinRate);
    // exemplo   15  =  50 - 65
    // Define o número de estrelas com base no desvio
    if (deviation <= 7) {
      return 10; // (winRate maior que 58%)
    } else if (deviation <= 10) {
      return 9; // (winRate maior que 55%)
    } else if (deviation <= 15) {
      return 8; // (winRate maior que 50%)
    } else if (deviation <= 20) {
      return 7; // (winRate maior que 45%)
    } else if (deviation <= 24) {
      return 6; // (winRate maior que 40%)
    } else if (deviation <= 36) {
      return 4; // (winRate maior que 29%)
    } else if (deviation <= 42) {
      return 2; // (winRate maior que 23%)
    } else {
      return 1; // Muito distante do ideal (abaixo de 23%)
    }
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
