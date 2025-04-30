import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { server } from '@/api/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      webhookSecret
    );
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }
  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    
    const emailFromMetadata = checkoutSession.metadata?.email;
    const email = emailFromMetadata || checkoutSession.customer_email;
  
    console.log('Email usado:', email);
  
    if (email) {
      await server.patch('/auth/me/', { isPremium: true, email });
    } else {
      console.warn('Nenhum e-mail encontrado');
    }
  }
  

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
  });
}

