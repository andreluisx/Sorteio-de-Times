'use client';

import { motion } from 'framer-motion';
import PlayerCard from './PlayerCard';
import CreateUserModal from './CreateUserModal';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { usePlayersStore } from '@/store/players';
import Player from '@/types/playerType';
import { SortedTypes } from '@/types/sortedTypes';
import { useMatchsStore } from '@/store/matchs';
import PlayersList from './PlayersList';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@/svg/icons/PlusIcon';

interface RandomChoiceScreenProps {
  title: string;
  type: SortedTypes;
}

const TeamSection = (
  players: Player[],
  handlePlayer: (player: Player) => void
) => {
  return <PlayersList players={players} handlePlayer={handlePlayer} />;
};

export default function RandomChoiceScreen({
  title,
  type,
}: RandomChoiceScreenProps) {
  const {
    togglePlayerBetweenLists,
    playersData,
    matchPlayers,
    isLoading,
    fetchPlayers,
  } = usePlayersStore();
  const match = useMatchsStore();
  const sizeMatchPlayersList = matchPlayers?.length;

  const [modal, setModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handleDrawTeams = () => {
    if (type === 'random') {
      match.createRandomMatch(matchPlayers, router);
    }
    if (type === 'stars') {
      match.createStarMatch(matchPlayers, router);
    }
    if (type === 'winRate') {
      match.createWinRateMatch(matchPlayers, router);
    }
  };

  const handlePlayer = (player: Player) => {
    togglePlayerBetweenLists(player.id);
  };

  return (
    <div className="custom-bg dark:custom-bg px-3 lg:px-3 py-7 justify-start items-start flex flex-col w-full">
      {modal && <CreateUserModal setModal={setModal} />}
      
      {/* Botão Flutuante para Adicionar Jogador */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setModal(true)}
        className="cursor-pointer fixed z-40 bottom-8 right-8 h-16 w-16 bg-green-600 hover:bg-hreen-700 rounded-full shadow-lg shadow-black/50 flex justify-center items-center text-white"
      >
        <PlusIcon />
      </motion.button>

      {/* Título */}
      <div className="w-full text-center mb-3">
        <h1 className="text-3xl font-bold text-red-500  bg-clip-text ">
          {title}
        </h1>
      </div>

      {/* Área Principal */}
      <div className="flex flex-col-reverse w-full pt-6 pb-20 lg:flex-row-reverse gap-6 lg:pb-6">
        {/* Seção de Jogadores Selecionados */}
        <div className="lg:w-7/12 w-full">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border-2 border-red-900/50 shadow-lg shadow-red-900/10 overflow-hidden">
            {/* Header da seção */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-red-900/80 to-red-950/90 px-4 py-3 border-b border-red-900/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <p className={`text-sm font-medium ${
                    sizeMatchPlayersList % 2 !== 0 || sizeMatchPlayersList === 0
                      ? 'text-red-300'
                      : 'text-green-400'
                  }`}>
                    {matchPlayers.length} {matchPlayers.length === 1 ? 'jogador' : 'jogadores'} selecionados
                  </p>
                </div>
                
                <button
                  onClick={handleDrawTeams}
                  disabled={
                    matchPlayers.length % 2 !== 0 ||
                    matchPlayers.length == 0 ||
                    isLoading
                  }
                  className={` px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isLoading
                      ? 'bg-slate-700 text-slate-400'
                      : matchPlayers.length % 2 === 0 && matchPlayers.length > 0
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-900/30 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : (
                    'Sortear Times'
                  )}
                </button>
              </div>
            </div>

            {/* Área dos jogadores */}
            {sizeMatchPlayersList === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                <div className="mb-4 p-3 bg-slate-800/50 rounded-full border border-dashed border-slate-700">
                  <PlusIcon  />
                </div>
                <p className="text-slate-400 max-w-[200px]">
                  Selecione jogadores clicando nos cards ao lado
                </p>
              </div>
            ) : (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {matchPlayers.map((player) => (
                  <motion.div
                    key={player.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <PlayerCard
                      points={player.points}
                      matchs={player.matchs}
                      name={player.name}
                      rank={player.rank}
                      stars={player.stars}
                      winRate={player.winRate}
                      onClick={() => handlePlayer(player)}
                      className="hover:border-red-500/50"
                    />
                    <button 
                      onClick={() => handlePlayer(player)}
                      className="absolute -top-2 -right-2 z-10 bg-red-600 hover:bg-red-700 rounded-full p-1 shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Seção de Todos os Jogadores */}
        <div className="lg:w-5/12 w-full lg:pr-0">
          {TeamSection(playersData, handlePlayer)}
        </div>
      </div>
    </div>
  );
}