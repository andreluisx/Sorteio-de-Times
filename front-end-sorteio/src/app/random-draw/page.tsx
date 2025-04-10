import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { SortedTypes } from '@/types/sortedTypes';
import Head from 'next/head';

// app/page.tsx
export default function RandomBalanced() {
  
  return (
    <>
    <Head>
      <title>
        Sorteio Balanceado
      </title>
      <meta 
        name='description'
        content='Completamente aleatorio de equipes. cadastre os jogadores muito facilmente e realize o sorteio.'
        key={'desc'}
      />
    </Head>
      <RandomChoiceScreen title={'Times Aleatórios'} type={SortedTypes.random}/>
    </>
  );
}