'use client';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProccessingPage() {
	const { user } = useUser();
	const router = useRouter();
	const searchParams = useSearchParams();

	const amount = searchParams.get('amount');
	const title = searchParams.get('title');

	useEffect(() => {
		const postPayment = async () => {
			try {
				const { data } = await axios.post(`/api/payments`, {
					title,
					amount,
					user_id: user?.id as string,
				});
				toast.success('Payment created successfully');

				router.push(`/success?payment_id=${data._id}`);
			} catch (error: any) {
				toast.error('Something went wrong', {
					description: error.message,
				});
				router.push('/');
			}
		};

		postPayment();
	}, [amount, router, title, user?.id]);

	return <div>ProccessingPage</div>;
}
