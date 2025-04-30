import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
  priceId: string;
  disabled: boolean;
  className: string;
  placeHolder: string;
  email: string;
}

export default function CheckoutButton({ priceId, disabled, className, placeHolder, email  }: CheckoutButtonProps) {
  const handleClick = async () => {
    const stripe = await stripePromise;
    console.log('\n\nbotao priceid que chegu: ', priceId)
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, email }),
    });

    const { sessionId } = await response.json();
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  return <button className={className} disabled={disabled} onClick={handleClick}>{placeHolder}</button>;
}
