import MatchHistory from '@/components/MatchHistory';

// app/page.tsx
export default function Matchs() {
  return (
    <div className="custom-bg dark:custom-bg p-4 justify-start items-center flex-col flex w-screen h-screen">
      <h1 className="text-2xl font-bold">Partidas</h1>
      <MatchHistory />
    </div>
  );
}