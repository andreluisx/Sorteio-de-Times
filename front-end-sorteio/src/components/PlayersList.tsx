import Player from '@/types/playerType';
import PlayerCard from './PlayerCard';

interface PlayerListProps {
  players: Player[];
  handlePlayer?: (player: Player) => void;
}

export default function PlayersList({
  players,
  handlePlayer,
}: PlayerListProps) {
  return (
    <div className="flex flex-col w-full h-full rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-white">Jogadores</h2>
          <span className="text-xs bg-slate-800/80 px-2 py-1 rounded-full">
            {players.length} {players.length === 1 ? 'jogador' : 'jogadores'}
          </span>
        </div>
      </div>

      {/* Lista de Jogadores */}
      <div className={`p-4 ${
          players.length === 0 ? 'min-h-[200px]' : ''
        }`}>
          {players.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 border-2 border-dashed border-slate-600 flex items-center justify-center mb-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-slate-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-slate-400 max-w-[200px]">
              Adicione jogadores usando o botão no canto inferior direito
            </p>
          </div>
          ) : (
            <div 
              className={`grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto px-5 py-3`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#4B5563 #1F2937',
              }}
            >
              {players.map((player) => (
                <PlayerCard 
                  points={player.points}
                  key={player.id}
                  matchs={player.matchs}
                  name={player.name}
                  rank={player.rank}
                  stars={player.stars}
                  winRate={player.winRate}
                  onClick={handlePlayer ? () => handlePlayer(player) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
  );
}