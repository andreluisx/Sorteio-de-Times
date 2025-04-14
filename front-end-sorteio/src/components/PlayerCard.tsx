import { Rating } from '@mui/material';
import { RankRender } from '@/components/RanksRender';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  name: string;
  winRate?: number;
  matchs: number;
  stars: number;
  rank: string;
  onClick?: () => void;
  className?: string;
  points?: number;
}

const winRateRender = (winRate: number | undefined, matchs: number) => {
  if (winRate === undefined) return null;

  const winRateColor =
    winRate >= 60
      ? 'text-green-400'
      : winRate >= 40
      ? 'text-yellow-400'
      : 'text-red-400';

  return (
    <p className={`text-sm font-medium ${winRateColor}`}>
      {winRate}% vitórias • {matchs} {matchs === 1 ? 'partida' : 'partidas'}
    </p>
  );
};

export default function PlayerCard({
  name,
  winRate,
  matchs,
  stars,
  rank,
  onClick,
  className = '',
  points,
}: PlayerCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-lg shadow-slate-950/50 transition-all duration-300 hover:shadow-red-500/20 ${className}`}
      onClick={onClick}
    >
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Seção esquerda - Informações do jogador */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl lg:max-w-48 font-bold truncate text-slate-100 group-hover:text-white transition-colors">
              {name}
            </h3>

            {/* Badge de rank */}
            <span className="sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-200">
              {points ? `${points} pts` : rank}
            </span>
          </div>

          {winRateRender(winRate, matchs)}

          <div className="mt-2 flex items-center">
            <Rating
              name="player-rating"
              size="small"
              readOnly
              value={stars}
              max={10}
              precision={0.5}
              icon={<StarIcon className="text-yellow-400" fontSize="inherit" />}
              emptyIcon={
                <StarIcon className="text-slate-700" fontSize="inherit" />
              }
            />
            <span className="ml-2 text-sm font-medium text-yellow-400">
              {stars.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Seção direita - Ícone de rank */}
        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
          <RankRender rank={rank} />
        </div>
      </div>

      {/* Efeito de borda animada */}
      <div className="absolute inset-0 border border-transparent group-hover:border-red-500/30 rounded-xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
