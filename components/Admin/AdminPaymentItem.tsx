'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { Payment } from '@/types/types';
import DeleteAction from './DeleteAction';
import StatusActionButton from './StatusActionButton';

export default function AdminPaymentItem({ payment }: { payment: Payment }) {
	return (
		<TableRow key={payment.id}>
			<TableCell>10/10/2023</TableCell>
			<TableCell>{payment.title}</TableCell>
			<TableCell>${payment.amount}</TableCell>
			<TableCell>
				<StatusActionButton payment={payment} />
			</TableCell>
			<TableCell>Document</TableCell>
			<TableCell>
				<DeleteAction payment={payment} />
			</TableCell>
		</TableRow>
	);
}
