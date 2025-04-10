'use client';
import Image, { StaticImageData } from 'next/image';

interface BackGroudLayer {
  image: StaticImageData;
}

export default function BackgroundLayer({image} : BackGroudLayer) {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute left-0 top-0 h-full w-full md:w-2/3 bg-gradient-to-r from-transparent to-slate-900">
        <Image
          src={image}
          alt="Background"
          className="h-full w-full object-cover mix-blend-overlay opacity-70"
          priority
        />
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-slate-900/80 to-slate-900"></div>
    </div>
  );
}