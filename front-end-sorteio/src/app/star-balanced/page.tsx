import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { SortedTypes } from '@/types/sortedTypes';
import Head from 'next/head';
// app/page.tsx
export default function StarBalanced() {

  return (
    <>
      <RandomChoiceScreen title={'Balanceado por Estrelas'} type={SortedTypes.stars} />
    </>
  );
}