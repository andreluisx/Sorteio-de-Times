"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, UserPlus } from "lucide-react";
import Link from 'next/link';
import { useUsersStore } from '@/store/user';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { register } = useUsersStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    
    register(email, password, router)
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password || e.target.value === "");
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br to-black p-4">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none h-screen">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-red-600/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-red-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md rounded-3xl shadow-2xl px-8 py-3 bg-gradient-to-b from-black/80 to-red-950/80 backdrop-blur-sm border border-red-800/50 relative z-10">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
          <UserPlus className="text-white h-8 w-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mt-8 mb-2">
          Criar Conta
        </h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Preencha os dados abaixo para se cadastrar
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-red-500" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full pl-10 pr-4 py-3 bg-black/50 border border-red-900/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-red-500" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full pl-10 pr-10 py-3 bg-black/50 border border-red-900/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Crie uma senha forte"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-red-500" />
                ) : (
                  <Eye className="h-5 w-5 text-red-500" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Use no mínimo 8 caracteres com letras e números
            </p>
          </div>

          <div className="relative">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-red-500" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-1 block w-full pl-10 pr-10 py-3 bg-black/50 border ${
                  !passwordMatch ? "border-red-500" : "border-red-900/50"
                } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                placeholder="Repita sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-red-500" />
                ) : (
                  <Eye className="h-5 w-5 text-red-500" />
                )}
              </button>
            </div>
            {!passwordMatch && (
              <p className="text-xs text-red-500 mt-1">
                As senhas não coincidem
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-lg"
            >
              Criar Conta
            </button>
          </div>
        </form>

        <div className="mt-5 pt-2 border-t border-red-900/30 text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-1">
            Já tem uma conta?{" "}
            <Link
              href={'/auth/login'}
              className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center transition-colors ml-1"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}