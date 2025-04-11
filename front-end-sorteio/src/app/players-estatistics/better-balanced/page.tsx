'use client';
import { useState, useEffect } from 'react';
import { server } from '@/api/server';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerPositionCard from '@/components/ui/PlayerPositionCard';
import BackgroundLayer from '@/components/ui/BackGroudLayer';
import Player from '@/types/playerType';
import imagem from '@/constants/buttons/star.png';
import { Crown, Star, Trophy, ArrowLeft, Award, Medal } from 'lucide-react';

export default function TopPlayersLeaderboard() {
  const [betterBalanced, setBetterBalanced] = useState<Player[]>([]);
  const [balanced, setBalanced] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await server.get(`/players/better-balanced`);
        setBetterBalanced(response.data.betterBalanced);
        setBalanced(response.data.balanced);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar os jogadores');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center h-screen bg-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-yellow-500 border-r-yellow-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-red-500 p-4 text-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-900/20">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar</h2>
        <p className="text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-slate-900 overflow-hidden">
      <BackgroundLayer image={imagem} opacity={0.3} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              JOGADORES MAIS BEM AVALIADOS
            </span>
          </h1>
          <p className="text-slate-400">Os melhores avaliados por desempenho e equilíbrio</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Seção de Ótima Avaliação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-400">Ótima Avaliação</h2>
            </div>
            
            {betterBalanced.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {betterBalanced.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PlayerPositionCard
                        player={player}
                        position={index}
                        tier="gold"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-6 bg-slate-800/50 rounded-lg">
                <Star className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-slate-400">Nenhum jogador nesta categoria</p>
              </div>
            )}
          </motion.div>

          {/* Seção de Boa Avaliação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-blue-400">Boa Avaliação</h2>
            </div>
            
            {balanced.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {balanced.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <PlayerPositionCard
                        player={player}
                        position={index + betterBalanced.length}
                        tier="silver"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-6 bg-slate-800/50 rounded-lg">
                <Medal className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-slate-400">Nenhum jogador nesta categoria</p>
              </div>
            )}
          </motion.div>

          {/* Botão Voltar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 shadow-lg border border-slate-700"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}