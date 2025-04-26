'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import { fetchClientSecret } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

interface CheckoutProps {
  priceId: string;
  userEmail?: string;
}

export default function Checkout({ priceId, userEmail }: CheckoutProps) {
  const [isReady, setIsReady] = useState(false);

  // Garantir que o componente só renderiza no cliente
  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div className="animate-pulse w-full h-96 bg-slate-800 rounded-lg"></div>;
  }

  // Currying para passar o priceId para a função fetchClientSecret
  const getClientSecret = () => fetchClientSecret(priceId, userEmail);

  return (
    <div id="checkout" className='w-full flex justify-center items-center min-h-screen'>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: getClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}