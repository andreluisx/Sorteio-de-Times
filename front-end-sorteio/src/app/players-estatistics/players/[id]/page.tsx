"use client";
import PlayerPage from '@/components/PlayerPage';
import { usePlayersStore } from '@/store/players';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export default function Player() {
  const { player, fetchPlayer, isLoading } = usePlayersStore();
  const { id } = useParams(); // Inicialize o useRouter

  useEffect(() => {
    if (id) { 
      fetchPlayer(id); 
    }
  }, [id, fetchPlayer]); 

  return (
    <PlayerPage
      id={player.id}
      name={player.name}
      matchs={player.matchs}
      rank={player.rank}
      stars={player.stars}
      winRate={player.winRate}
      wins={player.wins}
      loses={player.loses}
      isLoading={isLoading}
    />
  );
}