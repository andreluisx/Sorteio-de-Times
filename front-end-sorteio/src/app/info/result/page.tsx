// app/payment/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setStatus('error');
      setMessage('ID da sessão não encontrado');
      return;
    }
    
    // Verificar o status da sessão
    const checkSession = async () => {
      try {
        const response = await fetch(`/api/stripe/check-session?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.status === 'complete') {
          setStatus('success');
          // Após um breve intervalo, redirecionar para o dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 5000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Não foi possível confirmar o pagamento');
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setStatus('error');
        setMessage('Ocorreu um erro ao verificar o status do pagamento');
      }
    };
    
    checkSession();
  }, [searchParams, router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === 'loading' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Processando seu pagamento...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Estamos confirmando seu pagamento, aguarde um momento.</p>
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Pagamento realizado com sucesso!</h1>
          <p className="text-gray-600 mb-6">Obrigado pela sua assinatura. Sua conta foi atualizada para premium.</p>
          <p className="text-sm text-gray-500 mb-4">Você será redirecionado para o dashboard em alguns segundos...</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Ir para o dashboard agora
          </Link>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Algo deu errado</h1>
          <p className="text-gray-600 mb-6">{message || 'Não foi possível processar seu pagamento. Por favor, tente novamente.'}</p>
          <Link href="/pricing" className="text-blue-600 hover:underline">
            Voltar para a página de assinaturas
          </Link>
        </div>
      )}
    </div>
  );
}