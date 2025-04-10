'use client';
import { useDroppable } from '@dnd-kit/core';
import PlayerDraggable from './PlayerDraggable';
import Player from '@/types/playerType';
import { Column as ColumnType } from '@/types/TaskType';

type Props = {
  column: ColumnType;
  players: Player[];
  isScrollable?: boolean;
  onClick?: () => void;
  diferentNumber: boolean;
  isLoading: boolean;
};

export default function DroppableBox({
  column,
  players,
  isScrollable,
  onClick,
  diferentNumber,
  isLoading
}: Props) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col w-full h-full">
      <div
        ref={setNodeRef}
        className={`flex flex-col rounded-lg border ${
          isScrollable
            ? 'bg-slate-800 border-slate-600'
            : 'bg-gradient-to-tl from-red-900 to-black border-slate-600'
        } py-4`}
      >
        <div className="flex flex-row justify-between items-center px-4 mb-6 lg:mb-3">
          <p className="text-sm">jogadores: {players.length}</p>
          <h2 className="text-center font-semibold text-white">
            {column.title}
          </h2>
          <div className="w-20"></div>
        </div>
        <div className={`${players.length === 0 ? 'px-7 py-4' : 'px-2 py-4'}`}>
        {players.length === 0 && !isScrollable ? (
          <div className="relative border border-slate-800 mt-5 rounded-lg h-28 w-full overflow-hidden">
          {/* Fundo com opacidade cobrindo tudo */}
          <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-lg" />
        
          {/* Texto centralizado */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <p className="text-white text-center px-4">
              Arraste jogadores do banco que você quer nesse time
            </p>
          </div>
        </div>
        
        ) : null}
        {players.length === 0 && isScrollable ? (
          <div className="text-center flex flex-col lg:mt-4 mt-10 px-4 gap-5">
            <p>Adicione Jogadores no + no canto inferior direito da tela.</p>
            <p>Times com diferentes numeros de jogadores não geram partida.</p>
          </div>
        ) : null}
        <div
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}
          className={`flex flex-1 flex-col gap-4 ${
            players.length === 0 ? 'pt-6 pb-0' : 'pt-2 lg:pt-6 pb-4'
          } px-4 ${
            isScrollable ? 'scroll-smooth max-h-[400px] overflow-y-auto' : ''
          }`}
        >
          {players.map((player) => (
            <PlayerDraggable key={player.id} player={player} />
          ))}
        </div>
        </div>
      </div>

      {column.id === 'banco' && (
        <button
          onClick={onClick}
          disabled={diferentNumber}
          className="disabled:bg-slate-600 mt-4 p-2 cursor-pointer bg-red-800 text-white rounded hover:bg-red-700"
        >
          {isLoading ? 'Loading' : 'Gerar Partida'}
        </button>
      )}
    </div>
  );
}
