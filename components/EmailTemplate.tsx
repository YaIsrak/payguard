import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Payment, Status } from '@/types/types';

export default function EmailTemplate({
	payment,
	status,
}: {
	payment: Payment;
	status: Status;
}) {
	return (
		<div className='w-full max-w-md'>
			<Card className='bg-white shadow-xl'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold text-gray-800'>
						Your payment has been {status}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='text-center'>
						<p className='text-gray-600'>Thank you for your purchase</p>
						<h2 className='text-xl font-semibold text-gray-800 mt-2'>
							{payment.title}
						</h2>
					</div>
					<div className='bg-gray-50 p-4 rounded-lg'>
						<div className='flex justify-between items-center mb-2'>
							<span className='text-gray-600'>Amount Paid:</span>
							<span className='text-lg font-bold text-gray-800'>
								${payment.amount.toFixed(2)}
							</span>
						</div>
						<div className='flex justify-between items-center mb-2'>
							<span className='text-gray-600'>Order ID:</span>
							<span className='text-gray-800'>{payment.id}</span>
						</div>
						<div className='flex justify-between items-center'>
							<span className='text-gray-600'>Date:</span>
							<span className='text-gray-800'>
								{new Date(payment.created_at).toLocaleDateString()}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
