import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getPaymentsByUserId } from '@/lib/query';
import { Payment } from '@/types/types';
import { currentUser } from '@clerk/nextjs/server';
import PaymentItem from './PaymentItem';

export default async function PaymentsList() {
	const user = await currentUser();
	const payments: Payment[] = await getPaymentsByUserId(user?.id as string);

	return (
		<div className='mt-4'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Document</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{payments?.map((payment) => (
						<PaymentItem
							key={payment.id}
							payment={payment}
						/>
					))}

					{payments?.length === 0 && <p>No payments found</p>}
				</TableBody>
			</Table>
		</div>
	);
}
