'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logo from './Logo';
import AuthLinks from './AuthLinks';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto pl-4 sm:pl-0 pr-4 py-3 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <AuthLinks status={status} />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded text-white cursor-pointer"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isMenuOpen && <MobileMenu status={status}/>}
    </header>
  );
}