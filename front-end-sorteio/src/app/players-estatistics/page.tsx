import ButtonNavigationCard from '@/components/ButtonNavigationCard';
import playerImage from '@/constants/buttons/player.png';
import estatisticsImage from '@/constants/buttons/stats.png';
import { IoGameController } from "react-icons/io5";

// app/page.tsx
export default function PlayerEstatistics() {
  return (
    <div className=" flex-col items-center  justify-start text-white py-10 px-4 gap-5 flex w-full">
      <h1 className='text-4xl text-center'>Estatísticas dos Jogadores</h1>
      <div className='flex flex-wrap  justify-center items-center flex-row gap-10 pt-5'>
        
        <ButtonNavigationCard placeHolder='Jogadores' imageUrl={playerImage} nextPage='/players-estatistics/players'/>
        <ButtonNavigationCard placeHolder='Melhores Jogadores' imageUrl={estatisticsImage} nextPage='/players-estatistics/players'/>
      </div>
    </div>
  );
}