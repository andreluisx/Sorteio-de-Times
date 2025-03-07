"use client"
import MatchHistory from '@/components/MatchHistory';
import { useMatchsStore } from '@/store/matchs';
import { useEffect, useState } from 'react';

// app/page.tsx
export default function Matchs() {
  const { getAllMatchs, allMatchs } = useMatchsStore();
  const [mounted, isMounted] = useState(false)

  useEffect(()=>{
    getAllMatchs()
    isMounted(true)
  },[getAllMatchs])

  if(mounted === false){
    return null
  }

  return (
    <div className="custom-bg dark:custom-bg p-4 justify-start items-center flex-col flex w-screen h-screen">
      <h1 className="text-2xl font-bold">Partidas</h1>
      <MatchHistory matchs={allMatchs}/>
    </div>
  );
}