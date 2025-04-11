import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';

export default function MatchLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <CircularProgress size={40} thickness={4} className="text-red-500" />
      </motion.div>
    </div>
  );
}