import { UserData } from '@/types/account';
import { CheckCircle, Crown } from 'lucide-react';

interface IPlans {
  name: string;
  price: string;
  features: string[];
  link: string;
  current?: boolean;
  recommended?: boolean;
}

interface Props {
  plans: IPlans[];
  data: UserData;
}

export default function NotPremium({ plans, data }: Props) {

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold flex items-center pb-5">
        <Crown className="h-5 w-5 mr-2 text-yellow-500" />
        Assinatura Premium
      </h2>
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-xl font-bold mb-6">Atualize para Premium</h3>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border ${
                plan.recommended
                  ? 'border-red-500 bg-slate-800'
                  : 'border-slate-700 bg-slate-800/50'
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
              <a
                href={plan.link + '?prefilled_email=' + data.email}
                className={`flex justify-center items-center cursor-pointer w-full py-2 rounded-lg font-medium ${
                  plan.recommended
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                {plan.current ? 'Seu Plano' : 'Assinar'}
              </a>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
