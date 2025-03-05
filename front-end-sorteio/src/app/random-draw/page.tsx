"use client"
import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { BalancedTypes } from '@/types/sortedTypes';

// app/page.tsx
export default function RandomBalanced() {
  
  return (
    <RandomChoiceScreen title={'Sorteio Aléatorio de Times'} type={BalancedTypes.random}/>
  );
}