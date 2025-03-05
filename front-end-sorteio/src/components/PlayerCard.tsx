import { Rating } from '@mui/material';
import Player from '@/types/playerType';
import { RankRender } from '@/utils/RanksRender';
import StarIcon from '@mui/icons-material/Star';


interface PlayerCardProps {
  name: string;
  winRate?: number;
  matchs: number;
  stars: number;
  rank: string;
  onClick?: (player: Player[]) => void;
}

const winRateRender = (winRate: number | undefined, matchs: number) => {
  if (winRate === 0) {
    return (
      <p className="text-sm overflow-hidden flex-wrap text-gray-700 dark:text-gray-300">
        {winRate}% de vitórias em {matchs} partidas
      </p>
    );
  } else if (!winRate) {
    return null;
  }
  return (
    <p className="text-sm overflow-hidden flex-wrap text-gray-700 dark:text-gray-300">
      {winRate}% de vitórias em {matchs} partidas
    </p>
  );
};

export default function PlayerCard({
  name,
  winRate,
  matchs,
  stars,
  rank,
  onClick,
}: PlayerCardProps) {
  return (
    <a className="cursor-pointer" onClick={onClick}>
      <div className="w-full flex-row transform transition-transform hover:scale-105 flex gap-0 max-lg:gap-10 justify-between bg-gradient-to-bl from-red-600 to-black rounded-md p-2 shadow-slate-950 shadow-lg mb-4">
        <div>
          <div>
            <p className="text-2xl flex-wrap overflow-hidden pb-1 font-bold">
              {name}
            </p>
            {winRateRender(winRate, matchs)}
          </div>
          <div className="pt-2 flex flex-row">
            <Rating
              name="customized-10"
              size={'small'}
              readOnly
              defaultValue={stars}
              max={10}
              emptyIcon={<StarIcon style={{ opacity: 0.9, color:'#121a31' }} fontSize="inherit" />}
            />
            <p className="text-sm pl-2 text-yellow-400">{stars}</p>
          </div>
        </div>
        <div className="flex max-w-28 h-16 justify-end pr-1 items-center xl:w-96">
          <RankRender rank={rank} />
        </div>
      </div>
    </a>
  );
}
