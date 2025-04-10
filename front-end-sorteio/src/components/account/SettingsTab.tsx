"use react"
import React from "react";
import { Settings, Bell, Shield, ChevronRight } from "lucide-react";
import { AccountTabProps } from "@/types/account";

export default function SettingsTab({ userData, setUserData }: AccountTabProps) {
  const toggleNotification = () => {
    if (setUserData) {
      setUserData(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
    }
  };

  const toggleTwoFactorAuth = () => {
    if (setUserData) {
      setUserData(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center">
        <Settings className="h-5 w-5 mr-2 text-red-500" />
        Configurações
      </h2>
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-500" />
            Notificações
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Receber notificações por email</p>
              <p className="text-sm text-slate-400">Alertas sobre novas funcionalidades e atualizações</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={userData.notificationsEnabled}
                onChange={toggleNotification}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-500" />
            Segurança
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Autenticação de dois fatores</p>
              <p className="text-sm text-slate-400">Aumente a segurança da sua conta</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={userData.twoFactorAuth}
                onChange={toggleTwoFactorAuth}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
          
          <button className="flex items-center text-red-400 hover:text-red-300 mt-2">
            Alterar senha
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}