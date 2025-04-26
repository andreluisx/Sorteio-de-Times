import Player from '@/types/playerType';
import { RankRender } from '../RanksRender';

export default function TopList({ players }: { players: Player[] }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 overflow-y-auto max-h-[600px] shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">Top 12 Jogadores</h2>
      <div className="space-y-2">
        {players.map((player, i) => (
          <div key={player.id} className="flex items-center justify-between bg-slate-700 p-3 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <RankRender rank={player.rank} />
              <div>
                <p className="text-white font-semibold">{i + 1}. {player.name}</p>
                <p className="text-slate-400 text-sm">time</p>
              </div>
            </div>
            <span className="text-green-400 font-bold">{player.winRate}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
