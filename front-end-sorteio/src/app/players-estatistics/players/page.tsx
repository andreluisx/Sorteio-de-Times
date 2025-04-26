'use client';
import PlayerCard from '@/components/PlayerCard';
import Player from '@/types/playerType';
import { usePlayersStore } from '@/store/players';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { Search, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Players() {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const { allPlayers, fetchPlayers, isLoading } = usePlayersStore();

  useEffect(() => {
    fetchPlayers(search);
  }, [fetchPlayers, search]);

  const handlePlayer = (playerId: string): void => {
    router.push(`/players-estatistics/players/${playerId}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(inputValue);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-yellow-500 via-amber-500 to-red-600">
            Todos os Jogadores
          </h1>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Clique nos cards para ver detalhes do jogador
        </p>
      </motion.div>

      {/* Barra de Pesquisa Épica */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mx-auto mb-6"
      >
        <form onSubmit={handleSubmit}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Encontre seu campeão..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-gray-800 text-white rounded-xl text-md placeholder-gray-400 border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-400 hover:bg-slate-600 text-gray-900 font-medium py-1 px-3 rounded-lg text-sm transition-all flex items-center"
            >
              Buscar
            </button>
          </motion.div>
        </form>
      </motion.div>

      {/* Conteúdo Principal */}
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-20"
        >
          <CircularProgress style={{ color: '#f59e0b' }} size={60} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          {/* Status Bar */}
          <div className="flex justify-between items-center mb-6 px-4">
            <div className="text-red-400 font-medium flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              {allPlayers.length} {allPlayers.length === 1 ? 'Campeão' : 'Campeões'} Encontrados
            </div>
            <div className="text-gray-400 text-sm">
              Classificação por Pontuação
            </div>
          </div>

          {/* Grid de Jogadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
            {allPlayers.map((player: Player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => handlePlayer(player.id)}
              >
                <PlayerCard
                  matchs={player.matchs}
                  name={player.name}
                  rank={player.rank}
                  stars={player.stars}
                  winRate={player.winRate}
                  points={player.points}
                  className="transform transition-all hover:shadow-2xl hover:shadow-red-500/20"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}