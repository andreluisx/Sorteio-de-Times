"use react"
import React, { useState } from "react";
import { User, Mail, AlertTriangle, LogOut } from "lucide-react";
import Image from "next/image";
import { AccountTabProps } from "@/types/account";
import { signOut } from 'next-auth/react';

export default function ProfileTab({ userData }: AccountTabProps) {
  

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogout = () => {
    setIsLoading(true)
    signOut({callbackUrl: '/auth/login'})
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center">
        <User className="h-5 w-5 mr-2 text-red-500" />
        Meus Dados
      </h2>
      
      <div className="flex items-center">
        <div className="relative w-20 h-20 rounded-full border-2 border-red-500 overflow-hidden">
          <Image 
            src={userData.avatar} 
            alt="Avatar do usuário"
            width={100}
            height={100}
            className="object-cover h-full"
          />
        </div>
        <div className="ml-6">
          <p className="text-slate-400">{userData.email}</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <div className="flex">
              <input 
                type="email" 
                value={userData.email}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-l-lg px-4 py-2 text-white"
                disabled
              />
              <button className="bg-slate-700 hover:bg-slate-600 px-4 rounded-r-lg border border-l-0 border-slate-700 flex items-center">
                <Mail className="h-4 w-4" />
              </button>
            </div>
            {!userData.emailVerified && (
              <p className="text-xs text-yellow-500 mt-1 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Email não verificado
              </p>
            )}
          </div>
        </div>

        <button className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
          Salvar Alterações
        </button>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left hover:bg-slate-700/50 transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sair da Conta
              {isLoading && (
                <svg className="animate-spin ml-auto h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
         
        </div>
    </div>
  );
}