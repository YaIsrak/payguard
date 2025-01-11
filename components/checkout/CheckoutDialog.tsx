'use client';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import { convertToSubCurrency } from '@/lib/utils';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function CheckoutDialog() {
	const [amount, setAmount] = useState(10);

	return (
		<div>
			<Elements
				stripe={stripePromise}
				options={{
					mode: 'payment',
					amount: convertToSubCurrency(amount),
					currency: 'usd',
				}}>
				<CheckoutForm
					amount={amount}
					setAmount={setAmount}
				/>
			</Elements>
		</div>
	);
}
