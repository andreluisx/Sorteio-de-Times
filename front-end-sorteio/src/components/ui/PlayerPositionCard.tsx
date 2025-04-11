'use client';
import Player from '@/types/playerType';
import { motion } from 'framer-motion';
import { Crown, Award, Medal, Star, Trophy } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  position?: number; // Opcional quando usar tier
  tier?: 'gold' | 'silver' | 'bronze' | 'default'; // Opcional quando usar position
}

const getPositionStyle = (position: number) => {
  switch (position) {
    case 0: return {
      bg: 'bg-gradient-to-br from-yellow-600/20 to-yellow-800/40',
      border: 'border-yellow-500',
      icon: <Crown className="w-5 h-5 text-yellow-400" />,
      text: 'text-yellow-400',
      label: 'Campeão'
    };
    case 1: return {
      bg: 'bg-gradient-to-br from-gray-600/20 to-gray-800/40',
      border: 'border-gray-400',
      icon: <Award className="w-5 h-5 text-gray-300" />,
      text: 'text-gray-300',
      label: 'Vice'
    };
    case 2: return {
      bg: 'bg-gradient-to-br from-amber-700/20 to-amber-900/40',
      border: 'border-amber-600',
      icon: <Medal className="w-5 h-5 text-amber-400" />,
      text: 'text-amber-400',
      label: '3º Lugar'
    };
    default: return {
      bg: 'bg-gradient-to-br from-slate-700/20 to-slate-900/40',
      border: 'border-slate-600',
      icon: <Star className="w-5 h-5 text-slate-400" />,
      text: 'text-slate-400',
      label: `#${position + 1}`
    };
  }
};

const getTierStyle = (tier: string) => {
  switch (tier) {
    case 'gold': return {
      bg: 'bg-gradient-to-br from-yellow-600/20 to-yellow-800/40',
      border: 'border-yellow-500',
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      text: 'text-yellow-400',
      label: 'Ouro'
    };
    case 'silver': return {
      bg: 'bg-gradient-to-br from-gray-600/20 to-gray-800/40',
      border: 'border-gray-400',
      icon: <Medal className="w-5 h-5 text-gray-300" />,
      text: 'text-gray-300',
      label: 'Prata'
    };
    case 'bronze': return {
      bg: 'bg-gradient-to-br from-amber-700/20 to-amber-900/40',
      border: 'border-amber-600',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      text: 'text-amber-400',
      label: 'Bronze'
    };
    default: return {
      bg: 'bg-gradient-to-br from-slate-700/20 to-slate-900/40',
      border: 'border-slate-600',
      icon: <Star className="w-5 h-5 text-slate-400" />,
      text: 'text-slate-400',
      label: 'Participante'
    };
  }
};

export default function PlayerCard({ player, position, tier }: PlayerCardProps) {
  // Determina qual estilo usar com base nos props recebidos
  const style = tier ? getTierStyle(tier) : 
              (position !== undefined ? getPositionStyle(position) : getTierStyle('default'));

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl ${style.bg} border-l-4 ${style.border} shadow-lg`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${style.text} font-bold`}>
            {style.icon}
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-white">{player.name}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{player.wins}W - {player.loses}L</span>
              <span>•</span>
              <span>{player.matchs} partidas</span>
              <span>•</span>
              <span className={style.text}>{style.label}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-xl font-bold ${
              player.winRate > 75 ? 'text-green-400' : 
              player.winRate > 40 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {player.winRate}%
            </div>
            <div className="text-xs text-slate-400">Win Rate</div>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold text-amber-400">
              {player.stars?.toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">Estrelas</div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <div className="w-full bg-slate-800/50 rounded-full h-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${player.winRate}%` }}
            transition={{ duration: 1 }}
            className={`h-full rounded-full ${
              player.winRate > 60 ? 'bg-green-500' : 
              player.winRate > 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}