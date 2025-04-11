import { motion } from 'framer-motion';
import { TrophyIcon } from '@/components/ui/Icons';

interface MatchEmptyProps {
  enhanced?: boolean;
}

export default function MatchEmpty({ enhanced }: MatchEmptyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-64 text-center p-6"
    >
      <div className="p-4 bg-slate-800/50 rounded-full border border-dashed border-slate-700 mb-4">
        <TrophyIcon className="text-slate-500 size-8" />
      </div>
      <h3 className="text-xl font-medium text-slate-300 mb-2">Nenhuma partida encontrada</h3>
      <p className="text-slate-500 max-w-md">
        {enhanced 
          ? "Este jogador ainda não participou de nenhuma partida registrada."
          : "Nenhuma partida foi registrada ainda."}
      </p>
    </motion.div>
  );
}