'use client';
import { useState, useEffect } from 'react';
import { server } from '@/api/server';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Skull,
  Search,
  Crown,
  Award,
  Medal,
  Users,
  ChevronsUp,
  BarChart2,
} from 'lucide-react';
import BackgroundLayer from '@/components/ui/BackGroudLayer';
import imagem from '@/constants/icons/duos.jpg';

type WinningDuo = {
  nomes: string[];
  partidas: number;
  vitorias: number;
  score: number;
  winRate: number;
};

type DuosType = {
  totalPartidas: number;
  duplas: WinningDuo[];
};

export default function WinningDuosLeaderboard() {
  const [duos, setDuos] = useState<DuosType>({
    totalPartidas: 0,
    duplas: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovering, setIsHovering] = useState(-1);

  useEffect(() => {
    const fetchDuos = async () => {
      try {
        setLoading(true);
        const response = await server.get('/match/best-duos'); // Adapte para sua rota real
        setDuos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar as duplas vencedoras');
        setLoading(false);
        console.error(err);
      }
    };

    fetchDuos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 w-full justify-center items-center h-screen bg-slate-900">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-gray-500 border-r-gray-500" />
        </motion.div>
        <p>Calculando Dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col items-center justify-center h-screen bg-slate-900 text-red-400 p-4 text-center">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Skull className="w-16 h-16 mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar</h2>
        <p className="text-lg">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
        >
          Tentar novamente
        </motion.button>
      </div>
    );
  }

  const filteredPlayers = duos.duplas.filter((dupla) => {
    const searchTermLower = searchTerm.trim().toLowerCase();
    return dupla.nomes.some((nome) => 
      nome.toLowerCase().includes(searchTermLower)
    );
  });

  // Cor da medalha baseada na posição
  const getMedalColor = (position: number) => {
    switch (position) {
      case 0:
        return 'from-yellow-400 to-yellow-600';
      case 1:
        return 'from-gray-300 to-gray-500';
      case 2:
        return 'from-amber-600 to-amber-800';
      default:
        return 'from-slate-600 to-slate-800';
    }
  };

  // Cor do destaque baseada na posição
  const getHighlightColor = (position: number) => {
    switch (position) {
      case 0:
        return 'text-yellow-400';
      case 1:
        return 'text-gray-300';
      case 2:
        return 'text-amber-500';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />

      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.history.back()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 font-bold tracking-wide">
              Duplas Campeãs
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg shadow-lg border border-blue-500 transition-all"
            >
              <span>Baixar Relatório</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Podium */}
          <div className="lg:w-1/2 flex flex-col overflow-hidden justify-between z-30 bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-2xl">
            <BackgroundLayer image={imagem} opacity={0.5} />

            <div className="flex items-center justify-between mb-6 z-50">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <span className="text-gray-300 text-sm font-medium">
                    Contando:
                  </span>
                  <span className="text-gray-100 text-sm font-medium">
                    {duos.totalPartidas} Partidas
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Users className="w-4 h-4 text-yellow-400" />
                <span>Top {duos.duplas.length}</span>
              </div>
            </div>

            <div className="flex justify-center items-end h-72 mt-8 relative">
              {/* Podium Base */}
              {/* Podium Base */}
              <div className="absolute z-40 -bottom-6 w-full h-10 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-xl" />

              {duos.duplas.length >= 1 && (
                <div className="relative flex items-end justify-between w-full px-2 sm:px-8 z-10">
                  {/* 2nd Place */}
                  {duos.duplas[1] && (
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="flex flex-col items-center w-1/3"
                    >
                      <div className="w-20 sm:w-28 h-48 bg-gradient-to-b from-slate-600 to-slate-700 border-t-2 border-slate-500 rounded-t-lg flex flex-col items-center justify-center p-2 mb-2 relative shadow-lg">
                        <div
                          className={`absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b ${getMedalColor(
                            1
                          )} text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-slate-400 shadow-md`}
                        >
                          <Medal className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mb-2 border-2 border-slate-400 bg-slate-700 flex items-center justify-center">
                          <Users className="w-4 h-4 sm:w-6 sm:h-6 text-gray-300" />
                        </div>
                        <div className="flex flex-col items-center w-full px-1">
                          <p className="text-white text-xs sm:text-sm font-medium truncate w-full text-center">
                            {duos.duplas[1].nomes[0]}
                          </p>
                          <p className="text-white text-xs sm:text-sm font-medium truncate w-full text-center">
                            {duos.duplas[1].nomes[1]}
                          </p>
                        </div>
                        <p
                          className={`text-xs sm:text-sm font-bold mt-1 ${getHighlightColor(
                            1
                          )}`}
                        >
                          {duos.duplas[1].vitorias} vitórias
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* 1st Place */}
                  <motion.div
                    whileHover={{ y: -15 }}
                    className="flex flex-col w-1/3 items-center -mt-8 sm:-mt-12"
                  >
                    <div className="w-20 sm:w-28 h-56 sm:h-64 bg-gradient-to-b z-40 from-yellow-600/20 via-yellow-500/10 to-slate-700 border-t-2 border-yellow-400 rounded-t-lg flex flex-col items-center justify-center p-2 mb-2 relative shadow-xl">
                      <div
                        className={`absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-b ${getMedalColor(
                          0
                        )} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-lg`}
                      >
                        <Crown className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-2 border-2 border-yellow-400 shadow-md bg-slate-700 flex items-center justify-center">
                        <Users className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400" />
                      </div>
                      <div className="flex flex-col items-center w-full px-1">
                        <p className="text-white text-xs sm:text-sm font-semibold truncate w-full text-center">
                          {duos.duplas[0].nomes[0]}
                        </p>
                        <p className="text-white text-xs sm:text-sm font-semibold truncate w-full text-center">
                          {duos.duplas[0].nomes[1]}
                        </p>
                      </div>
                      <p
                        className={`text-xs sm:text-xl font-bold mt-1 ${getHighlightColor(
                          0
                        )}`}
                      >
                        {duos.duplas[0].vitorias} vitórias
                      </p>
                    </div>
                  </motion.div>

                  {/* 3rd Place */}
                  {duos.duplas[2] && (
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="flex flex-col w-1/3 items-center"
                    >
                      <div className="w-20 sm:w-28 h-40 bg-gradient-to-b from-slate-600 to-slate-700 border-t-2 border-amber-600 rounded-t-lg flex flex-col items-center justify-center p-2 mb-2 relative shadow-lg">
                        <div
                          className={`absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b ${getMedalColor(
                            2
                          )} text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-amber-500 shadow-md`}
                        >
                          <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mb-2 border-2 border-amber-500 bg-slate-700 flex items-center justify-center">
                          <Users className="w-4 h-4 sm:w-6 sm:h-6 text-amber-300" />
                        </div>
                        <div className="flex flex-col items-center w-full px-1">
                          <p className="text-white text-xs sm:text-sm font-medium truncate w-full text-center">
                            {duos.duplas[2].nomes[0]}
                          </p>
                          <p className="text-white text-xs sm:text-sm font-medium truncate w-full text-center">
                            {duos.duplas[2].nomes[1]}
                          </p>
                        </div>
                        <p
                          className={`text-xs sm:text-sm font-bold mt-1 ${getHighlightColor(
                            2
                          )}`}
                        >
                          {duos.duplas[2].vitorias} vitórias
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-12 text-xs text-gray-400 z-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
                <span>Atualizado em: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Season {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Duos List */}
          <div className="lg:w-1/2 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <BarChart2 className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">
                  Estatísticas das Duplas
                </span>
              </div>

              <div className="relative flex items-center">
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar dupla..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg text-sm w-40 md:w-56 placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </motion.div>
              </div>
            </div>

            <div className="h-[28rem] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {filteredPlayers.map((duo, index) => (
                  <motion.div
                    key={`${duo.nomes[0]}-${duo.nomes[1]}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.03 },
                    }}
                    
                    transition={{ type: 'spring', stiffness: 300 }}
                    onMouseEnter={() => setIsHovering(index)}
                    onMouseLeave={() => setIsHovering(-1)}
                    className={`flex items-center mb-3 rounded-xl p-3 transition-all border ${
                      index < 3 ? 'border-yellow-400/30' : 'border-slate-600'
                    } ${
                      index === isHovering
                        ? 'bg-slate-700/70'
                        : 'bg-slate-700/40'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                        index < 3
                          ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                          : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`font-bold ${
                          index < 3 ? 'text-slate-900' : 'text-gray-300'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full overflow-hidden mx-2 border-2 ${
                        index === 0
                          ? 'border-yellow-400'
                          : index === 1
                          ? 'border-gray-300'
                          : index === 2
                          ? 'border-amber-500'
                          : 'border-slate-500'
                      } bg-slate-700 flex items-center justify-center`}
                    >
                      <Users
                        className={`w-5 h-5 ${
                          index === 0
                            ? 'text-yellow-400'
                            : index === 1
                            ? 'text-gray-300'
                            : index === 2
                            ? 'text-amber-400'
                            : 'text-blue-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">
                            {duo.nomes[0]} & {duo.nomes[1]}
                          </p>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <span className="flex items-center">
                              <ChevronsUp className="w-3 h-3 mr-1 text-green-400" />
                              {duo.vitorias} vitórias
                            </span>
                            <span className="mx-2">•</span>
                            <span>{duo.partidas} Partidas</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <motion.p
                            animate={{
                              color:
                                index === isHovering
                                  ? '#fbbf24'
                                  : index === 0
                                  ? '#f59e0b'
                                  : index === 1
                                  ? '#d1d5db'
                                  : index === 2
                                  ? '#f59e0b'
                                  : '#93c5fd',
                              scale: index === isHovering ? 1.05 : 1,
                            }}
                            className="font-bold"
                          >
                            {Math.round(duo.winRate * 100)}% WR
                          </motion.p>
                          <div className="flex items-center justify-end gap-1">
                            <div className="w-16 bg-slate-600 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full"
                                style={{
                                  width: `${
                                    (duo.vitorias /
                                      (duo?.partidas || 1)) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
