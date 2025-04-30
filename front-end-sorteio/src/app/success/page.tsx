import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      // Aqui você pode chamar uma API para atualizar o status do usuário
    }
  }, [session_id]);

  return (
    <div>
      <h1>Pagamento realizado com sucesso!</h1>
      <p>Obrigado por sua assinatura.</p>
    </div>
  );
}
