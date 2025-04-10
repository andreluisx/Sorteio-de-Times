"use client"
import Image from 'next/image';
import iron from '@/constants/ranks/iron.png'
import { Rating } from '@mui/material';
import { useState } from 'react';
import GreenButton from './GreenButton';
import { usePlayersStore } from '@/store/players';
import StarIcon from '@mui/icons-material/Star';

interface ModalProps{
  setModal: (valor: boolean)=>void;
}

export default function CreateUserModal({setModal}: ModalProps) {
  const [stars, setStars] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const disabledButton = !(stars && name) ? 1 : 2;

  const { createPlayer } = usePlayersStore()

  const handleCreateContinue = () => {
    createPlayer(name, stars);
    setStars(0);
    setName('');
  }

  const handleCreateClose = () => {
    createPlayer(name, stars);
    setModal(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Fundo escurecido */}
      <div className="absolute inset-0 bg-black opacity-90"></div>

      {/* Modal */}
      <div className="relative flex-col-reverse border border-slate-600 lg:flex-row bg-gradient-to-b bg-slate-900 rounded-2xl w-2xl max-w-11/12 flex overflow-hidden">
        {/* Lado esquerdo: Campo de nome e seleção de estrelas */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-white text-2xl font-bold mb-4">Criar Jogador</h2>
          <input
            onChange={(text)=>{return setName(text.target.value)}}
            value={name}
            type="text"
            placeholder="Digite o nome"
            className="w-full px-3 py-2 mb-4 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex lg:justify-start justify-center items-center space-x-2 py-1">
            <Rating
              name="simple-controlled"
              size="large"
              max={10}
              value={stars}
              onChange={(event, newValue) => {
                if(newValue){
                  setStars(newValue);
                }
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.9, color:'#314158' }} fontSize="inherit" />}
            />
            <p className='pl-3 text-2xl text-amber-400 pt-1 hidden lg:block'>{stars}</p>
          </div>
          <div className='pt-7 flex md:flex-row gap-4 flex-col'>
            <GreenButton placeHolder='Criar e Continuar' onClick={handleCreateContinue} number={disabledButton}/>
            <GreenButton placeHolder='Criar e Fechar' onClick={handleCreateClose} number={disabledButton}/>
          </div>
        </div>

        {/* Lado direito: Imagem do rank e nome do rank */}
        <div className="lg:w-1/3 w-full bg-slate-700 flex flex-col items-center justify-center p-4">
        <div className='absolute top-4 right-5 cursor-pointer' onClick={()=>setModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className='flex-wrap flex max-w-full'>
          <p className='overflow-hidden'>{name}</p>
        </div>
          <Image
            src={iron}
            alt="Rank Prata"
            width={130}
            height={130}
          />
          <span className="text-gray-300 text-xl font-bold pb-2">Ferro</span>
          <Rating
              name="read-only"
              size="small"
              max={10}
              readOnly
              value={stars}
              onChange={(event, newValue) => {
                if(newValue){
                  setStars(newValue);
                }
              }}
            />
        </div>
      </div>
    </div>
  );
}