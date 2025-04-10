'use client';
import { useState, useEffect } from 'react';
import { server } from '@/api/server';
import { CircularProgress } from '@mui/material';
import PlayerPositionCard from '@/components/ui/PlayerPositionCard'
import BackgroundLayer from '@/components/ui/BackGroudLayer';
import Player from '@/types/playerType';
import imagem from '@/constants/buttons/faker.jpeg';

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
      <div className="flex w-full justify-center items-center h-screen">
        <CircularProgress color="inherit" size={23} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-slate-900 overflow-hidden">
      <BackgroundLayer image={imagem}/>
      
      <div className="relative z-10 container mx-auto px-4 pb-16 pt-4 ">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-white drop-shadow-lg">
          <span className="text-yellow-400">MELHORES</span> JOGADORES
        </h1>

        <div className="flex flex-col items-end mt-8">
          {players.map((player, index) => (
            <PlayerPositionCard key={player.id} player={player} position={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button 
            onClick={() => window.history.back()} 
            className="cursor-pointer px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-300 shadow-lg"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}