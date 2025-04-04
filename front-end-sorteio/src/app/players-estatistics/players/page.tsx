'use client';
import PlayerCard from '@/components/PlayerCard';
import Player from '@/types/playerType';
import { usePlayersStore } from '@/store/players';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export default function Players() {
  const router = useRouter();
  const { allPlayers, fetchPlayers, isLoading } = usePlayersStore();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handlePlayer = (playerId: string) => {
    router.push(`/players-estatistics/players/${playerId}`)
  };

  return (
    <div className="flex w-full justify-start items-center flex-col pt-10 gap-10">
      <h1 className="text-white text-center text-3xl lg:text-4xl">
        Lista com Todos os Jogadores
      </h1>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <CircularProgress color="inherit" size={40} />
        </div>
      ) : (
        <div
          style={{
            overflowY: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
          className='lg:pt-5 pt-1 pb-10'
        >
          {allPlayers.map((player: Player) => (
            <div key={player.id} className="px-3">
              <PlayerCard
                matchs={player.matchs}
                name={player.name}
                rank={player.rank}
                stars={player.stars}
                winRate={player.winRate}
                onClick={() => handlePlayer(player.id)} // Função de navegação
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
