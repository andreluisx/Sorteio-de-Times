'use client';
import Player from '@/types/playerType';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import SimpleCardPlayer from '@/components/SimpleCardPlayer';
import { useMatchsStore } from '@/store/matchs';
import { useParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export default function MatchScreen() {
  
  const { match, setWinner, deleteMatch, getMatch, isLoading } =
    useMatchsStore();
  const router = useRouter();
  const { id } = useParams();

  const [isSelectingWinner, setIsSelectingWinner] = useState<boolean>(false);
  const [teamStats, setTeamStats] = useState({
    team1: { avgRank: 0, totalStars: 0, avgWinRate: 0 },
    team2: { avgRank: 0, totalStars: 0, avgWinRate: 0 },
  });

  useEffect(() => {
    getMatch(Number(id));
  }, [getMatch, id]);

  useEffect(() => {
    if (match.team1 && match.team2) {
      const calcTeamStats = (team: Player[]) => {
        const avgRank =
          team.reduce((sum, player) => sum + player.rank, 0) / team.length;
        const totalStars = team.reduce((sum, player) => sum + player.stars, 0);
        const avgWinRate =
          team.reduce((sum, player) => sum + player.winRate, 0) / team.length;

        return {
          avgRank: Math.round(avgRank * 10) / 10,
          totalStars,
          avgWinRate: Math.round(avgWinRate),
        };
      };

      setTeamStats({
        team1: calcTeamStats(match.team1),
        team2: calcTeamStats(match.team2),
      });
    }
  }, [match.team1, match.team2, getMatch, id]);

  const handleSelectWinner = (teamNumber: number) => {
    setWinner(match.id, teamNumber, router);
    setIsSelectingWinner(false);
  };

  const handleDefineWinnerClick = () => {
    setIsSelectingWinner(true);
  };

  const handleCopyClick = async () => {
    try {
      const names1 = match.team1.map((player) => ` ${player.name}`);
      const names2 = match.team2.map((player) => ` ${player.name}`);

      const textToCopy = `Time 1: ${names1}\nTime 2: ${names2}`;
      await navigator.clipboard.writeText(textToCopy);
      toast('Copiado com sucesso', { type: 'success' });
    } catch (error) {
      toast('Falha ao copiar', { type: 'error' });
    }
  };

  const handleBack = () => {
    deleteMatch(match.id);
    window.history.go(-1);
  };

  if (isLoading) {
    return <div className='flex justify-center items-center w-full'>
            <CircularProgress size={24} title="Loading" color="inherit" />
          </div>
  }

  const TeamSection = ({
    team,
    teamNumber,
    stats,
  }: {
    team: Player[];
    teamNumber: number;
    stats: any;
  }) => (
    <div
      className={`w-full flex-col z-30 flex min-h-96 lg:min-h-28 bg-gradient-to-b bg-slate-800 rounded-lg border ${
        match.winner === teamNumber ? 'border-green-600' : 'border-slate-600'
      } ${
        isSelectingWinner
          ? 'cursor-pointer transform transition-transform hover:scale-105 hover:border-green-500'
          : ''
      }`}
      onClick={() => isSelectingWinner && handleSelectWinner(teamNumber)}
    >
      <div className="bg-slate-900 rounded-t-lg p-3 border-b border-slate-600">
        <h2 className="text-center text-xl font-bold text-white">
          TIME {teamNumber}
        </h2>
        <div className="flex justify-between text-xs text-slate-300 mt-2">
          <span>WR média: {stats.avgWinRate}%</span>
          <span>Estrelas: {stats.totalStars}</span>
        </div>
      </div>
      <div
        className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 overflow-y-auto"
        style={{
          maxHeight: '560px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 #1F2937',
        }}
      >
        {team.map((player) => (
          <div key={player.id}>
            <SimpleCardPlayer
              matchs={player.matchs}
              name={player.name}
              stars={player.stars}
              winRate={player.winRate}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const RenderCenterButtons = () => {
    if (match.winner !== 0) {
      return (
        <div className="bg-slate-800 w-full flex justify-center items-center flex-col rounded-md p-4 border border-slate-600">
          <p>{`Vencedor: Time ${match.winner}`}</p>
          <button
            className="mt-2 py-2 w-full bg-green-700 cursor-pointer rounded-md"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            Voltar
          </button>
        </div>
      );
    }

    if (!isSelectingWinner) {
      return (
        <>
          <div className="relative mb-4 transform transition-all hover:scale-110"></div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={handleDefineWinnerClick}
              className="bg-gradient-to-r bg-red-800 hover:bg-red-700 font-bold py-3 px-4 rounded-lg shadow-lg cursor-pointer"
            >
              Definir Vencedor
            </button>
            <button
              onClick={handleCopyClick}
              className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-bold py-3 px-4 rounded-lg shadow-lg"
            >
              Copiar Times
            </button>
            <button
              onClick={handleBack}
              className="bg-gradient-to-r cursor-pointer from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 font-bold py-3 px-4 rounded-lg shadow-lg"
            >
              Voltar
            </button>
          </div>
        </>
      );
    } else if (isSelectingWinner) {
      return (
        <div className="bg-slate-800 bg-opacity-90 p-6 rounded-lg max-w-md shadow-lg">
          <h2 className="font-bold mb-4 text-2xl text-white text-center">
            Selecione o time vencedor
          </h2>
          <p className="mb-6 text-white text-sm text-center">
            Clique em um dos times para definir o vencedor da partida. Não pode
            alterar depois.
          </p>
          <button
            className="w-full px-4 py-2 bg-red-700 hover:bg-red-600 cursor-pointer rounded-md text-white"
            onClick={() => setIsSelectingWinner(false)}
          >
            Cancelar
          </button>
        </div>
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Resultado do Sorteio
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="w-full lg:w-5/12 relative z-20">
          <TeamSection
            team={match.team1}
            teamNumber={1}
            stats={teamStats.team1}
          />
        </div>

        <div className="flex flex-col justify-center items-center pt-2 pb-3 lg:w-2/12">
          <RenderCenterButtons />
        </div>

        <div className="w-full lg:w-5/12 relative z-20">
          <TeamSection
            team={match.team2}
            teamNumber={2}
            stats={teamStats.team2}
          />
        </div>
      </div>
    </div>
  );
}
