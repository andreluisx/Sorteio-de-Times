"use client"
import React from "react";

type AccountMobileMenuProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function AccountMobileMenu({ activeTab, setActiveTab }: AccountMobileMenuProps) {
  return (
    <select
      value={activeTab}
      onChange={(e) => setActiveTab(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3"
    >
      <option value="meus-dados">Meus Dados</option>
      <option value="configuracoes">Configurações</option>
      <option value="premium">Premium</option>
      <option value="deletar-conta">Deletar Conta</option>
    </select>
  );
}