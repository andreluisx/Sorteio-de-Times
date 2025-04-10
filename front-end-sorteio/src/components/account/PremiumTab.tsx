import React from "react";
import { Crown, CheckCircle } from "lucide-react";
import { AccountTabProps } from "@/types/account";

const PremiumTab: React.FC<AccountTabProps> = ({ userData }) => {
  const plans = [
    {
      name: "Básico",
      price: "Grátis",
      features: ["Até 10 jogadores", "Estatísticas básicas", "Anúncios"],
      current: true
    },
    {
      name: "Premium",
      price: "R$ 19,90/mês",
      features: ["Jogadores ilimitados", "Estatísticas avançadas", "Sem anúncios", "Suporte prioritário"],
      recommended: true
    },
    {
      name: "Anual",
      price: "R$ 179,90/ano",
      features: ["Tudo do Premium", "Economize 25%", "Pagamento único"],
      bestValue: true
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center">
        <Crown className="h-5 w-5 mr-2 text-yellow-500" />
        Assinatura Premium
      </h2>
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        {userData.premiumMember ? (
          <div className="text-center">
            <div className="bg-yellow-500/10 inline-flex p-4 rounded-full mb-4">
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Você é membro Premium!</h3>
            <p className="text-slate-300 mb-6">Sua assinatura renova automaticamente em 15/07/2023</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <h4 className="font-semibold mb-1">Jogadores Ilimitados</h4>
                <p className="text-sm text-slate-400">Cadastre quantos jogadores precisar</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <h4 className="font-semibold mb-1">Estatísticas Avançadas</h4>
                <p className="text-sm text-slate-400">Análises detalhadas de desempenho</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <h4 className="font-semibold mb-1">Sem Anúncios</h4>
                <p className="text-sm text-slate-400">Experiência limpa e sem distrações</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors mr-3">
              Gerenciar Assinatura
            </button>
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
              Cancelar Premium
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6">Atualize para Premium</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border ${
                    plan.recommended 
                      ? "border-red-500 bg-slate-800" 
                      : "border-slate-700 bg-slate-800/50"
                  } relative`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                      RECOMENDADO
                    </div>
                  )}
                  <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
                  <p className="text-2xl font-bold mb-4">{plan.price}</p>
                  <ul className="space-y-2 text-sm text-slate-300 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-2 rounded-lg font-medium ${
                      plan.recommended 
                        ? "bg-red-600 hover:bg-red-700" 
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {plan.current ? "Seu Plano" : "Assinar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumTab;