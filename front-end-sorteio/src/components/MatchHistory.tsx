'use client';
import { useMatchsStore } from '@/store/matchs';
import TimeConvert from './TimeConvert';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import Player from '@/types/playerType';
import { IMatchType } from '@/types/matchType';


const formatDate = (dateString: string) => {
  
  if (typeof window !== 'undefined') {
    const date = new Date(dateString);
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }
  return dateString;
};

interface MatchHistoryProps {
  matchs: IMatchType[],
}

export default function MatchHistory({matchs}: MatchHistoryProps) {
  const { isLoading } = useMatchsStore();
  const router = useRouter();

  const handleMatchClick = (id: number) => {
    router.push(`/matchs/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
          <CircularProgress size={35} title="Loading..." color="inherit" />
      </div>
    );
  }

  const borderResult = (match: IMatchType)=>{
    if(!match){
      return ''
    }
    else if(match.playerWon === 1){
      return 'border border-green-800'
    }
    else if(match.playerWon === 2){
      return 'border border-red-800'
    }
    else if(match.playerWon === 0){
      return 'border border-yellow-800'
    }
  }

  const TextResult = (match: IMatchType)=>{
    console.log(match?.playerWon)
    if(match?.playerWon === 0 || match?.winner === 0){
      return 'Não Finalizado'
    }
    else if(!match?.playerWon){
      return `Vencedor: Time ${match.winner}`
    }
    else if(match?.playerWon === 1){
      return 'Vitória'
    }
    else if(match?.playerWon === 2){
      return 'Derrota'
    }
    
  }

  const textResultColor = (match: IMatchType) => {
    if(match.playerWon === 0 || match.winner === 0){
      return 'text-yellow-700'
    }
    else if(!match.playerWon){
      return `text-green-500`
    }
    else if(match.playerWon === 1){
      return 'text-green-700'
    }
    else if(match.playerWon === 2){
      return 'text-red-700'
    }
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
      {matchs.map((match: IMatchType) => (
        <div 
          key={match.id} 
          className={`bg-slate-800 rounded-t-lg shadow-md cursor-pointer ${borderResult(match)}`}
          onClick={()=>handleMatchClick(match.id)}
        >
          <div className="px-6 py-4 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 flex-col flex-wrap lg:flex-row">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Time 1</span>
                  <div className="text-white max-w-[200px] truncate">
                    {match.team1.map((player: Player) => player.name).join(', ')}
                  </div>
                </div>
                <span className="text-gray-500">vs</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Time 2</span>
                  <div className="text-white max-w-[200px] truncate">
                    {match.team2.map((player: Player) => player.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className={`text-right ${textResultColor(match)} font-semibold`}>
                {TextResult(match)}
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