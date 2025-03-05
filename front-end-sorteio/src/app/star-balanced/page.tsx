"use client"
import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { BalancedTypes } from '@/types/sortedTypes';
// app/page.tsx
export default function StarBalanced() {

  return (
    <RandomChoiceScreen title={'Sorteio Balanceado por Estrelas de Times'} type={BalancedTypes.stars} />
  );
}