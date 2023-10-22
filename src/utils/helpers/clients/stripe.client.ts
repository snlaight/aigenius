import { type Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (typeof stripePromise === 'undefined') {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? '');
  }
  return stripePromise;
};

export default getStripe;
