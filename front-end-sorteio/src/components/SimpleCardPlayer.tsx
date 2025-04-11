import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  name: string;
  winRate?: number;
  matchs: number;
  stars: number;
  onClick?: () => void;
}

export default function SimpleCardPlayer({
  name,
  winRate,
  matchs,
  stars,
  onClick
}: PlayerCardProps) {
  // Determina a cor com base no winRate
  const getWinRateColor = (rate?: number) => {
    if (rate === undefined) return 'text-slate-400';
    if (rate >= 60) return 'text-green-400';
    if (rate >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="w-full flex items-center justify-between bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-2 shadow-lg shadow-black/20 hover:border-red-500/30 transition-all duration-200">
        {/* Informações do jogador */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold truncate text-slate-100 hover:text-white transition-colors">
            {name}
          </h3>
          
          {/* Win Rate e Partidas */}
          {winRate !== undefined && (
            <div className="mt-1 flex items-center gap-2 text-center w-full justify-center">
              <span className={`text-sm font-medium ${getWinRateColor(winRate)}`}>
                {winRate}% vitórias
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-sm text-slate-400">
                {matchs} {matchs === 1 ? 'partida' : 'partidas'}
              </span>
            </div>
          )}
          
          {/* Rating */}
          <div className="mt-3 flex items-center justify-center">
            <Rating
              name="player-rating"
              size="small"
              readOnly
              value={stars}
              max={10}
              precision={0.5}
              icon={<StarIcon className="text-yellow-400" fontSize="inherit" />}
              emptyIcon={<StarIcon className="text-slate-700" fontSize="inherit" />}
            />
           
          </div>
        </div>

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}