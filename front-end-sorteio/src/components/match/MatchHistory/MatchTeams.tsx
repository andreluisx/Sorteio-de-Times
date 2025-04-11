import { StarIcon } from '@/components/ui/Icons';
import { calculateTeamStars } from './utils';
import Player from '@/types/playerType';

interface MatchTeamsProps {
  team1: Player[];
  team2: Player[];
  enhanced?: boolean;
  matchTime?: number;
}

export default function MatchTeams({
  team1,
  team2,
  enhanced,
}: MatchTeamsProps) {
  const team1Stars = calculateTeamStars(team1);
  const team2Stars = calculateTeamStars(team2);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <TeamSection
          team={team1}
          label="TIME 1"
          stars={team1Stars}
          enhanced={enhanced}
        />

        <div className="flex flex-col items-center justify-center px-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xl font-bold text-slate-300">
              VS
            </div>
          </div>
        </div>

        <TeamSection
          team={team2}
          label="TIME 2"
          stars={team2Stars}
          enhanced={enhanced}
        />
      </div>
    </div>
  );
}

const TeamSection = ({
  team,
  label,
  stars,
  enhanced,
}: {
  team: Player[];
  label: string;
  stars: number;
  enhanced?: boolean;
}) => (
  <div className="flex-1 w-full">
    <div className="flex flex-col items-center text-center">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="flex flex-col gap-1 w-full">
        {team.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between px-3 py-1 bg-slate-800/50 rounded"
          >
            <span className="text-sm text-white truncate max-w-[120px]">
              {player.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-amber-400">
                {player.stars?.toFixed(1)}
              </span>
              <StarIcon className="text-amber-400 size-3" />
            </div>
          </div>
        ))}
      </div>
      {enhanced && (
        <div className="mt-2 text-xs text-slate-400">
          Média: {stars.toFixed(1)} ★
        </div>
      )}
    </div>
  </div>
);
