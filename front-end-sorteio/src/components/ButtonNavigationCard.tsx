import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ButtonNavigationCardProps {
  nextPage: string;
  imageUrl: StaticImageData;
  placeHolder: string;
}

export default function ButtonNavigationCard({nextPage, imageUrl, placeHolder} : ButtonNavigationCardProps) {
  return (
    <Link href={nextPage}>
      <div
        style={{
          backgroundImage: `url(${imageUrl.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="h-36 w-72 border-2 border-red-400 flex items-center rounded-2xl justify-center shadow-2xl shadow-black"
      >
      <div className='bg-black opacity-80 z-40 absolute rounded-2xl h-36 w-72'></div>
        <div className="h-12 items-center justify-center rounded-md flex p-3">
          <p className='text-3xl z-50 text-slate-200 text-center'>{placeHolder}</p>
        </div>
      </div>
    </Link>
  );
}
