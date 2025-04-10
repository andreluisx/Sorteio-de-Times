import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { SortedTypes } from '@/types/sortedTypes';
import Head from 'next/head';

export default function StarBalanced() {
  
  return (
    <>
    <Head>
      <title>
        Sorteio Balanceado
      </title>
      <meta 
        name='description'
        content='Sorteio balanceado a partir da taxa de vitórias dos participantes, mas com um pouco de aleatoriedade envolvida para gerar resultados dinâmicos'
        key={'desc'}
      />
    </Head>
    <RandomChoiceScreen title={'Balanceado por Taxa de Vitórias'}  type={SortedTypes.winRate}/>
    </>
  );
}