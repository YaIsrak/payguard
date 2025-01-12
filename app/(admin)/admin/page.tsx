import AdminPaymentsList from '@/components/Admin/AdminPaymentList';
import FallbackLoading from '@/components/FallbackLoading';
import { Suspense } from 'react';

export default async function AdminPage() {
	return (
		<main className='container mx-auto px-2 md:px-4'>
			<div className='py-[15vmin]'>
				{/* Main */}
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
			</div>
		</main>
	);
}
