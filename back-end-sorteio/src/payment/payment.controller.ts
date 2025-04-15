import { Controller, Post, Req, Res, Headers, HttpCode, RawBodyRequest } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('webhook')
export class PaymentController {
  private stripe: Stripe;
  private endpointSecret: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-03-31.basil', // Atualize para a versão mais recente
    });

    this.endpointSecret = this.configService.get<string>('WEBHOOK');
  }

  @Post()
  @HttpCode(200)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string
  ) {
    if (!sig) {
      return res.status(400).send('No Stripe signature header found');
    }

    let event: Stripe.Event;

    try {
      // Usando o rawBody que já foi parseado pelo middleware
      if (!req.rawBody) {
        throw new Error('No raw body available');
      }

      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        this.endpointSecret
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Processamento do evento
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userId = paymentIntent.metadata?.userId;

        if (userId) {
          await this.authService.update(userId, { isPremium: true });
          console.log(`✅ Usuário ${userId} agora é Premium!`);
        } else {
          console.warn(`⚠️ Nenhum userId encontrado no metadata.`);
        }
        break;

      case 'payment_method.attached':
        const paymentMethod = event.data.object as Stripe.PaymentMethod;
        console.log(`🔗 PaymentMethod attached: ${paymentMethod.id}`);
        break;

      default:
        console.log(`🤷‍♀️ Unhandled event type ${event.type}`);
    }

    return res.json({ received: true });
  }
}