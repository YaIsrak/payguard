import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getPaymentById } from '@/lib/query';
import { Payment } from '@/types/types';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { payment_id } = await searchParams;

	const paymentData: Payment = await getPaymentById(payment_id as string);

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<Card className='bg-white shadow-xl'>
					<CardHeader className='text-center'>
						<div className='mx-auto mb-4'>
							<CheckCircle className='w-16 h-16 text-green-500' />
						</div>
						<CardTitle className='text-2xl font-bold text-gray-800'>
							Payment Successful!
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='text-center'>
							<p className='text-gray-600'>
								Thank you for your purchase
							</p>
							<h2 className='text-xl font-semibold text-gray-800 mt-2'>
								{paymentData.title}
							</h2>
						</div>
						<div className='bg-gray-50 p-4 rounded-lg'>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-gray-600'>Amount Paid:</span>
								<span className='text-lg font-bold text-gray-800'>
									${paymentData.amount.toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-gray-600'>Order ID:</span>
								<span className='text-gray-800'>{paymentData.id}</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='text-gray-600'>Date:</span>
								<span className='text-gray-800'>
									{new Date(
										paymentData.created_at,
									).toLocaleDateString()}
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex justify-center'>
						<Button asChild>
							<Link href='/'>
								Back to Home
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
