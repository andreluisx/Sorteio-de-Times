"use client"
import React from "react";

type AccountLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  mobileMenu: React.ReactNode;
};

export default function AccountLayout({ children, sidebar, mobileMenu }: AccountLayoutProps) {
  return (
    <div className="flex w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container w-full flex">
        {/* Sidebar (desktop) */}
        <div className="w-1/5 bg-slate-800/50 border-r border-slate-700 p-6 hidden md:block">
          {sidebar}
        </div>
        
        {/* Conteúdo Principal */}
        <div className="flex-1 justify-center items-center p-6 md:p-8 overflow-auto w-full">
          {/* Menu Mobile */}
          <div className="md:hidden mb-6">
            {mobileMenu}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}