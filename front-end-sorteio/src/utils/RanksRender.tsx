import Image from 'next/image';
import challenger from '@/constants/ranks/challenger.png'
import silver from '@/constants/ranks/silver.png'
import grandMaster from '@/constants/ranks/grandMaster.png'
import diamond from '@/constants/ranks/diamond.png'
import emerald from '@/constants/ranks/emerald.png'
import gold from '@/constants/ranks/gold.png'
import iron from '@/constants/ranks/iron.png'

interface RankRenderProps {
  rank: string;
}

export const RankRender = ({rank}: RankRenderProps) => {
    if(rank === 'challenger'){
      return <Image alt='challenger-rank' src={challenger} className='w-full'/>;
    }
    else if(rank === 'grão-mestre'){
      return <Image alt='grandmaster-rank' src={grandMaster} className='w-full'/>
    }
    else if(rank === 'diamante'){
      return <Image alt='diamond-rank' src={diamond} className='w-full'/>
    }
    else if(rank === 'esmeralda'){
      return <Image alt='emerald-rank' src={emerald} className='w-full'/>
    }
    else if(rank === 'gold'){
      return <Image alt='gold-rank' src={gold} className='w-full'/>
    }
    else if(rank === 'prata'){
      return <Image alt='prata-rank' src={silver} className='w-full'/>
    }
    else{
      return <Image alt='ferro-rank' src={iron} className='w-full'/>
    }
  }
