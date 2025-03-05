import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { BalancedTypes } from '@/types/sortedTypes';

// app/page.tsx
export default function StarBalanced() {
  
  return (
    <RandomChoiceScreen title={'Sorteio Balanceado por Taxa de Vitórias de Times'}  type={BalancedTypes.winRate}/>
  );
}