'use client';
import { useState, useEffect } from 'react';
import { server } from '@/api/server';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '@/types/playerType';
import {
  ArrowLeft,
  Trophy,
  Skull,
  Search,
  Crown,
  Award,
  Medal,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react';
import { RankRender } from '@/components/RanksRender';
import BackgroundLayer from '@/components/ui/BackGroudLayer';
import imagem from '@/constants/buttons/faker.jpeg';

type RankingMethod = 'points' | 'winrate' | 'stars';

export default function TopPlayersLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovering, setIsHovering] = useState(-1);
  const [rankingMethod, setRankingMethod] = useState<RankingMethod>('points');
  const [rankingTitle, setRankingTitle] = useState('Rank Points (RP)');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        let endpoint = '/players/ranking';
        
        // Switch endpoint based on ranking method
        switch(rankingMethod) {
          case 'winrate':
            endpoint = '/players/better-players';
            break;
          case 'stars':
            endpoint = '/players/better-balanced';
            break;
          default:
            endpoint = '/players/ranking';
        }

        const response = await server.get(endpoint);
        setPlayers(response.data.betterPlayers);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar os jogadores');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlayers();
  }, [rankingMethod]);

  const handleRankingChange = (method: RankingMethod) => {
    setRankingMethod(method);
    // Update the displayed title
    switch(method) {
      case 'winrate':
        setRankingTitle('Winrate / Partidas');
        break;
      case 'stars':
        setRankingTitle('Avaliação');
        break;
      default:
        setRankingTitle('Rank Points (RP)');
    }
  };

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

  const topThreePlayers = players.slice(0, 3);
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the appropriate metric based on ranking method
  const renderMetric = (player: Player) => {
    switch(rankingMethod) {
      case 'winrate':
        return (
          <>
            <p className="text-yellow-400 text-sm font-bold">
              {player.winRate}% WR
            </p>
            <p className="text-blue-300 text-xs">
              {player.matchs} partidas
            </p>
          </>
        );
      case 'stars':
        return (
          <>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-bold">{player.stars}</span>
            </div>
            <p className="text-blue-300 text-xs">
              {player.winRate}% WR
            </p>
          </>
        );
      default: // points
        return (
          <>
            <p className="text-yellow-400 text-sm font-bold">
              {player.points} RP
            </p>
            <p className="text-blue-300 text-xs">
              {player.winRate}% WR
            </p>
          </>
        );
    }
  };

  // Render the appropriate main value for player cards
  const renderMainValue = (player: Player) => {
    switch(rankingMethod) {
      case 'winrate':
        return `${player.winRate}% WR`;
      case 'stars':
        return `${player.winRate}% WR`;
      default:
        return `${player.points} RP`;
    }
  };

  // Calculate progress bar width based on ranking method
  const getProgressWidth = (player: Player) => {
    switch(rankingMethod) {
      case 'winrate':
        return `${player.winRate}%`;
      case 'stars':
        return `${(player.stars / 10) * 100}%`;
      default:
        return `${(player.points / 2000) * 100}%`;
    }
  };

  // Get progress bar color based on ranking method
  const getProgressColor = () => {
    switch(rankingMethod) {
      case 'winrate':
        return 'from-green-500 to-green-400';
      case 'stars':
        return 'from-purple-500 to-purple-400';
      default:
        return 'from-yellow-600 to-yellow-500';
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
              Hall de Jogadores
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg shadow-lg border border-blue-500 transition-all"
            >
              <span>Baixar Dados</span>
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
                    Listando por:{' '}
                  </span>
                  <span className="text-gray-100 text-sm font-medium">
                    {rankingTitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Top {players.length} Rank</span>
              </div>
            </div>

            <div className="flex justify-center items-end h-72 mt-8 relative">
              {/* Podium Base */}
              <div className="absolute -bottom-2 w-full h-10 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-xl" />

              {topThreePlayers.length >= 3 && (
                <div className="relative flex items-end justify-between w-full px-8 z-10">
                  {/* 2nd Place */}
                  <motion.div 
                    
                    className="flex flex-col items-center w-1/3"
                  >
                    <div className="sm:w-28 w-20 h-48 bg-gradient-to-b from-slate-600 to-slate-700 border-t-2 border-slate-500 rounded-t-lg flex flex-col items-center justify-center p-2 mb-2 relative shadow-lg">
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-slate-600 text-gray-200 w-10 h-10 rounded-full flex items-center justify-center border-2 border-slate-400 shadow-md">
                        <Medal className="w-5 h-5 text-slate-300" />
                      </div>
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-slate-400">
                        <RankRender rank={players[1].rank} />
                      </div>
                      <p className="text-white text-sm font-medium mb-1 truncate w-full text-center">
                        {topThreePlayers[1]?.name}
                      </p>
                      {renderMetric(topThreePlayers[1])}
                    </div>
                    <div className="px-3 py-1 bg-slate-700 rounded-full shadow-inner">
                      <p className="text-white text-xs font-medium">
                        {renderMainValue(topThreePlayers[1])}
                      </p>
                    </div>
                  </motion.div>

                  {/* 1st Place */}
                  <motion.div 
                    className="flex flex-col w-1/3 items-center -mt-12"
                  >
                    <div className="sm:w-28 w-20 h-64 bg-gradient-to-b z-40 from-yellow-600/20 via-yellow-500/10 to-slate-700 border-t-2 border-yellow-400 rounded-t-lg flex flex-col items-center justify-center p-2 mb-2 relative shadow-xl">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-lg">
                        <Crown className="w-6 h-6" />
                      </div>
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-yellow-400 shadow-md">
                        <RankRender rank={players[0].rank} />
                      </div>
                      <p className="text-white text-sm font-semibold mb-1 truncate w-full text-center">
                        {topThreePlayers[0]?.name}
                      </p>
                      {renderMetric(topThreePlayers[0])}
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full shadow-inner">
                      <p className="text-white text-xs font-bold">
                        {renderMainValue(topThreePlayers[0])}
                      </p>
                    </div>
                  </motion.div>

                  {/* 3rd Place */}
                  <motion.div 
                    
                    className="flex flex-col w-1/3 items-center"
                  >
                    <div className="sm:w-28 w-20 h-40 bg-gradient-to-b from-slate-600 to-slate-700 border-t-2 border-amber-600 rounded-t-lg flex flex-col items-center justify-center p-2 mb-2 relative shadow-lg">
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-slate-600 text-gray-200 w-10 h-10 rounded-full flex items-center justify-center border-2 border-amber-500 shadow-md">
                        <Award className="w-5 h-5 text-amber-300" />
                      </div>
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-amber-500">
                        <RankRender rank={players[2].rank} />
                      </div>
                      <p className="text-white text-sm font-medium mb-1 truncate w-full text-center">
                        {topThreePlayers[2]?.name}
                      </p>
                      {renderMetric(topThreePlayers[2])}
                    </div>
                    <div className="px-3 py-1 bg-slate-700 rounded-full shadow-inner">
                      <p className="text-white text-xs font-medium">
                        {renderMainValue(topThreePlayers[2])}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-12 text-xs text-gray-400 z-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
                <span>Total: {players.length} jogadores</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Season {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Players List */}
          <div className="lg:w-1/2 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <select
                  value={rankingMethod}
                  onChange={(e) => handleRankingChange(e.target.value as RankingMethod)}
                  className="bg-slate-700 text-white text-sm p-2 pl-10 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="points">
                    Pontos (RP)
                  </option>
                  <option value="winrate">
                    Winrate / Partidas
                  </option>
                  <option value="stars">
                    Avaliação
                  </option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {rankingMethod === 'points' && <Activity className="w-4 h-4 text-blue-400" />}
                  {rankingMethod === 'winrate' && <TrendingUp className="w-4 h-4 text-green-400" />}
                  {rankingMethod === 'stars' && <Star className="w-4 h-4 text-yellow-400" />}
                </div>
              </motion.div>
              
              <div className="relative flex items-center">
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
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
                {filteredPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
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
                    } ${index === isHovering ? 'bg-slate-700/70' : 'bg-slate-700/40'}`}
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
                    <div className="w-10 h-10 rounded-full overflow-hidden mx-2 border-2 border-slate-500">
                      <RankRender rank={player.rank} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">
                            {player.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <span className="flex items-center">
                              <span className="text-yellow-400 mr-1">⭐</span>{' '}
                              {player.stars}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{player.matchs} Partidas</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <motion.p
                            animate={{
                              color:
                                index === isHovering ? '#fbbf24' : '#f59e0b',
                              scale: index === isHovering ? 1.05 : 1,
                            }}
                            className="font-bold text-yellow-500"
                          >
                            {renderMainValue(player)}
                          </motion.p>
                          <div className="flex flex-row flex-wrap items-center justify-end gap-1">
                            <div className="w-16 bg-slate-600 rounded-full h-1.5 mt-1">
                              <div
                                className={`bg-gradient-to-r ${getProgressColor()} h-full rounded-full`}
                                style={{
                                  width: getProgressWidth(player),
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">
                              {rankingMethod === 'winrate' 
                                ? `${player.winRate}%` 
                                : rankingMethod === 'stars'
                                ? `${player.stars}/10`
                                : `${player.rank}`}
                            </span>
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