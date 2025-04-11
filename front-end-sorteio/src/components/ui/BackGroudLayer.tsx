'use client';
import Image, { StaticImageData } from 'next/image';

interface BackGroudLayer {
  image: StaticImageData;
  opacity?: number;
}

export default function BackgroundLayer({ image, opacity = 0.7 }: BackGroudLayer) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Background"
          fill
          className="object-cover"
          style={{ opacity }}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/90 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_70%)]" />
    </div>
  );
}