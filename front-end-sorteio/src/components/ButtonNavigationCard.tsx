"use client"
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonNavigationCardProps {
  nextPage: string;
  imageUrl: StaticImageData;
  placeHolder: string;
  gradient?: string;
}

export default function ButtonNavigationCard({
  nextPage, 
  imageUrl, 
  placeHolder,
  gradient = 'from-red-600 to-red-800'
}: ButtonNavigationCardProps) {
  return (
    <Link href={nextPage} passHref>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-64 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer"
      >
        {/* Imagem de fundo com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${imageUrl.src})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-80`}></div>
        </div>

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>

        {/* Conteúdo */}
        <div className="relative z-20 h-full flex flex-col justify-end p-6">
          <h3 className="text-3xl font-bold text-white mb-2">{placeHolder}</h3>
          
          {/* Efeito de borda animada */}
          <div className="w-0 h-1 bg-white group-hover:w-full transition-all duration-500 mb-2"></div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Explorar</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-5 h-5 text-white"
            >
              <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}