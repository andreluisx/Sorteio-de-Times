'use client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IMatchType } from '@/types/matchType';
import MatchCard from './MatchCard';
import MatchEmpty from './MatchEmpty';
import MatchLoading from './MatchLoading';

interface MatchHistoryProps {
  matchs: IMatchType[];
  enhanced?: boolean;
  isLoading?: boolean;
}

export default function MatchHistory({ 
  matchs, 
  enhanced = false, 
  isLoading = false 
}: MatchHistoryProps) {
  const router = useRouter();

  if (isLoading) {
    return <MatchLoading />;
  }

  if (matchs.length === 0) {
    return <MatchEmpty enhanced={enhanced} />;
  }

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 gap-3 p-2 md:p-4">
        <AnimatePresence>
          {matchs.map((match) => (
            <MatchCard 
              key={match.id} 
              match={match} 
              enhanced={enhanced}
              onClick={() => router.push(`/matchs/${match.id}`)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}