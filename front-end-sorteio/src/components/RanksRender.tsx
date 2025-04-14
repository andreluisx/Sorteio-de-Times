import Image from 'next/image';

interface RankRenderProps {
  rank: string;
}

const size = 120

export const RankRender = ({rank}: RankRenderProps) => {
    if(rank === 'Challenger'){
      return <Image alt='challenger-rank' width={size} height={size} src='/ranks/challenger.png' className='w-full'/>;
    }
    else if(rank === 'Grão-Mestre'){
      return <Image alt='grandmaster-rank' width={size} height={size} src='/ranks/grandMaster.png' className='w-full'/>
    }
    else if(rank === 'Mestre'){
      return <Image alt='master-rank' width={size} height={size} src='/ranks/mestre.png' className='w-full'/>
    }
    else if(rank === 'Diamante'){
      return <Image alt='diamond-rank' width={size} height={size} src='/ranks/diamond.png' className='w-full'/>
    }
    else if(rank === 'Esmeralda'){
      return <Image alt='emerald-rank' width={size} height={size} src='/ranks/emerald.png' className='w-full'/>
    }
    else if(rank === 'Ouro'){
      return <Image alt='gold-rank' width={size} height={size} src='/ranks/gold.png' className='w-full'/>
    }
    else if(rank === 'Prata'){
      return <Image alt='prata-rank' width={size} height={size} src='/ranks/silver.png' className='w-full'/>
    }
    else if(rank === 'Bronze'){
      return <Image alt='bronze-rank' width={size} height={size} src='/ranks/bronze.png' className='w-full'/>
    }
    else{
      return <Image alt='ferro-rank' width={size} height={size} src='/ranks/iron.png' className='w-full'/>
    }
  }
