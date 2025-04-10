import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { SortedTypes } from '@/types/sortedTypes';
import Head from 'next/head';
// app/page.tsx
export default function StarBalanced() {

  return (
    <>
      <Head>
        <title>
          Sorteio Balanceado
        </title>
        <meta 
          name='description'
          content='Sorteio balanceado a partir das estrelas que voce define para os usários, mas com um pouco de aleatoriedade envolvida para gerar resultados dinâmicos'
          key={'desc'}
        />
      </Head>
      <RandomChoiceScreen title={'Balanceado por Estrelas'} type={SortedTypes.stars} />
    </>
  );
}