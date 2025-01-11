import { env } from '@/lib/utils';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
	try {
		const { amount } = await req.json();

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
		});

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error: any) {
		// eslint-disable-next-line no-console
		console.error('Internal Server Error', error);

		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
