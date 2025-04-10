'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MatchType, useMatchsStore } from '@/store/matchs';
import PlayerCard from '@/components/PlayerCard';
import TimeConvert from './TimeConvert';
import Confetti from 'react-confetti';
import { Crown, Trophy, Repeat, BarChart2 } from 'lucide-react';
import Player from '@/types/playerType';

export default function WinnerScreen() {
  const { winnerTeam } = useMatchsStore();
  const router = useRouter();

  const handleAgain = () => {
    window.history.go(-2);
  };

  const handleViewHistory = () => {
    router.push('/players-estatistics/players');
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-6">
      {/* Efeito de confete */}
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        colors={['#f43f5e', '#eab308', '#22d3ee', '#a855f7']}
      />
      
      {/* Overlay brilhante */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-red-500/5 to-purple-500/5 pointer-events-none" />

      {/* Conteúdo principal */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl shadow-black/50 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-200" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold text-white">Time Vencedor 🎉</h1>
          </div>
          
          <div className="mt-2 flex items-center justify-center gap-4">
            <div className="bg-yellow-700/30 px-3 py-1 rounded-full flex items-center">
              <Crown className="h-4 w-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium text-white">
                Time {winnerTeam.winner}
              </span>
            </div>
            
            <div className="bg-slate-900/30 px-3 py-1 rounded-full flex items-center">
              <TimeConvert time={winnerTeam.matchTime} style="text-sm text-white" />
            </div>
          </div>
        </div>

        {/* Lista de jogadores */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {winnerTeam.teamPlayers
              .filter(tp => tp.teamNumber === winnerTeam.winner)
              .map((teamPlayer) => (
                <motion.div
                  key={teamPlayer.player.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlayerCard
                    matchs={teamPlayer.player.matchs}
                    name={teamPlayer.player.name}
                    rank={teamPlayer.player.rank}
                    stars={teamPlayer.player.stars}
                    winRate={teamPlayer.player.winRate}
                    className="hover:border-yellow-400/50"
                  />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAgain}
            className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-yellow-900/30 transition-all"
          >
            <Repeat className="h-5 w-5" />
            Sortear Novamente
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleViewHistory}
            className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-slate-900/30 transition-all"
          >
            <BarChart2 className="h-5 w-5" />
            Ver Estatísticas
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}