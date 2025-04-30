import React from 'react';
import { AccountTabProps } from '@/types/account';
import UserPremium from './UserPremium';
import NotPremium from './NotPremium';

export const plans = [
  {
    name: 'Básico',
    price: 'Grátis',
    features: ['Até 10 jogadores', 'Estatísticas básicas', 'Anúncios'],
    current: true,
    link: process.env.NODE_ENV === 'development' ? '' : '',
  },
  {
    name: 'Premium',
    price: 'R$ 19,90/mês',
    features: [
      'Jogadores ilimitados',
      'Estatísticas avançadas',
      'Sem anúncios',
      'Suporte prioritário',
    ],
    recommended: true,
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_6oE3fAfo7d7M6as9AA'
        : '',
    priceID:'price_1RDy8xGhJbEEzm6tUjztZ9LB'
  },
  {
    name: 'Anual',
    price: 'R$ 199,90/ano',
    features: ['Tudo do Premium', 'Economize R$39,80', 'Pagamento único'],
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_dR68zU5Nx7NscyQbIJ'
        : '',
    priceID: process.env.NODE_ENV === 'development' ?  process.env.YEAR_PRICE_ID : process.env.YEAR_PRICE_ID,
    current:false
  },
];

const PremiumTab: React.FC<AccountTabProps> = ({ userData }) => {
  
  return (
    <>
      {userData?.isPremium ? (
        <UserPremium data={userData}/>
      ) : (
        <NotPremium plans={plans} data={userData} />
      )}
    </>
  );
};

export default PremiumTab;
