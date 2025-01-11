import { loadStripe } from '@stripe/stripe-js';
import { env } from './utils';

export const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
