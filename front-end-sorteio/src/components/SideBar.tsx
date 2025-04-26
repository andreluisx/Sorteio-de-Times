'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Clock from '@/svg/icons/Clock';
import Cube from '@/svg/icons/Cube';
import Star from '@/svg/icons/Star';
import WinRate from '@/svg/icons/WinRate';
import MouseClick from '@/svg/icons/MouseClick';
import Status from '@/svg/icons/Status';
import Alert from '@/svg/icons/Alert';
import { Atom } from 'lucide-react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActiveRoute = (route: string) => {
    return pathname.startsWith(route);
  };

  const menuItems = [
    {
      href: '/random-draw',
      text: 'Sorteio Aleatório',
      icon: (
        <Cube/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      href: '/points-balanced',
      text: 'Balanceado por Pontos',
      icon: (
        <Atom/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      href: '/star-balanced',
      text: 'Balanceado por Estrelas',
      icon: (
        <Star/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      href: '/winRate-balanced',
      text: 'Balanceado por Taxa de Vitória',
      icon: (
        <WinRate/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      href: '/user-choice',
      text: 'Você Escolhe os Times',
      icon: (
        <MouseClick/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      type: 'divider'
    },
    {
      href: '/matchs',
      text: 'Histórico de Partidas',
      icon: (
        <Clock/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      href: '/players-estatistics',
      text: 'Estatísticas dos Jogadores',
      icon: (
        <Status/>
      ),
      normalColor: 'text-slate-100',
      activeColor: 'text-red-500'
    },
    {
      type: 'divider'
    },
    {
      href: '/info/report',
      text: 'Relatar Problema',
      icon: (
        <Alert/>
      ),
      normalColor: 'text-red-500',
      activeColor: 'text-red-400'
    }
  ];

  return (
    <div
      className={`bg-slate-800 sm:flex sm:flex-col hidden p-5 border-r border-slate-600`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {menuItems.map((item, index) => {
        if (item.type === 'divider') {
          return <div key={`divider-${index}`} className='w-full h-0.5 bg-slate-600 my-3'></div>;
        }

        return (
          <Link key={item.href} href={item.href ?? ''}>
            <div className='cursor-pointer'>
              <div className={`items-center flex p-3 mb-3 gap-3 ${
                isActiveRoute(item.href ?? '') 
                  ? item.activeColor 
                  : `${item.normalColor} hover:${item.activeColor}`
              }`}>
                {item.icon}
                {isOpen && <p className='whitespace-nowrap'>{item.text}</p>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}