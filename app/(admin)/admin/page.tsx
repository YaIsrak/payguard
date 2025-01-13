import AdminPaymentsList from '@/components/Admin/AdminPaymentList';
import ChartCard from '@/components/ChartCard';
import FallbackLoading from '@/components/FallbackLoading';
import SummaryCard from '@/components/SummaryCard';
import TotalAmountCard from '@/components/TotalAmountCard';
import { getAllPayments } from '@/lib/query';
import { Payment } from '@/types/types';
import { Suspense } from 'react';

export default async function AdminPage() {
	const payments: Payment[] = await getAllPayments();

	return (
		<main className='container mx-auto px-2 md:px-4'>
			<div className='py-[15vmin] space-y-4'>
				<div className='p-4 border border-gray-300 rounded-xl'>
					<div>
						<h1 className='text-2xl font-semibold'>Payment Requests</h1>
						<p className='text-muted-foreground text-sm'>
							View and manage all payment requests
						</p>
					</div>

					<Suspense fallback={<FallbackLoading />}>
						<AdminPaymentsList />
					</Suspense>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<TotalAmountCard payments={payments} />
					<SummaryCard payments={payments} />
				</div>

				<div>
					<ChartCard payments={payments} />
				</div>
			</div>
		</main>
	);
}
