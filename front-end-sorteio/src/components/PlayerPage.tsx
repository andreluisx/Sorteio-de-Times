'use client';
import { useEffect, useState, useCallback } from 'react';
import { CircularProgress, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RankRender } from '@/components/RanksRender';
import { usePlayersStore } from '@/store/players';
import MatchHistory from './MatchHistory';
import { ConfirmationModal } from './ui/ConfirmationModal';
import { PlayerStats } from '@/components/players/PlayerStats';

const PlayerPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    player,
    fetchPlayer,
    isLoading,
    clearPlayer,
    playerMatchs,
    deletePlayer,
    updatePlayer,
  } = usePlayersStore();

  const [isMounted, setIsMounted] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedStars, setEditedStars] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hasChanges = useCallback(() => {
    return player?.name !== editedName || player?.stars !== editedStars;
  }, [player, editedName, editedStars]);

  useEffect(() => {
    if (id) {
      fetchPlayer(String(id));
    }
    setIsMounted(true);

    return () => {
      clearPlayer();
    };
  }, [id, fetchPlayer, clearPlayer]);

  useEffect(() => {
    if (player) {
      setEditedName(player.name || '');
      setEditedStars(player.stars || 0);
    }
  }, [player]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleStarsChange = (
    _: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setEditedStars(newValue);
    }
  };

  const handleSave = () => {
    if (player && hasChanges()) {
      updatePlayer(player.id, editedName, editedStars);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      await deletePlayer(String(id), router);
      setShowDeleteModal(false);
    }
  };

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-[300px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <CircularProgress size={40} thickness={4} className="text-red-500" />
        </motion.div>
      </div>
    );
  }

  if (!player) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center w-full justify-center min-h-[300px] gap-4"
      >
        <div className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-16"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-2xl text-slate-200 font-medium">
          Jogador não encontrado
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors"
        >
          Voltar
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full p-4 lg:p-6 max-w-7xl mx-auto">
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message="Tem certeza que deseja deletar este jogador permanentemente?"
        confirmText="Deletar"
        cancelText="Cancelar"
      />

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Card do Jogador - Versão Épica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-2/5"
        >
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border-2 border-red-900/50 shadow-2xl shadow-red-900/20 overflow-hidden">
            {/* Efeito de brilho dinâmico */}
            <div className="absolute pointer-events-none inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

            {/* Banner superior com rank */}
            <div className="bg-gradient-to-r from-red-900/70 to-red-950/80 p-4 flex justify-between items-center border-b border-red-900/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12">
                  <RankRender rank={player.rank} />
                </div>
                <span className="text-lg font-bold text-amber-200">
                  {player.rank}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 transition-all backdrop-blur-sm"
                  aria-label={isEditing ? 'Cancelar edição' : 'Editar jogador'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-slate-300 hover:text-white"
                  >
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                  </svg>
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 rounded-lg bg-slate-800/70 hover:bg-red-900/70 transition-all backdrop-blur-sm"
                  aria-label="Deletar jogador"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-red-400 hover:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="p-6">
              {/* Avatar e Nome */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 shadow-[0_0_20px_5px_rgba(245,158,11,0.3)]"></div>
                  <div className="absolute inset-2 rounded-full overflow-hidden border border-amber-500/20">
                    <RankRender rank={player.rank} />
                  </div>
                </div>

                <div className="text-center">
                  {isEditing ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative max-w-xs mx-auto"
                    >
                      <input
                        type="text"
                        value={editedName}
                        onChange={handleNameChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="w-full text-3xl font-bold bg-transparent text-center border-b-2 border-red-500 focus:outline-none pb-2 text-white placeholder-slate-500"
                        autoFocus
                        placeholder="Nome do Jogador"
                      />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent group-focus-within:w-full transition-all duration-300"></div>
                    </motion.div>
                  ) : (
                    <motion.h1
                      className="text-3xl font-bold text-white text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {editedName}
                    </motion.h1>
                  )}
                </div>
              </div>

              {/* Barra de Nível com Marcadores de Rank */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-400">
                    Pontos de Liga
                  </span>
                  <span className="text-xl font-bold text-amber-400">
                    {player.points}
                  </span>
                </div>

                <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                  {/* Barra de progresso animada */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(player.points / 2000) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full z-10"
                  ></motion.div>

                  {/* Marcadores de rank (linhas verticais) */}
                  <div className="absolute inset-0 flex justify-between">
                    {/* Ferro (0-999) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(600 / 2000) * 100}%` }}
                    ></div>
                    {/* Bronze (1000-1199) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(800 / 2000) * 100}%` }}
                    ></div>
                    {/* Prata (1000-1199) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(1000 / 2000) * 100}%` }}
                    ></div>
                    {/* Ouro (1200-1399) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(1200 / 2000) * 100}%` }}
                    ></div>
                    {/* Esmeralda (1400-1599) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(1400 / 2000) * 100}%` }}
                    ></div>
                    {/* Diamante (1600-1799) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(1600 / 2000) * 100}%` }}
                    ></div>
                    {/* Mestre (1800-1999) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(1800 / 2000) * 100}%` }}
                    ></div>
                    {/* Grão-Mestre (1800-1999) */}
                    <div
                      className="w-px h-full bg-white opacity-20"
                      style={{ left: `${(2000 / 2000) * 100}%` }}
                    ></div>
                  </div>

                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-10"></div>
                </div>

               

                <div className="mt-5 flex justify-center items-center">
                  <Rating
                    name="player-stars"
                    size="large"
                    value={editedStars}
                    onChange={handleStarsChange}
                    max={10}
                    precision={1}
                    icon={
                      <StarIcon className="text-amber-400" fontSize="inherit" />
                    }
                    emptyIcon={
                      <StarIcon className="text-slate-700" fontSize="inherit" />
                    }
                  />
                </div>
              </div>

              {/* Botão de salvar */}
              <AnimatePresence>
                {hasChanges() && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={handleSave}
                    disabled={isLoading || !hasChanges()}
                    className={`cursor-pointer w-full py-3 mb-3 rounded-lg font-medium transition-all ${
                      isLoading
                        ? 'bg-slate-700 text-slate-400'
                        : 'bg-gradient-to-r cursor-pointer from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg shadow-red-900/40'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <CircularProgress
                            size={20}
                            thickness={4}
                            color="inherit"
                          />
                        </motion.div>
                        Salvando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Salvar Alterações
                      </div>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Estatísticas em Grid */}
              <div className="w-full pb-3">
                <PlayerStats
                  winRate={player.winRate}
                  matchs={player.matchs}
                  wins={player.wins}
                  losses={player.loses}
                  stars={editedStars}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Histórico de Partidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-3/5"
        >
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-red-900/50 shadow-2xl shadow-red-900/20 h-full overflow-hidden">
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-red-900/70 to-red-950/80 p-4 border-b border-red-900/30">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-6 text-amber-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                  Histórico de Partidas
                </span>
              </h2>
            </div>

            {/* Lista de partidas */}
            <div className="p-4 h-[calc(100%-60px)] overflow-y-auto custom-scrollbar">
              <MatchHistory matchs={playerMatchs} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerPage;
