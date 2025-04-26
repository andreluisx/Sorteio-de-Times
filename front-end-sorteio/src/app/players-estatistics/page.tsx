"use client"
import ButtonNavigationCard from '@/components/ButtonNavigationCard';
import playerImage from '@/constants/buttons/player.png';
import estatisticsImage from '@/constants/buttons/stats.png';
import imageDuo from '@/constants/icons/duos.jpg';
import starsImage from '@/constants/buttons/stars.png';
import { motion } from 'framer-motion';

export default function PlayerEstatistics() {
  const cards = [
    {
      title: 'Jogadores',
      image: playerImage,
      path: '/players-estatistics/players',
      color: 'from-gray-600 to-gray-900'
    },
    {
      title: 'Melhores Jogadores',
      image: estatisticsImage,
      path: '/players-estatistics/ranking',
      color: 'from-gray-600 to-gray-900'
    },
    {
      title: 'Melhores Duplas',
      image: imageDuo,
      path: '/players-estatistics/best-duos',
      color: 'from-gray-600 to-gray-900'
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className='text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500'>
          Estatísticas dos Jogadores
        </h1>
        <p className="text-slate-400 mb-12 text-lg">
          Explore as métricas e desempenho dos competidores
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.path}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              <ButtonNavigationCard 
                placeHolder={card.title}
                imageUrl={card.image}
                nextPage={card.path}
                gradient={card.color}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}