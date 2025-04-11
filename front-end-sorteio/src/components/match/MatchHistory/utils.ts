import Player from '@/types/playerType';

export const calculateTeamStars = (team: Player[]) => {
  return team.reduce((sum, player) => sum + (player.stars || 0), 0) / team.length || 0;
};


export const formatDate = (dateString: string) => {
  if (typeof window !== 'undefined') {
    const date = new Date(dateString);
    const months = [
      'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 
      'jul', 'ago', 'set', 'out', 'nov', 'dez'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  return dateString;
};

