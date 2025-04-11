'use client';
import { useEffect, useState, useCallback } from 'react';
import { CircularProgress, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useParams, useRouter } from 'next/navigation';
import { RankRender } from '@/utils/RanksRender';
import { usePlayersStore } from '@/store/players';
import MatchHistory from './MatchHistory';
import { ConfirmationModal } from './ui/ConfirmationModal';
import {PlayerStats} from '@/components/players/PlayerStats';

const PlayerPage = () => {
  // Hooks e estados
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

  // Calcula se há alterações pendentes
  const hasChanges = useCallback(() => {
    return player?.name !== editedName || player?.stars !== editedStars;
  }, [player, editedName, editedStars]);

  // Busca dados do jogador
  useEffect(() => {
    if (id) {
      fetchPlayer(String(id));
    }
    setIsMounted(true);

    return () => {
      clearPlayer();
    };
  }, [id, fetchPlayer, clearPlayer]);

  // Sincroniza estados locais quando os dados do jogador mudam
  useEffect(() => {
    if (player) {
      setEditedName(player.name || '');
      setEditedStars(player.stars || 0);
    }
  }, [player]);

  // Handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleStarsChange = (_: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setEditedStars(newValue);
    }
  };

  const handleSave = async () => {
    if (player) {
      await updatePlayer(player.id, editedName, editedStars);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      await deletePlayer(String(id), router);
      setShowDeleteModal(false);
    }
  };

  // Renderização condicional
  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <CircularProgress color="inherit" size={23} />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex w-full justify-center items-center">
        <p className="text-slate-200">Jogador não encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row w-full justify-center items-start p-6">
      {/* Modal de confirmação */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message="Deseja realmente deletar este jogador?"
        confirmText="Sim"
        cancelText="Não"
      />

      {/* Seção de perfil do jogador */}
      <div className="flex flex-col w-full lg:w-fit p-6 bg-slate-900 rounded-lg border border-slate-600">
        <div className="flex w-full flex-row">
          <div className="max-w-46 flex w-1/2 justify-center items-center">
            <RankRender rank={player.rank} />
          </div>
          
          <div className="justify-start items-start w-2/3 pl-9 flex flex-col flex-wrap">
            {/* Nome do jogador com edição */}
            <div className="flex flex-row flex-wrap justify-end items-center gap-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={handleNameChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                  className="text-3xl lg:text-5xl pb-3 bg-transparent w-full text-white border-white focus:outline-1 focus:outline-blue-900"
                  autoFocus
                />
              ) : (
                <h1 className="text-3xl lg:text-5xl text-left pb-3 break-words overflow-hidden">
                  {editedName}
                </h1>
              )}
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label={isEditing ? "Cancelar edição" : "Editar nome"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-3 lg:size-5"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </button>
            </div>
            
            {/* Estatísticas do jogador */}
            <PlayerStats 
              winRate={player.winRate}
              matchs={player.matchs}
              wins={player.wins}
              losses={player.loses}
              stars={editedStars}
            />
          </div>
        </div>
        
        {/* Controles de edição */}
        <div className="flex flex-col justify-center items-center pt-6 gap-7">
          <Rating
            name="player-stars"
            size="large"
            value={editedStars}
            onChange={handleStarsChange}
            max={10}
            precision={1}
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.9, color: '#314158' }}
                fontSize="inherit"
              />
            }
          />
          
          <button
            className="cursor-pointer w-full flex justify-center items-center bg-green-600 hover:bg-green-700 transition-colors rounded-md py-3 shadow shadow-black disabled:bg-slate-600 disabled:cursor-not-allowed"
            disabled={!hasChanges() || isLoading}
            onClick={handleSave}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={23} />
            ) : (
              'Salvar Edição'
            )}
          </button>
          
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="cursor-pointer  text-red-500 hover:text-red-400 transition-colors"
          >
            Deletar Jogador
          </button>
        </div>
      </div>
      
      {/* Histórico de partidas */}
      <div className="flex w-full h-full lg:w-1/2 flex-col border border-slate-600 rounded-md">
        <h1 className="text-2xl justify-center items-start p-2 flex w-full">
          Histórico
        </h1>
        <MatchHistory matchs={playerMatchs} />
      </div>
    </div>
  );
};

export default PlayerPage;