import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { SortedTypes } from '@/types/sortedTypes';
import Head from 'next/head';

// app/page.tsx
export default function RandomBalanced() {
  
  return (
    <>
      <RandomChoiceScreen title={'Times Aleatórios'} type={SortedTypes.random}/>
    </>
  );
}