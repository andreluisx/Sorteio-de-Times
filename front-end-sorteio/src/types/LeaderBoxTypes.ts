import Player from './playerType';

export interface LeaderboardProps {
  title: string;
  highlightText?: string;
  imageBackground: string;
  data: Player[];
  loading?: boolean;
  error?: string | null;
  onBack?: () => void;
}