import RandomChoiceScreen from '@/components/ChoicePlayersScreen';
import { SortedTypes } from '@/types/sortedTypes';
// app/page.tsx
export default function StarBalanced() {

  return (
    <>
      <RandomChoiceScreen title={'Balanceado por Pontos de Rank'} type={SortedTypes.stars} />
    </>
  );
}