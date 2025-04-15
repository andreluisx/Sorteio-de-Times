import { UserData } from '@/types/account';
import { Crown, Shield, Zap, Star, CreditCard, FileText, ChevronRight, Diamond, Gift } from 'lucide-react';

export default function UserPremium({data}: {data: UserData}) {
  const fakeSubscriptionData = {
    renewalDate: '15/07/2023',
    planName: 'Premium Anual',
    price: 'R$ 199,90/ano',
    status: 'Ativa',
    startedAt: '15/07/2022',
    paymentMethod: 'Cartão final 1234',
    invoiceUrl: '#',
    daysRemaining: 90,
  };
  return (
    <div className="space-y-6">
      {/* Header com gradiente animado */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 p-6 shadow-lg">
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-yellow-300/20 blur-3xl"></div>
        <div className="absolute -left-4 -bottom-4 h-32 w-32 rounded-full bg-amber-500/30 blur-3xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="flex items-center text-3xl font-bold text-white">
              <Crown className="mr-3 h-8 w-8 text-yellow-300" />
              Assinatura Premium
            </h2>
            <p className="mt-1 text-yellow-100">Desfrute de recursos exclusivos e experiência premium</p>
          </div>
          <div className="hidden rounded-full bg-yellow-400/20 p-3 md:block">
            <Diamond className="h-10 w-10 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Card principal */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl">
        {/* Efeito de brilho na borda */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-400/20 to-yellow-500/20 p-0.5">
          <div className="h-full w-full rounded-xl bg-slate-900"></div>
        </div>

        <div className="relative p-8">
          {/* Badge de status */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Círculos animados */}
              <div className="absolute inset-0 -m-4 rounded-full bg-yellow-400/10 blur-md"></div>
              <div className="absolute inset-0 -m-2 rounded-full bg-yellow-500/20"></div>
              
              {/* Ícone central */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/30">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Título e subtítulo */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-1">Status Premium Ativado!</h3>
            <div className="flex items-center justify-center text-yellow-400">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="mt-3 text-slate-300">
              Sua assinatura renova automaticamente em <span className="font-semibold text-white">{fakeSubscriptionData.renewalDate}</span>
            </p>
            
            {/* Barra de progresso */}
            <div className="mt-4 mx-auto max-w-md">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>Iniciado: {fakeSubscriptionData.startedAt}</span>
                <span>Renovação: {fakeSubscriptionData.renewalDate}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500" 
                  style={{ width: '75%' }} 
                />
              </div>
              <div className="mt-1 text-right text-xs text-yellow-400">
                {fakeSubscriptionData.daysRemaining} dias restantes
              </div>
            </div>
          </div>

          {/* Benefícios em grid */}
          <div className="mb-10">
            <h4 className="mb-4 text-center text-lg font-semibold text-white">Seus Benefícios Premium</h4>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="group rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 p-5 transition-all hover:from-yellow-950 hover:to-amber-900">
                <div className="mb-3 inline-flex rounded-full bg-yellow-500/10 p-3 text-yellow-500 group-hover:bg-yellow-500/20">
                  <Shield className="h-6 w-6" />
                </div>
                <h5 className="mb-2 font-semibold text-white">Jogadores Ilimitados</h5>
                <p className="text-sm text-slate-300">Cadastre e gerencie quantos jogadores precisar sem restrições.</p>
              </div>
              
              <div className="group rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 p-5 transition-all hover:from-yellow-950 hover:to-amber-900">
                <div className="mb-3 inline-flex rounded-full bg-yellow-500/10 p-3 text-yellow-500 group-hover:bg-yellow-500/20">
                  <Zap className="h-6 w-6" />
                </div>
                <h5 className="mb-2 font-semibold text-white">Estatísticas Avançadas</h5>
                <p className="text-sm text-slate-300">Acesse análises detalhadas e relatórios personalizados de desempenho.</p>
              </div>
              
              <div className="group rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 p-5 transition-all hover:from-yellow-950 hover:to-amber-900">
                <div className="mb-3 inline-flex rounded-full bg-yellow-500/10 p-3 text-yellow-500 group-hover:bg-yellow-500/20">
                  <Gift className="h-6 w-6" />
                </div>
                <h5 className="mb-2 font-semibold text-white">Sem Anúncios</h5>
                <p className="text-sm text-slate-300">Experiência completamente limpa e sem distrações para maior foco.</p>
              </div>
            </div>
          </div>

          {/* Detalhes da assinatura */}
          <div className="mb-8 rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm">
            <h4 className="mb-4 flex items-center text-lg font-semibold text-white">
              <FileText className="mr-2 h-5 w-5 text-yellow-500" />
              Detalhes da Assinatura
            </h4>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Plano</span>
                  <span className="font-medium text-white">{fakeSubscriptionData.planName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Status</span>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">{fakeSubscriptionData.status}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Início</span>
                  <span className="font-medium text-white">{fakeSubscriptionData.startedAt}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Renovação</span>
                  <span className="font-medium text-white">{fakeSubscriptionData.renewalDate}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Valor</span>
                  <span className="font-medium text-white">{fakeSubscriptionData.price}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Pagamento</span>
                  <span className="flex items-center font-medium text-white">
                    <CreditCard className="mr-1 h-4 w-4 text-slate-400" />
                    {fakeSubscriptionData.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-end">
              <a href={fakeSubscriptionData.invoiceUrl} className="flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300">
                Ver fatura mais recente
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button className="rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 px-8 py-3 font-medium text-white shadow-lg shadow-yellow-500/20 transition-all hover:shadow-xl hover:shadow-yellow-500/30">
              Gerenciar Assinatura
            </button>
            <button className="rounded-full bg-slate-700 px-8 py-3 font-medium text-white transition-all hover:bg-slate-600">
              Cancelar Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}