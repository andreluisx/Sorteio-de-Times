import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Cliente frontend
export const getStripe = async () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
  return stripePromise;
};

// Cliente backend
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil', // Use a versão mais recente
});