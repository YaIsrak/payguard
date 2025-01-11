import { TableCell, TableRow } from '@/components/ui/table';
import { Payment } from '@/types/types';
import StatusBadge from './StatusBadge';

export default function PaymentItem({ payment }: { payment: Payment }) {
	return (
		<TableRow key={payment.id}>
			<TableCell>10/10/2023</TableCell>
			<TableCell>{payment.title}</TableCell>
			<TableCell>${payment.amount}</TableCell>
			<TableCell>
				<StatusBadge status={payment.status} />
			</TableCell>
			<TableCell>Document</TableCell>
			<TableCell>Actions</TableCell>
		</TableRow>
	);
}
