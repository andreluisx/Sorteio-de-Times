interface TimeConvertProps {
  time: number;
  className?: string;
}

export default function TimeConvert({ time, className }: TimeConvertProps) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  return (
    <span className={`text-slate-300 ${className}`}>
      {formattedHours}h {formattedMinutes}m {formattedSeconds}s
    </span>
  );
}