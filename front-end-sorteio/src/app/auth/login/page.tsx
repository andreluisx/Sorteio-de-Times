"use client"; // Certifique-se de que o componente é executado no lado do cliente

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import Link from 'next/link';
import { useUsersStore } from '@/store/user';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useUsersStore()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, router)
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br to-black p-4">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-red-600/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-red-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md rounded-3xl shadow-2xl p-8 bg-gradient-to-b from-black/80 to-red-950/80 backdrop-blur-sm border border-red-800/50 relative z-10">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
          <Lock className="text-white h-8 w-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mt-8 mb-2">
          Bem-vindo
        </h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Faça login para acessar sua conta
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
                className="mt-1 block w-full pl-10 pr-4 py-3 focus:bg-black/50 bg-black/50 border border-red-900/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                placeholder="********"
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
            {error ? <p className='px-3 pt-3 text-red-700'>usuário ou senha inválidos</p> : null}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-red-800 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                Lembrar de mim
              </label>
            </div>

            <a
              href="#"
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Esqueceu a senha?
            </a>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r cursor-pointer from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-lg"
            >
              {isLoading ? <div className='flex justify-center items-center'><CircularProgress color="inherit" size={20} /></div> : 'Entrar'}

            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-red-900/30 text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-1">
            Não tem uma conta?{" "}
            <Link
              href={'/auth/register'}
              className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center transition-colors ml-1"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}