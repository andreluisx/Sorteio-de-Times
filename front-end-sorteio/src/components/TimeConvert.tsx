interface TimeConvertProps {
  time: number,
  style?:string;
}

export default function TimeConvert ({time, style} : TimeConvertProps) {
  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
    ].join(":");
}
  if(!time){
    return (
      <div className='h-fit w-fit flex rounded-2xl px-3 py-1'>
        <p>Em andamento</p>
      </div>
    )
  }
  
  return (
  <div className={`${style ? style : 'h-fit w-fit flex rounded-2xl px-3 py-1 bg-slate-700' }`}>
    <p>{formatTime(time)}</p>
  </div>
)
}