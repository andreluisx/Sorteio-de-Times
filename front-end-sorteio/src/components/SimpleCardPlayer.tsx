import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  name: string;
  winRate?: number;
  matchs: number;
  stars: number;
  onClick?: () => void;
  points?: number;
  showPoints?: boolean;
}

export default function SimpleCardPlayer({
  name,
  winRate,
  matchs,
  stars,
  onClick,
  points,
  showPoints = true,
}: PlayerCardProps) {
  // Determina a cor com base no winRate
  const getWinRateColor = (rate?: number) => {
    if (rate === undefined) return 'text-slate-400';
    if (rate >= 60) return 'text-green-400';
    if (rate >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Determina a cor dos pontos baseado no valor
  const getPointsColor = (pts?: number) => {
    if (!pts) return 'text-slate-400';
    if (pts >= 1800) return 'text-purple-400';
    if (pts >= 1600) return 'text-blue-400';
    if (pts >= 1400) return 'text-emerald-400';
    if (pts >= 1200) return 'text-yellow-400';
    return 'text-slate-300';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="w-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-3 shadow-lg shadow-black/20 hover:border-red-500/30 transition-all duration-200">
        {/* Top Row - Name and Points */}
        <div className="flex justify-between items-start w-full">
          <h3 className="text-xl font-bold truncate text-slate-100 hover:text-white transition-colors">
            {name}
          </h3>
          
          {showPoints && points !== undefined && (
            <div className="flex items-center gap-1">
              <span className={`text-sm font-mono font-bold ${getPointsColor(points)}`}>
                {points}
              </span>
              <span className="text-xs text-slate-500">pts</span>
            </div>
          )}
        </div>

        {/* Middle Row - Win Rate and Matches */}
        {winRate !== undefined && (
          <div className="mt-2 flex items-center gap-2">
            <span className={`text-sm font-medium ${getWinRateColor(winRate)}`}>
              {winRate}% WinRate
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-sm text-slate-400">
              {matchs} {matchs === 1 ? 'game' : 'games'}
            </span>
          </div>
        )}

        {/* Bottom Row - Stars Rating */}
        <div className="mt-3 flex items-center justify-between">
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
          
          {!showPoints && points !== undefined && (
            <span className={`text-xs font-mono ${getPointsColor(points)}`}>
              {points} pts
            </span>
          )}
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}