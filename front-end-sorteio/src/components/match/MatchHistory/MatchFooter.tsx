import { ClockIcon } from '@/components/ui/Icons';
import TimeConvert from './TimeConvert';

interface MatchFooterProps {
  matchTime: number;
  matchId?: number;
  enhanced?: boolean;
}

export default function MatchFooter({ matchTime, matchId, enhanced }: MatchFooterProps) {
  return (
    <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <ClockIcon className="size-3" />
        <TimeConvert time={matchTime} />
      </div>
      {enhanced && (
        <div className="text-xs text-slate-500">
          ID: {matchId}
        </div>
      )}
    </div>
  );
}