interface TimeConvertProps {
  time: number
}

export default function TimeConvert ({time} : TimeConvertProps) {
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
      <div className='h-fit flex rounded-2xl px-3 py-1 bg-blue-950'>
        <p>Em andamento</p>
      </div>
    )
  }
  
  return (
  <div className='h-fit flex rounded-2xl px-3 py-1 bg-red-900'>
    <p>{formatTime(time)}</p>
  </div>
)
}