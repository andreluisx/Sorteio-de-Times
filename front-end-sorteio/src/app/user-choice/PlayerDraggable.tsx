"use client"
import { useDraggable } from '@dnd-kit/core';
import PlayerCard from '@/components/PlayerCard';
import Player from '@/types/playerType';


type TaskCardProps = {
  player: Player;
};

export default function TaskCard({ player }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg"
      style={style}
    >
     <PlayerCard matchs={player.matchs} name={player.name} rank={player.rank} stars={player.stars} key={player.id} winRate={player.winRate}/>
    </div>
  );
}