import Cube from '@/svg/icons/Cube';
import WinRate from '@/svg/icons/WinRate';
import Star from '@/svg/icons/Star';
import Link from 'next/link';
import MouseClick from '@/svg/icons/MouseClick';
import Status from '@/svg/icons/Status';
import Clock from '@/svg/icons/Clock';
import Account from '@/svg/icons/Account';
import { Atom } from 'lucide-react';
import { usePathname } from 'next/navigation';

const mobileLinks = [
  {
    href: '/info/account',
    text: 'Minha Conta',
    icon: <Account />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
  {
    href: '/random-draw',
    text: 'Sorteio Aleatório',
    icon: <Cube />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
  {
    href: '/points-balanced',
    text: 'Balanceado po Pontos',
    icon: <Atom />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
  {
    href: '/star-balanced',
    text: 'Balanceado por Estrelas',
    icon: <Star />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
  {
    href: '/winRate-balanced',
    text: 'Balanceado por WinRate',
    icon: <WinRate />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
  {
    href: '/user-choice',
    text: 'Você Escolhe os Times',
    icon: <MouseClick />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
];

const mobileExtra = [
  {
    href: '/matchs',
    text: 'Histórico de Partidas',
    icon: <Clock />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
  {
    href: '/players-estatistics',
    text: 'Estátisticas dos Jogadores',
    icon: <Status />,
    normalColor: 'text-slate-100',
    activeColor: 'text-red-500',
  },
];

type Props = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
};

export default function MobileMenu({ status }: Props) {
  const pathname = usePathname();

  const isActiveRoute = (route: string) => {
    return pathname.startsWith(route);
  };

  if (status === 'authenticated') {
    return (
      <div className="md:hidden bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <nav className="flex flex-col space-y-2 p-4 border-b border-slate-700">
          {mobileLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="cursor-pointer">
                <div
                  className={`items-center flex p-3 mb-1 gap-3 ${
                    isActiveRoute(link.href ?? '')
                      ? link.activeColor
                      : `${link.normalColor} hover:${link.activeColor}`
                  }`}
                >
                  {link.icon}
                  <p className="whitespace-nowrap">{link.text}</p>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col space-y-2 p-4">
          {mobileExtra.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="cursor-pointer">
                <div
                  className={`items-center flex p-3 mb-1 gap-3 ${
                    isActiveRoute(link.href ?? '')
                      ? link.activeColor
                      : `${link.normalColor} hover:${link.activeColor}`
                  }`}
                >
                  {link.icon}
                  <p className="whitespace-nowrap">{link.text}</p>
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    );
  }
  if (status === 'loading') {
    return null;
  }
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col w-full justify-center items-center text-xl px-2 pb-6 gap-2">
        <Link
          href={'/auth/login'}
          className="px-4 py-2 rounded text-white w-full flex justify-center items-center transition-colors"
        >
          Entrar
        </Link>
        <Link
          href={'/auth/register'}
          className="px-4 py-2 bg-red-600 text-white rounded w-full flex justify-center items-center hover:bg-red-700 transition-colors"
        >
          Registrar
        </Link>
      </div>
    );
  }
}
