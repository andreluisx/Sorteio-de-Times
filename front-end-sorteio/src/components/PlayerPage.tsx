'use client';
import { useEffect, useState } from 'react';
import { CircularProgress, Rating } from '@mui/material';
import { RankRender } from '@/utils/RanksRender';
import { usePlayersStore } from '@/store/players';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'next/navigation';
import MatchHistory from './MatchHistory';

const winRateRender = (winRate: number | undefined) => {
  if (!winRate) {
    <p className="text-slate-400 flex flex-row gap-2">
      Partidas jogadas: <p className='text-slate-200'>{winRate}%</p>
    </p>
  }
  return (
    <p className="text-slate-400 flex flex-row gap-2">
      Partidas jogadas: <p className='text-slate-200'>{winRate}%</p>
    </p>
  );
};

export default function PlayerPage() {
  const { id } = useParams();
  const { player, fetchPlayer, isLoading, clearPlayer, playerMatchs } = usePlayersStore();
  const [isMounted, setIsMounted] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedStars, setEditedStars] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editable, setEditable] = useState(false);
  
  const { updatePlayer } = usePlayersStore();

  // Reset player data and fetch new player when ID changes
  useEffect(() => {
   
    // Fetch new player data
    if (id) {
      fetchPlayer(id);
    }
    
    setIsMounted(true);
  }, [id, fetchPlayer, clearPlayer]);

  // Update local state when player data changes
  useEffect(() => {
    if (player) {
      setEditedName(player.name || '');
      setEditedStars(player.stars || 0);
    }
  }, [player]);

  useEffect(() => {
    const HaveAlterations = () => {
      if (!player.name || !editedName) {
        setEditable(true);
        return;
      }
      setEditable(false);
    };
    HaveAlterations();
  }, [editedName, editedStars, player]);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <CircularProgress color="inherit" size={23} />
      </div>
    );
  }

  // Ensure player exists before rendering
  if (!player) {
    return (
      <div className="flex w-full justify-center items-center">
        <p className="text-slate-200">Jogador não encontrado</p>
      </div>
    );
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleNameSave = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    updatePlayer(player.id, editedName, editedStars);
    setIsEditing(false)
  };

  const handleStarsChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setEditedStars(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row w-full justify-center items-start p-6">
      <div className="flex flex-col w-full lg:w-fit p-6 bg-slate-900 rounded-lg border border-slate-600">
        <div className="flex w-full flex-row">
          <div className="max-w-46 flex w-1/2 justify-center items-center">
            <RankRender rank={player.rank} />
          </div>
          <div className="justify-start items-start w-2/3 pl-9 flex flex-col flex-wrap">
            <div className="flex flex-row flex-wrap justify-end items-center gap-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={handleNameChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleNameSave();
                    }
                  }}
                  className="text-3xl lg:text-5xl pb-3 bg-transparent w-full text-white border-white focus:outline-1 focus:outline-blue-900"
                  autoFocus
                />
              ) : (
                <h1 className="text-3xl lg:text-5xl text-left pb-3 break-words overflow-hidden">
                  {editedName}
                </h1>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-3 lg:size-5 cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
            </div>
            <div className="flex gap-1 flex-col text-sm lg:text-md">
              {winRateRender(player.winRate)}
              <p className="text-slate-400 flex flex-row gap-2">
                Partidas jogadas: <p className='text-slate-200'>{player.matchs}</p>
              </p>
              <p className="text-slate-400 flex flex-row gap-2">
                Partidas ganhas: <p className='text-slate-200'>{player.wins}</p>
              </p>
              <p className="text-slate-400 flex flex-row gap-2">
                Partidas perdidas: <p className='text-slate-200'>{player.loses}</p>
              </p>
              <p className="text-slate-400 flex flex-row gap-2">
                Estrelas: <p className='text-slate-200'>{editedStars}</p>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-6 gap-7">
          <div className="flex flex-row flex-wrap justify-center items-center gap-2">
            <Rating
              name="customized-10"
              size={'large'}
              value={editedStars}
              onChange={handleStarsChange}
              max={10}
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.9, color: '#314158' }}
                  fontSize="inherit"
                />
              }
            />
          </div>
          <button
            className="w-full flex justify-center cursor-pointer items-center bg-green-600 rounded-md py-3 shadow shadow-black disabled:bg-slate-600"
            disabled={editable}
            onClick={() => {
              handleSave();
            }}
          >
            {isLoading ? (
              <div className="flex w-full justify-center items-center">
                <CircularProgress color="inherit" size={23} />
              </div>
            ) : (
              'Salvar Edição'
            )}
          </button>
          <button className='text-red-600 cursor-pointer'>Deletar Jogador</button>
        </div>
      </div>
        <div className='flex w-full h-full lg:w-1/2 flex-col border border-slate-600 rounded-md'>
            <h1 className='text-2xl justify-center items-start p-2 flex w-full'>Histórico</h1>
            <MatchHistory matchs={playerMatchs}/>
        </div>
    </div>
  );
}
