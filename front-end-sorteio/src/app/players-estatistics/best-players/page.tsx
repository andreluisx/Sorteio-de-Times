'use client';
import { useState, useEffect } from 'react';
import { server } from '@/api/server';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerPositionCard from '@/components/ui/PlayerPositionCard';
import BackgroundLayer from '@/components/ui/BackGroudLayer';
import Player from '@/types/playerType';
import imagem from '@/constants/buttons/faker.jpeg';
import { Crown, ArrowLeft, Trophy, Skull } from 'lucide-react';

export default function TopPlayersLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await server.get(`/players/better-players`);
        const topPlayers = response.data.betterPlayers.slice(0, 5);
        setPlayers(topPlayers);
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
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-red-500 border-r-red-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-red-500 p-4 text-center">
        <Skull className="w-16 h-16 mb-4" />
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
      <BackgroundLayer image={imagem} opacity={0.4} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              TOP COMPETIDORES
            </span>
          </h1>
          <p className="text-slate-400">Os melhores jogadores da temporada</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {players.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence>
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PlayerPositionCard
                      player={player}
                      position={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 mx-auto text-slate-600 mb-4" />
              <p className="text-xl text-slate-400">Nenhum jogador encontrado</p>
            </div>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 flex justify-center"
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