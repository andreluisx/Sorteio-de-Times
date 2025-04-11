interface ButtonProps {
  number?: number;
  placeHolder: string;
  onClick?: ()=>void;
  disabled?: boolean;
}


export default function GreenButton({number, placeHolder, onClick, disabled}: ButtonProps){
  if (number){
    return <button onClick={onClick}  disabled={(number % 2 !== 0 || number === 0 || disabled)} className=' cursor-pointer shadow shadow-black disabled:bg-slate-500 w-full py-3 text-white bg-green-700 rounded-md'>{placeHolder}</button>
  }
  return <button onClick={onClick} disabled={disabled} className=' cursor-pointer shadow px-2 shadow-black disabled:bg-slate-500 w-full py-3 text-white bg-green-700 rounded-md'>{placeHolder}</button>

}