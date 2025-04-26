'use client'
import { useEffect, useRef, useState } from 'react';
import MatchHistory from '@/components/MatchHistory';
import { useMatchsStore } from '@/store/matchs';

export default function Matchs() {
  const { allMatchs, getAllMatchs, isLoading } = useMatchsStore();
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getAllMatchs(1, 10);
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || allMatchs.page >= allMatchs.totalPages) return;
    
    setLoadingMore(true);
    await getAllMatchs(allMatchs.page + 1, allMatchs.limit);
    setLoadingMore(false);
  };

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && handleLoadMore(),
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [allMatchs.page, allMatchs.totalPages, loadingMore]);

  const renderFooter = () => (
    <>
      {allMatchs.page < allMatchs.totalPages && (
        <div ref={observerRef} className="w-full h-10">
          {loadingMore && (
            <div className="text-center text-slate-400 py-4 animate-pulse text-sm">
              Carregando mais partidas...
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="custom-bg dark:custom-bg p-4 justify-start items-center flex-col flex w-screen h-screen">
      <h1 className="text-2xl font-bold mb-4">{allMatchs.total} Partidas</h1>
      <MatchHistory
        matches={allMatchs.data || [] }
        isLoading={isLoading && allMatchs.page === 1}
        renderFooter={renderFooter}
      />
    </div>
  );
}