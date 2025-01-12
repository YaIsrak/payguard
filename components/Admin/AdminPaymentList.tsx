import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getAllPayments } from '@/lib/query';
import { Payment } from '@/types/types';
import AdminPaymentItem from './AdminPaymentItem';

export default async function AdminPaymentsList() {
	const payments: Payment[] = await getAllPayments();

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
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{payments?.map((payment) => (
						<AdminPaymentItem
							key={payment.id}
							payment={payment}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
