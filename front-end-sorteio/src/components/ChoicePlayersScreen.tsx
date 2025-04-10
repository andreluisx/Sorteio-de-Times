'use client';

import PlayerCard from './PlayerCard';
import CreateUserModal from './CreateUserModal';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { usePlayersStore } from '@/store/players';
import Player from '@/types/playerType';
import { SortedTypes } from '@/types/sortedTypes';
import { useMatchsStore } from '@/store/matchs';
import PlayersList from './PlayersList';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@/svg/icons/PlusIcon';

interface RandomChoiceScreenProps {
  title: string;
  type: SortedTypes;
}

const TeamSection = (
  players: Player[],
  handlePlayer: (player: Player) => void
) => {return (
  <PlayersList players={players} handlePlayer={handlePlayer}/>
)};

export default function RandomChoiceScreen({
  title,
  type,
}: RandomChoiceScreenProps) {
  const {
    togglePlayerBetweenLists,
    playersData,
    matchPlayers,
    isLoading,
    fetchPlayers,
  } = usePlayersStore();
  const match = useMatchsStore();
  const sizeMatchPlayersList = matchPlayers?.length;

  const [modal, setModal] = useState(false);
  const router = useRouter()

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handleDrawTeams = () => {
    if (type === 'random') {
      match.createRandomMatch(matchPlayers, router);
    }
    if (type === 'stars') {
      match.createStarMatch(matchPlayers, router);
    }
    if (type === 'winRate') {
      match.createWinRateMatch(matchPlayers, router);
    }
  };

  const handlePlayer = (player: Player) => {
    togglePlayerBetweenLists(player.id);
  };

  return (
    <div className="custom-bg dark:custom-bg px-3 lg:px-3 py-7 justify-start items-start flex flex-col w-full">
      {modal ? <CreateUserModal setModal={setModal} /> : null}
      <div
        onClick={() => setModal(true)}
        className="rounded-full cursor-pointer shadow-md shadow-black fixed text-white right-8 z-40 bottom-8 h-20 w-20 bg-green-700 flex justify-center items-center"
      >
        <PlusIcon/>
      </div>
      <div className="justify-center flex-row gap-3 flex items-center w-full">
        <h1 className="font-bold text-3xl text-center">{title}</h1>
      </div>
      <div className="flex pb-36 flex-col-reverse w-full pt-10 justify-center pl-4 lg:justify-start items-start lg:flex-row-reverse lg:gap-1 gap-10 lg:pb-6">
        <div className="lg:w-7/12 w-full flex justify-center flex-col items-center  lg:px-1 ">
          <div className="min-h-18 bg-gradient-to-tl from-red-900 to-black w-full rounded-md border border-slate-700">
            <div className="flex w-full bg-red-950 justify-center items-center rounded-t-md border border-red-950">
              <div className="flex w-full h-full justify-between">
                <p
                  className={`p-3 text-sm pb-2 text-center ${
                    sizeMatchPlayersList % 2 !== 0 || sizeMatchPlayersList === 0
                      ? 'text-white'
                      : 'text-green-500'
                  }`}
                >
                  Partida: {matchPlayers.length} jogadores.
                </p>
                <div></div>
                <button
                  onClick={handleDrawTeams}
                  disabled={
                    matchPlayers.length % 2 !== 0 ||
                    matchPlayers.length == 0 ||
                    isLoading
                  }
                  className="px-10 py-2 disabled:bg-slate-700 cursor-pointer h-full rounded-tr-md flex bg-red-800"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={23} />
                  ) : (
                    'Sortear'
                  )}
                </button>
              </div>
            </div>
            {sizeMatchPlayersList === 0 ? (
              <div className="px-4 flex py-4 mt-5 rounded-md min-h-26 text-slate-200 items-center justify-center">
                <p>Adicione e Remova jogadores clicando nos seus cards</p>
              </div>
            ) : (
              <div
                style={{
                  maxHeight: '384px',
                  overflowY: 'auto',
                  paddingTop: '33px',
                  paddingBlock: '20px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4B5563 #1F2937',
                }}
                className="grid grid-cols-1 md:grid-cols-2 px-5"
              >
                {matchPlayers.map((player) => (
                  <div key={player.id} className="px-1">
                    <PlayerCard
                      matchs={player.matchs}
                      name={player.name}
                      rank={player.rank}
                      stars={player.stars}
                      winRate={player.winRate}
                      onClick={() => handlePlayer(player)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-5/12 w-full lg:px:0 lg:pr-6 flex justify-center items-center flex-col">
          {TeamSection(playersData, handlePlayer)}
        </div>
      </div>
    </div>
  );
}
