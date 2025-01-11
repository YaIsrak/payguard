'use client';

import { Input } from '@/components/ui/input';
import { env } from '@/lib/utils';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function CheckoutForm({
	amount,
	setAmount,
}: {
	amount: number;
	setAmount: (amount: number) => void;
}) {
	const stripe = useStripe();
	const elements = useElements();

	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	// handdle payment
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await axios.post('/api/checkout', { amount });

			if (result.data.clientSecret) {
				setClientSecret(result.data.clientSecret);
			}
		} catch (error: any) {
			toast.error('Something went wrong', {
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

	const handlePayment = async () => {
		setLoading(true);
		if (!stripe || !elements || !clientSecret) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			toast.error(submitError.message);
		}

		const result = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${env.BASE_URL}/proccessing?amount=${amount}&title=${title}`,
			},
		});
		if (result.error) {
			toast.error(result.error.message);
		}

		setLoading(false);
	};

	return (
		<>
			{clientSecret ? (
				<>
					<PaymentElement />
					<Button
						disabled={false}
						className='mt-4'
						onClick={handlePayment}>
						Pay now
					</Button>
				</>
			) : (
				<form
					onSubmit={onSubmit}
					className='space-y-4'>
					<Input
						placeholder='Enter payment title'
						name='title'
						defaultValue={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						type='number'
						placeholder='Amount'
						name='amount'
						defaultValue={amount}
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
					<Button
						type='submit'
						disabled={loading}>
						{loading && <Loader className='mr-2 size-4 animate-spin' />}
						Proceed
					</Button>
				</form>
			)}
		</>
	);
}
