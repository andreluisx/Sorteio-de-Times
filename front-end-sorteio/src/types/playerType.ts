export default interface Player {
  id: string;
  name: string;
  matchs: number;
  stars: number;
  winRate: number;
  rank: string;
  wins: number;
  loses: number;
  status?: string;
}