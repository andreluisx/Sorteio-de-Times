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
    <div
      className={`w-full flex-col z-30 flex min-h-28 lg:min-h-28 bg-gradient-to-b  rounded-lg border border-slate-600`}
    >
      <div className="bg-slate-900 flex flex-row justify-between items-center rounded-t-lg p-3 border-b border-slate-600">
        <p className="text-sm">banco: {players.length}</p>
        <h2 className="text-center text-xl font-bold text-white">Jogadores</h2>
        <div className="w-14"></div>
      </div>
      <div
        className="p-4 grid grid-cols-1 bg-slate-800 md:grid-cols-2 lg:grid-cols-1 gap-3 overflow-y-auto"
        style={{
          maxHeight: '560px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 #1F2937',
        }}
      >
        {players.length !== 0 ? (
          <>
            {players.map((player) => (
              <div key={player.id}>
                <PlayerCard
                  rank={player.rank}
                  matchs={player.matchs}
                  name={player.name}
                  stars={player.stars}
                  winRate={player.winRate}
                  onClick={() => {
                    if (handlePlayer) {
                      handlePlayer(player);
                    }
                  }}
                />
              </div>
            ))}
          </>
        ) : (
          <div>
            <p className="text-center">
              Lista vazia adicione jogadores no + verde, localizado no canto
              inferior direito.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
