import Player from '@/types/playerType';

export default function TopPodium({ players }: { players: Player[] }) {
  const podiumStyles = ["bg-yellow-400", "bg-blue-400", "bg-red-400"];

  return (
    <div className="flex justify-center gap-6 items-end h-80">
      {players.map((player, index) => (
        <div key={player.id} className={`flex flex-col items-center`}>
          <div className={`w-24 h-24 rounded-full bg-cover bg-center border-4 border-white shadow-lg`} style={{ backgroundImage: `url(${player.avatarUrl})` }} />
          <div className={`mt-2 px-4 py-2 text-white font-bold rounded-t-lg ${podiumStyles[index]}`}>
            {player.name}
          </div>
          <div className="text-sm text-slate-300 mt-1">{player.points} pts</div>
        </div>
      ))}
    </div>
  );
}
