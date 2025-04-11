"use client"
import React from "react";
import Image from "next/image";
import { User, Settings, Crown, Trash2, ChevronRight } from "lucide-react";
import { UserData, NavItem } from "@/types/account";

type AccountSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: UserData;
};

export default function AccountSidebar({ activeTab, setActiveTab, userData }: AccountSidebarProps) {
  const navItems: NavItem[] = [
    { id: "meus-dados", icon: <User className="h-4 w-4" />, label: "Meus Dados" },
    { id: "configuracoes", icon: <Settings className="h-4 w-4" />, label: "Configurações" },
    { id: "premium", icon: <Crown className="h-4 w-4" />, label: "Premium" },
    { id: "deletar-conta", icon: <Trash2 className="h-4 w-4" />, label: "Deletar Conta" }
  ];

  return (
    <>
      <div className="flex items-center mb-8">
        <div className="relative w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden mr-3">
          <Image 
            src={userData.avatar} 
            alt="Avatar do usuário"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold">{userData.name}</h2>
          <p className="text-xs text-slate-400">
            {userData.premiumMember ? "Conta Premium" : "Conta Gratuita"}
          </p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === item.id 
                ? "bg-red-600/20 text-red-400 border border-red-500/30" 
                : "hover:bg-slate-700/50"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
            <ChevronRight className="h-4 w-4 ml-auto" />
          </button>
        ))}
      </nav>
    </>
  );
}