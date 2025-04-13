'use client';
import Player from '@/types/playerType';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import SimpleCardPlayer from '@/components/SimpleCardPlayer';
import { useMatchsStore } from '@/store/matchs';
import { useParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { Trophy, CalendarDays, Clock, ArrowLeft, X, Copy, GamepadIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import TimeConvert from './match/MatchHistory/TimeConvert';

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
          team.reduce((sum: number, player: Player) => sum + player.rank, 0) / team.length;
        const totalStars = team.reduce((sum: number, player: Player) => sum + player.stars, 0);
        const avgWinRate =
          team.reduce((sum: number, player: Player) => sum + player.winRate, 0) / team.length;

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
    <button
      disabled={isLoading}
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
    </button>
  );

  const RenderCenterButtons = () => {
    if (match.winner !== 0) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br w-full from-slate-800 to-slate-900 rounded-xl p-3 border-2 border-slate-700 shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Efeito de brilho */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Cabeçalho com resultado */}
          <div className={`text-center mb-6 ${match.winner === 1 ? 'text-green-400' : 'text-red-400'}`}>
            <Trophy className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-2xl font-bold">
              {match.winner === 1 ? 'Time 1 Venceu!' : 'Time 2 Venceu!'}
            </h3>
            <div className="flex justify-center mt-2">
              <div className={`w-24 h-1 rounded-full ${match.winner === 1 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
          </div>
  
          {/* Detalhes da partida */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <CalendarDays className="w-5 h-5 lg:hidden" />
              <p className="text-lg text-center">
                {new Date(match.createdAt).toLocaleDateString('pt-BR', {
                  day: "2-digit", 
                  month: "2-digit", 
                  year: "numeric",
                  weekday: 'long'
                })}
              </p>
            </div>
  
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <p className="text-sm text-slate-400 text-center">Duração da partida</p>
              </div>
              <div className="mt-2 text-center">
                <TimeConvert time={match.matchTime}/>
              </div>
            </div>
          </div>
  
          {/* Botão Voltar */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.go(-1)}
            className="cursor-pointer w-full py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-lg text-white font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </motion.button>
        </motion.div>
      );
    }
  
    if (!isSelectingWinner) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br w-full from-slate-800 to-slate-900 rounded-xl p-4 border-2 border-slate-700 shadow-xl shadow-black/40 overflow-hidden"
        >
          {/* Efeito de brilho sutil */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Cabeçalho */}
          <div className="text-center mb-5">
            <GamepadIcon className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
            <h3 className="text-xl font-bold text-slate-200">Partida em Andamento</h3>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-1 rounded-full bg-yellow-500"></div>
            </div>
          </div>
  
          {/* Conjunto de botões com animação */}
          <div className="flex flex-col gap-3 w-full">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDefineWinnerClick}
              className="bg-gradient-to-r w-full from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 font-bold py-3 px-4 rounded-lg shadow-lg cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Definir Vencedor
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyClick}
              className="bg-gradient-to-r cursor-pointer w-full from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Copiar Times
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBack}
              className="bg-gradient-to-r cursor-pointer w-full from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar / Excluir
            </motion.button>
          </div>
        </motion.div>
      );
    } else if (isSelectingWinner) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br w-full from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-slate-700 shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Efeito de brilho pulsante */}
          <motion.div 
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          
          {/* Cabeçalho estilizado */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Trophy className="w-12 h-12 mx-auto mb-3 text-red-500" />
            </motion.div>
            <h2 className="font-bold mb-2 text-2xl text-white">
              Selecione o time vencedor
            </h2>
            <div className="flex justify-center mt-1 mb-3">
              <div className="w-24 h-1 rounded-full bg-red-500"></div>
            </div>
            <p className="mb-5 text-slate-300 text-sm">
              Clique em um dos times para definir o vencedor da partida. Não pode
              alterar depois.
            </p>
          </div>
  
          {/* Botão de cancelar com efeito */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsSelectingWinner(false)}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 rounded-lg text-white font-medium shadow-lg cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancelar
          </motion.button>
        </motion.div>
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        {match.winner === 0 ? 'Partida Criada' : 'Detalhes da Partida'}
      </h1>

      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="w-full lg:w-fit relative z-20">
          <TeamSection
            team={match.team1}
            teamNumber={1}
            stats={teamStats.team1}
          />
        </div>

        <div className="flex flex-col justify-center items-center pt-2 pb-3 w-full lg:w-60">
          <RenderCenterButtons />
        </div>

        <div className="w-full lg:w-fit relative z-20">
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
