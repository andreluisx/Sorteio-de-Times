'use client';
import Player from '@/types/playerType';
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';

interface PlayerCardProps {
  player: Player;
  position: number;
}

const getMedalColor = (position: number) => {
  switch (position) {
    case 0: return 'bg-yellow-500';
    case 1: return 'bg-gray-400';
    case 2: return 'bg-amber-700';
    default: return 'bg-gray-800';
  }
};

export default function PlayerCard({ player, position }: PlayerCardProps) {
  return (
    <div className={`lg:w-3/5 w-full max-w-3xl bg-slate-800/80 border-slate-600 backdrop-blur-sm rounded-lg p-4 mb-6 transform transition-all duration-300 hover:scale-105 border-l-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${getMedalColor(position)}`}>
            {position + 1}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">{player.name}</h2>
            <div className="flex items-center">
              <div className="pt-2 flex flex-col lg:flex-row">
                <Rating
                  name="customized-10"
                  size={'small'}
                  readOnly
                  defaultValue={player.stars}
                  max={10}
                  emptyIcon={<StarIcon style={{ opacity: 0.9, color: '#121a31' }} fontSize="inherit" />}
                />
                <span className="text-gray-400 lg:pl-2 text-sm">
                  {player.wins}W - {player.loses}L / {player.matchs} partidas
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl md:text-3xl font-bold ${
            player.winRate > 75 ? 'text-green-400' : 
            player.winRate > 40 ? 'text-yellow-400' : 'text-red-500'
          }`}>
            {player.winRate}%
          </div>
          <div className="text-gray-400 text-sm">Win Rate</div>
        </div>
      </div>

      <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${
            player.winRate > 60 ? 'bg-green-400' : 
            player.winRate > 40 ? 'bg-yellow-400' : 'bg-red-500'
          }`} 
          style={{ width: `${player.winRate}%` }}
        ></div>
      </div>
    </div>
  );
}