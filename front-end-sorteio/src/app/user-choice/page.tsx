"use client"
import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import DroppableBox from './DroppableBox';
import PlayerDraggable from './PlayerDraggable';
import { useMatchsStore } from '@/store/matchs';
import { useRouter } from 'next/navigation';
import { usePlayersStore } from '@/store/players';
import Player from '@/types/playerType';
import CreateUserModal from '@/components/CreateUserModal';
import { PlusIcon } from '@/svg/icons/PlusIcon';

const COLUMNS = [
  { id: 'time_1', title: 'Time 1' },
  { id: 'banco', title: 'Banco' },
  { id: 'time_2', title: 'Time 2' },
];

export default function App() {
  const { createManualMatch } = useMatchsStore();
  const {
    allPlayers,
    isLoading,
    fetchPlayers,
    playersTeam1,
    playersTeam2,
    setPlayerStatus,
  } = usePlayersStore();

  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [diferentNumber, setDiferentNumber] = useState(true);
  const [modal, setModal] = useState(false)
  const router = useRouter();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    if (
      playersTeam1.length === playersTeam2.length &&
      playersTeam1.length > 0 && !isLoading
    ) {
      setDiferentNumber(false);
    } else {
      setDiferentNumber(true);
    }
  }, [playersTeam1, playersTeam2, isLoading]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const playerID = active.id as string;
    const newStatus = over.id as Player['status'];

    setPlayerStatus(playerID, newStatus);
    setActivePlayer(null);
  };

  const handleCreateMatch = () => {
    createManualMatch(playersTeam1, playersTeam2, router);
  };

  const getPlayersByStatus = (status: string) => {
    if (status === 'time_1') return playersTeam1;
    if (status === 'time_2') return playersTeam2;
    return allPlayers.filter(
      (p) =>
        !playersTeam1.some(tp => tp.id === p.id) &&
        !playersTeam2.some(tp => tp.id === p.id)
    );
  };

  return (
    <div className="p-4 w-full">
      {modal ? <CreateUserModal setModal={setModal} /> : null}
      <div
        onClick={() => setModal(true)}
        className="rounded-full cursor-pointer shadow-md shadow-black fixed text-white right-8 z-40 bottom-8 h-20 w-20 bg-green-700 flex justify-center items-center"
      >
        <PlusIcon/>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={(event) => {
            const player =
              allPlayers.find(p => p.id === event.active.id) || null;
            setActivePlayer(player);
          }}
        >
          {COLUMNS.map((column) => (
            <DroppableBox
              key={column.id}
              column={column}
              players={getPlayersByStatus(column.id)}
              isScrollable={column.id === 'banco'}
              onClick={handleCreateMatch}
              diferentNumber={diferentNumber}
            />
          ))}
          <DragOverlay>
            {activePlayer ? <PlayerDraggable player={activePlayer} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
