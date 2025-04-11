'use client';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import { Progress } from './ui/Progress'; 

interface PlayerStatsProps {
  winRate?: number;
  matchs?: number;
  wins?: number;
  losses?: number;
  stars?: number;
  compact?: boolean;
  className?: string;
}

export const PlayerStats = ({
  winRate = 0,
  matchs = 0,
  wins = 0,
  losses = 0,
  stars = 0,
  compact = false,
  className = '',
}: PlayerStatsProps) => {
  // Cores baseadas no desempenho
  const winRateColor = winRate >= 60 ? 'text-green-400' : 
                      winRate >= 40 ? 'text-amber-400' : 'text-red-400';
  
  const winRateBarColor = winRate >= 60 ? 'from-green-400 to-green-600' :
                         winRate >= 40 ? 'from-amber-400 to-amber-600' : 'from-red-400 to-red-600';

  if (compact) {
    return (
      <div className={`grid grid-cols-1 gap-4 ${className}`}>
        {/* Item 1 - Taxa de Vitórias */}
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Vitórias</span>
            <span className={`text-sm font-bold ${winRateColor}`}>{winRate.toFixed(1)}%</span>
          </div>
          <Progress value={winRate} className={`h-1.5 bg-gradient-to-r ${winRateBarColor}`} />
        </motion.div>

        {/* Item 2 - Partidas */}
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Partidas</span>
            <span className="text-sm font-bold text-slate-200">{matchs}</span>
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>{wins}V</span>
            <span>{losses}D</span>
          </div>
        </motion.div>

        {/* Item 3 - Estrelas */}
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Nível</span>
            <span className="text-sm font-bold text-amber-400">{stars.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="text-amber-400" style={{ fontSize: 14 }} />
            <Progress 
              value={stars * 10} 
              className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-600" 
            />
          </div>
        </motion.div>

        {/* Item 4 - Win/Loss Ratio */}
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
        >
          <div className="text-xs font-medium text-slate-400 mb-1">W/L Ratio</div>
          <div className="text-sm font-bold text-slate-200">
            {(wins / (losses || 1)).toFixed(2)}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 backdrop-blur-sm ${className}`}>
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-red-500">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-bold text-slate-200">Estatísticas do Jogador</h3>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 gap-4">
        {/* Taxa de Vitórias */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-400">Taxa de Vitórias</span>
            <span className={`text-xl font-bold ${winRateColor}`}>{winRate.toFixed(1)}%</span>
          </div>
          <Progress 
            value={winRate} 
            className={`h-2 bg-gradient-to-r ${winRateBarColor} rounded-full`}
          />
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>0%</span>
            <span>100%</span>
          </div>
        </motion.div>

        {/* Partidas Jogadas */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-400">Partidas</span>
            <span className="text-xl font-bold text-slate-200">{matchs}</span>
          </div>
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{wins}</div>
              <div className="text-xs text-slate-500">Vitórias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{losses}</div>
              <div className="text-xs text-slate-500">Derrotas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-300">
                {(wins / (losses || 1)).toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">W/L Ratio</div>
            </div>
          </div>
        </motion.div>

        {/* Nível (Estrelas) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-400">Nível</span>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-amber-400">{stars.toFixed(1)}</span>
              <StarIcon className="text-amber-400" style={{ fontSize: 20 }} />
            </div>
          </div>
          <Progress 
            value={stars * 10} 
            className="h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          />
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>0</span>
            <span>10</span>
          </div>
        </motion.div>

        {/* Desempenho Recente */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50"
        >
          <div className="text-sm font-medium text-slate-400 mb-3">Desempenho</div>
          <div className="flex items-center justify-center h-16">
            {winRate >= 60 ? (
              <span className="text-green-400 text-lg font-medium">🔥 Excelente</span>
            ) : winRate >= 40 ? (
              <span className="text-amber-400 text-lg font-medium">👍 Mediano</span>
            ) : (
              <span className="text-red-400 text-lg font-medium">💡 Precisa melhorar</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Rodapé */}
      <div className="mt-4 text-xs text-slate-500 text-center">
        Estatísticas atualizadas em tempo real
      </div>
    </div>
  );
};

// components/ui/Progress.tsx (Componente auxiliar)
interface ProgressProps {
  value: number;
  className?: string;
}

const Progress = ({ value, className = '' }: ProgressProps) => {
  return (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${className}`}
      />
    </div>
  );
};

export default Progress