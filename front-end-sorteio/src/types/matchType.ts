import Player from './playerType'

export interface IMatchTextType {
  playerWon: number,
}

export interface IMatchType {
  id: number;
  team1: Player[];
  team2: Player[];
  playerWon?: number;
  winner: number;
  createdAt: string;
  matchTime: number;
}