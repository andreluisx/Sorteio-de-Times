'use client';
import { useDroppable } from '@dnd-kit/core';
import PlayerDraggable from './PlayerDraggable';
import Player from '@/types/playerType';
import { Column as ColumnType } from '@/types/TaskType';
import { CircularProgress } from '@mui/material';

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
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col w-full h-full">
      <div
        ref={setNodeRef}
        className={`flex flex-col rounded-xl shadow-lg overflow-hidden ${
          isScrollable
            ? 'bg-slate-800/80 border border-slate-700'
            : 'bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-dashed border-red-500/30'
        } ${
          isOver && !isScrollable ? 'border-red-500 bg-slate-800/50' : ''
        } transition-colors duration-100`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 ${
          isScrollable 
            ? 'bg-slate-700/50 border-b border-slate-700' 
            : 'bg-gradient-to-r from-red-900/80 to-red-950/80'
        }`}>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-white">
              {column.title}
            </h2>
            <span className="text-xs bg-slate-800/80 px-2 py-1 rounded-full">
              {players.length} {players.length === 1 ? 'jogador' : 'jogadores'}
            </span>
          </div>
          
          {!isScrollable && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              diferentNumber 
                ? 'bg-red-900/50 text-red-300' 
                : 'bg-green-900/50 text-green-300'
            }`}>
              {diferentNumber ? 'Números diferentes' : 'Pronto para jogar'}
            </div>
          )}
        </div>

        {/* Área de conteúdo */}
        <div className={`p-4 ${
          players.length === 0 ? 'min-h-[200px]' : ''
        }`}>
          {players.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full ${
              isScrollable ? 'py-8' : 'py-12'
            }`}>
              {isScrollable ? (
                <>
                  <div className="text-center text-slate-400 mb-4">
                    <p>Adicione jogadores usando o botão</p>
                    <p className="text-sm mt-1">Times com números diferentes não geram partida</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-700/50 border-2 border-dashed border-slate-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-8 bg-slate-800/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      
                    </div>
                    <p className="relative z-10 text-slate-300">
                      Arraste jogadores para este time
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div 
              className={`grid px-3 py-2 grid-cols-1 gap-3 ${
                isScrollable ? 'max-h-[400px] overflow-y-auto' : ''
              }`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#4B5563 #1F2937',
              }}
            >
              {players.map((player) => (
                <PlayerDraggable key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Botão de ação */}
      {column.id === 'banco' && (
        <button
          onClick={onClick}
          disabled={diferentNumber || isLoading}
          className={`cursor-pointer mt-4 py-3 px-6 rounded-xl font-medium text-white transition-colors ${
            diferentNumber || isLoading
              ? 'bg-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-900/30'
          }`}
        >
          {isLoading ? (
            <div className=" flex items-center justify-center gap-2">
              <CircularProgress color="inherit" size={20} />
              <span>Gerando...</span>
            </div>
          ) : (
            'Gerar Partida'
          )}
        </button>
      )}
    </div>
  );
}