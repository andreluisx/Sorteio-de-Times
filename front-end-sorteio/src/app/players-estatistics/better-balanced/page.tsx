'use client';
import { useState, useEffect } from 'react';
import { server } from '@/api/server';
import { CircularProgress } from '@mui/material';
import PlayerPositionCard from '@/components/ui/PlayerPositionCard';
import BackgroundLayer from '@/components/ui/BackGroudLayer';
import Player from '@/types/playerType';
import imagem from '@/constants/buttons/star.png';

export default function TopPlayersLeaderboard() {
  const [betterBalanced, setbetterBalanced] = useState<Player[]>([]);
  const [balanced, setBalanced] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await server.get(`/players/better-balanced`);
        const betterBalanced = response.data.betterBalanced;
        const goodBalanced = response.data.balanced;
        setbetterBalanced(betterBalanced);
        setBalanced(goodBalanced);
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
      <BackgroundLayer image={imagem} />

      <div className="relative z-10 container mx-auto px-4 pb-16 pt-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-white drop-shadow-lg">
          JOGADORES MAIS<span className="text-yellow-400"> BEM AVALIADOS</span>
        </h1>
        <p className="text-center text-2xl">Ótima Avaliação:</p>
        <div className="flex flex-col w-full">
          {betterBalanced.length > 0 ? (
            <div className="flex flex-col items-end mt-3">
              {betterBalanced.map((player, index) => (
                <PlayerPositionCard
                  key={player.id}
                  player={player}
                  position={index}
                />
              ))}
            </div>
          ) : (
            <p className="text-center pb-10">Lista vazia.</p>
          )}
          <p className="text-center text-2xl">Boa Avaliação:</p>
          {balanced.length > 0 ? (
            <div className="flex flex-col items-end mt-3">
              {balanced.map((player, index) => (
                <PlayerPositionCard
                  key={player.id}
                  player={player}
                  position={index + betterBalanced.length}
                />
              ))}
            </div>
          ) : (
            <p className="text-center pb-2">Lista vazia.</p>
          )}
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
