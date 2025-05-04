'use client'
import Image from 'next/image';
import { Rating } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GreenButton from './GreenButton';
import { usePlayersStore } from '@/store/players';
import StarIcon from '@mui/icons-material/Star';

interface ModalProps {
  setModal: (valor: boolean) => void;
}

export default function CreateUserModal({ setModal }: ModalProps) {
  const [stars, setStars] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const disabledButton = !(stars && name);

  const { createPlayer } = usePlayersStore();

  const handleCreate = (button: string) => {
    createPlayer(name, stars);
    
    switch (button) {
      case 'continue': 
        setStars(0);
        setName('');
        break;
      case 'close':
        setModal(false);
        break;
      default:
        setModal(false);
    }
    
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
    >
      {/* Fundo escurecido com efeito de blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black backdrop-blur-sm"
        onClick={() => setModal(false)}
      />

      {/* Modal principal */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative flex flex-col lg:flex-row bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-red-900/50 shadow-xl shadow-black/50 overflow-hidden w-full max-w-4xl"
      >
        {/* Botão de fechar */}
        <button
          onClick={() => setModal(false)}
          className="cursor-pointer absolute top-4 right-4 z-10 p-1 rounded-full bg-slate-800 hover:bg-red-900/50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-slate-300 hover:text-white">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Lado esquerdo: Formulário */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Criar Novo Jogador</h2>
          
          {/* Campo de nome */}
          <div className="mb-6">
            <label htmlFor="player-name" className="block text-sm font-medium text-slate-300 mb-2">
              Nome do Jogador
            </label>
            <input
              id="player-name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Digite o nome"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Avaliação por estrelas */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Nível do Jogador
            </label>
            <div className="flex items-center gap-4">
              <Rating
                name="player-rating"
                size="large"
                max={10}
                value={stars}
                onChange={(_, newValue) => newValue && setStars(newValue)}
                icon={<StarIcon className="text-amber-400" fontSize="inherit" />}
                emptyIcon={<StarIcon className="text-slate-700" fontSize="inherit" />}
              />
              <span className="text-2xl font-bold text-amber-400">
                {stars.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <GreenButton 
              placeHolder='Criar e Continuar' 
              onClick={()=>handleCreate('continue')} 
              disabled={disabledButton}
            />
            <GreenButton 
              placeHolder='Criar e Fechar' 
              onClick={()=>handleCreate('close')} 
              disabled={disabledButton}
            />
          </div>
        </div>

        {/* Lado direito: Visualização do rank */}
        <div className="lg:w-1/3 w-full bg-gradient-to-b from-slate-800 to-slate-900 border-t lg:border-t-0 lg:border-l border-slate-700 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Nome do jogador (pré-visualização) */}
          <div className="w-full text-center mb-6">
            <h3 className={`text-xl font-bold truncate ${name ? 'text-white' : 'text-slate-500'}`}>
              {name || 'Nome do Jogador'}
            </h3>
          </div>
          
          {/* Imagem do rank */}
          <div className="relative w-32 h-32 mb-2">
            <Image
              src='/ranks/silver.png'
              alt="Rank Ferro"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Nome do rank */}
          <span className="text-slate-400 text-xl font-bold">Prata</span>
          <span className="text-slate-200 text-md font-bold mb-4">1000 pts</span>
          
          {/* Visualização das estrelas */}
          <Rating
            name="stars-preview"
            size="medium"
            max={10}
            readOnly
            value={stars}
            icon={<StarIcon className="text-amber-400" fontSize="inherit" />}
            emptyIcon={<StarIcon className="text-slate-700" fontSize="inherit" />}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}