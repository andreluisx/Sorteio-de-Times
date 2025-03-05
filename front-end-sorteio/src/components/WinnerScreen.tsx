'use client';
import PlayerCard from '@/components/PlayerCard';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';
import { useMatchsStore } from '@/store/matchs';
import TimeConvert from './TimeConvert';

export default function WinnerScreen() {
  const { winnerTeam } = useMatchsStore();
  const router = useRouter();

  const handleAgain = () => {
    window.history.go(-2);
  };

  const handleViewHistory = () => {
    router.push('/players-estatistics/players');
  };

  return (
    <div className="w-full flex items-center justify-center bg-black bg-opacity-75">
      <Confetti width={window.innerWidth} height={window.innerHeight} />{' '}
      {/* Confetes */}
      <div className="bg-slate-800 dark:bg-gray-950 rounded-lg p-6 text-center">
        <div className="flex flex-row justify-between">
          <div className="w-10"></div>
          <h1 className="text-3xl font-bold text-white mb-6">Vencedores 🎉</h1>
          <TimeConvert time={winnerTeam.matchTime} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {winnerTeam.teamPlayers.map((teamPlayer) => {
            if (teamPlayer.teamNumber === winnerTeam.winner) {
              return (
                <div key={teamPlayer.player.id} className="px-1">
                  <PlayerCard
                    matchs={teamPlayer.player.matchs}
                    name={teamPlayer.player.name}
                    rank={teamPlayer.player.rank}
                    stars={teamPlayer.player.stars}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={handleAgain}
            className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-bold py-3 px-4 rounded-lg shadow-lg"
          >
            Sortear Novamente
          </button>
          <button
            onClick={handleViewHistory}
            className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-bold py-3 px-4 rounded-lg shadow-lg"
          >
            Ver Dados Atualizados
          </button>
        </div>
      </div>
    </div>
  );
}
