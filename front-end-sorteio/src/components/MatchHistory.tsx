'use client';
import { useMatchsStore } from '@/store/matchs';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IMatchType } from '@/types/matchType';
import { TrophyIcon, ClockIcon, CalendarIcon, FireIcon } from '@/components/ui/Icons';
import MatchFooter from './match/MatchHistory/MatchFooter';
import MatchTeams from './match/MatchHistory/MatchTeams';
import MatchLoading from './match/MatchHistory/MatchLoading';
import MatchEmpty from './match/MatchHistory/MatchEmpty';
import { formatDate } from './match/MatchHistory/utils';

interface MatchHistoryProps {
  matchs: IMatchType[];
  enhanced?: boolean;
}

export default function MatchHistory({ matchs, enhanced = true }: MatchHistoryProps) {
  const { isLoading } = useMatchsStore();
  const router = useRouter();

  const handleMatchClick = (id: number) => {
    router.push(`/matchs/${id}`);
  };

  const getMatchResult = (match: IMatchType) => {
    if (match?.playerWon === 0 || match?.winner === 0) {
      return { 
        text: 'Em Andamento', 
        color: 'bg-amber-500/20 text-amber-400',
        border: 'border-amber-500/30',
        icon: <ClockIcon className="text-amber-400" />
      };
    } else if (!match?.playerWon) {
      return { 
        text: `Time ${match.winner} Venceu`, 
        color: 'bg-blue-500/20 text-blue-400',
        border: 'border-blue-500/30',
        icon: <TrophyIcon className="text-blue-400" />
      };
    } else if (match?.playerWon === 1) {
      return { 
        text: 'Vitória', 
        color: 'bg-green-500/20 text-green-400',
        border: 'border-green-500/30',
        icon: <FireIcon className="text-green-400" />
      };
    } else if (match?.playerWon === 2) {
      return { 
        text: 'Derrota', 
        color: 'bg-red-500/20 text-red-400',
        border: 'border-red-500/30',
        icon: <FireIcon className="text-red-400" />
      };
    }
    return { 
      text: 'Sem Resultado', 
      color: 'bg-gray-500/20 text-gray-400',
      border: 'border-gray-500/30',
      icon: null
    };
  };

  if (isLoading) {
    return (
      <MatchLoading/>
    );
  }

  if (matchs.length === 0) {
    return (
      <MatchEmpty/>
    );
  }

  return (
    <div 
      className="w-full overflow-y-auto custom-scrollbar"
      style={{
        height: 'calc(300vh - 200px)',
        maxHeight: '1000px',
      }}
    >
      <div className="grid grid-cols-1 gap-3 p-2 md:p-4 min-h-min">
        <AnimatePresence>
          {matchs.map((match: IMatchType) => {
            const result = getMatchResult(match);
            
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`relative group rounded-xl cursor-pointer overflow-hidden shadow-lg ${result.border} border`}
                onClick={() => handleMatchClick(match.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className={`px-4 py-3 flex justify-between items-center ${result.color}`}>
                  <div className="flex items-center gap-2">
                    {result.icon}
                    <span className="font-semibold">{result.text}</span>
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <CalendarIcon className="text-slate-400 size-4" />
                    <span className="text-slate-300">{formatDate(match.createdAt)}</span>
                  </div>
                </div>
                
                <MatchTeams team1={match.team1} team2={match.team2} enhanced={enhanced} />
                
                <MatchFooter matchTime={match.matchTime} matchId={match.id} enhanced={enhanced} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}