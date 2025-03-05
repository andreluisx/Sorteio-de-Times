'use client';
import { useMatchsStore } from '@/store/matchs';
import { useEffect, useState } from 'react';
import TimeConvert from './TimeConvert';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

// Move date formatting to a client-side only function
const formatDate = (dateString: string) => {
  // Ensure this only runs on the client
  if (typeof window !== 'undefined') {
    const date = new Date(dateString);
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }
  // Return original string on server to prevent hydration mismatch
  return dateString;
};

export default function MatchHistory() {
  const { getAllMatchs, allMatchs, isLoading } = useMatchsStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const handleMatchClick = (id: number) => {
    router.push(`/matchs/${id}`)
  }

  useEffect(() => {
    getAllMatchs();
    setIsMounted(true);
  }, [getAllMatchs]);

  // Prevent rendering on server
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
          <CircularProgress size={35} title="Loading..." color="inherit" />
      </div>
    );
  }
  

  return (
    <div
      className="p-1 lg:p-4 grid w-full max-w-4xl mx-auto grid-cols-1 gap-4 overflow-y-auto"
      style={{
        maxHeight: '560px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#4B5563 #1F2937',
      }}
    >
      {allMatchs.map((match) => (
        <div 
          key={match.id} 
          className="bg-slate-800 rounded-lg shadow-md cursor-pointer"
          onClick={()=>handleMatchClick(match.id)}
        >
          <div className="px-6 py-4 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 flex-col flex-wrap lg:flex-row">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Time 1</span>
                  <div className="text-white max-w-[200px] truncate">
                    {match.team1.map(player => player.name).join(', ')}
                  </div>
                </div>
                <span className="text-gray-500">vs</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Time 2</span>
                  <div className="text-white max-w-[200px] truncate">
                    {match.team2.map(player => player.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="text-right text-green-500 font-semibold">
                {!match.winner ? '' : `Vencedor: Time ${match.winner}`}
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-slate-900 flex justify-between items-center">
            <TimeConvert time={match.matchTime}/>
            <span className="text-sm text-gray-400">
              {formatDate(match.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}