'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { stripe } from '@/lib/stripe';

export default function Return() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('Sessão não encontrada.');
      return;
    }

    async function fetchSessionStatus() {
      try {
        const response = await fetch(`/api/stripe/check-session?session_id=${sessionId}`);
        const data = await response.json();

        if (data.status === 'complete') {
          setStatus('success');
          
          // Aqui você poderia chamar uma função para atualizar o estado do usuário
          // por exemplo: updateUserStore({ isPremium: true });
          
        } else {
          setStatus('error');
          setMessage(data.message || 'Falha ao processar o pagamento.');
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setStatus('error');
        setMessage('Ocorreu um erro ao verificar o status do pagamento.');
      }
    }

    fetchSessionStatus();
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Verificando status do pagamento...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-full">
          <XCircle className="h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold mt-6">Algo deu errado</h1>
        <p className="mt-2 text-slate-400">{message}</p>
        <Link href="/info" className="mt-6 bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg">
          Voltar para planos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="bg-green-500/10 text-green-500 p-4 rounded-full">
        <CheckCircle className="h-16 w-16" />
      </div>
      <h1 className="text-2xl font-bold mt-6">Assinatura Confirmada!</h1>
      <p className="mt-2 text-slate-400">
        Parabéns! Sua assinatura premium foi ativada com sucesso.
      </p>
      <p className="mt-1 text-slate-400">
        Você agora tem acesso a todos os recursos premium.
      </p>
      <Link href="/info" className="mt-6 bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg">
        Voltar para sua conta
      </Link>
    </div>
  );
}