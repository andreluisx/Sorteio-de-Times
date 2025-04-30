'use server';

import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function fetchClientSecret(priceId: string, userEmail?: string) {
  const origin = (await headers()).get('origin');

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId, // Usar o priceId passado como parâmetro
          quantity: 1,
        },
      ],
      customer_email: userEmail, // Pré-preencher o email se disponível
      mode: 'subscription',
      payment_method_types: ['card'],
      return_url: `${origin}/info/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (e) {
    console.error('Error creating checkout session:', e);
    return Response.json(e, { status: 400 });
  }
}
