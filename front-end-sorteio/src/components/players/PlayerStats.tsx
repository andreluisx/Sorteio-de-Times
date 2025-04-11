// components/players/PlayerStats.tsx
interface PlayerStatsProps {
  winRate?: number;
  matchs?: number;
  wins?: number;
  losses?: number;
  stars?: number;
}

export const PlayerStats = ({
  winRate,
  matchs,
  wins,
  losses,
  stars,
}: PlayerStatsProps) => (
  <div className="flex gap-1 flex-col text-sm lg:text-md">
    <div className="text-slate-400 flex flex-row gap-2">
      Taxa de vitórias: <span className="text-slate-200">{winRate?.toFixed(1) || 0}%</span>
    </div>
    <div className="text-slate-400 flex flex-row gap-2">
      Partidas jogadas: <span className="text-slate-200">{matchs || 0}</span>
    </div>
    <div className="text-slate-400 flex flex-row gap-2">
      Vitórias: <span className="text-slate-200">{wins || 0}</span>
    </div>
    <div className="text-slate-400 flex flex-row gap-2">
      Derrotas: <span className="text-slate-200">{losses || 0}</span>
    </div>
    <div className="text-slate-400 flex flex-row gap-2">
      Estrelas: <span className="text-slate-200">{stars || 0}</span>
    </div>
  </div>
);