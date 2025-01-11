import CheckoutDialog from '@/components/checkout/CheckoutDialog';
import FallbackLoading from '@/components/FallbackLoading';
import PaymentsList from '@/components/PaymentsList';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';

export default async function HomePage() {
	return (
		<main className='container mx-auto px-2 md:px-4'>
			<div className='py-[15vmin]'>
				{/* Header */}
				<div className='flex items-center justify-between mb-4'>
					<Dialog>
						<DialogTrigger asChild>
							<Button className='rounded-xl'>
								<Plus /> New Payment
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle>Enter new payment request</DialogTitle>
							<CheckoutDialog />
						</DialogContent>
					</Dialog>
				</div>

				{/* Main */}
				<div className='p-4 border border-gray-300 rounded-xl'>
					<div>
						<h1 className='text-2xl font-semibold'>Payment Requests</h1>
						<p className='text-muted-foreground text-sm'>
							View and manage all payment requests
						</p>
					</div>

					<Suspense fallback={<FallbackLoading />}>
						<PaymentsList />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
