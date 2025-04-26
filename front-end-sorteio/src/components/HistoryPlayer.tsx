import { usePlayersStore } from '@/store/players';
import MatchHistory from './MatchHistory';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

export default function HistoryPlayer(){
  const { fetchHistoryPlayer, playerMatchs, matchLoading } = usePlayersStore();
  const [loadingMore, setLoadingMore] = useState(false);
  const { id } = useParams();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchHistoryPlayer(String(id) ,1, 10);
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || playerMatchs.page >= playerMatchs.totalPages) return;
    
    setLoadingMore(true);
    await fetchHistoryPlayer(String(id), playerMatchs.page + 1, playerMatchs.limit);
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
  }, [playerMatchs.page, playerMatchs.totalPages, loadingMore]);

  const renderFooter = () => (
    <>
      {playerMatchs.page < playerMatchs.totalPages && (
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
    <div className='p-4 h-full custom-scrollbar'>
    <MatchHistory
      matches={playerMatchs.data || []}
      isLoading={loadingMore && playerMatchs.page === 1}
      renderFooter={renderFooter}
    />
    </div>
  )
}