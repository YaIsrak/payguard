import { TableCell, TableRow } from '@/components/ui/table';
import { convertDate } from '@/lib/utils';
import { Payment } from '@/types/types';
import AdminDocumentAction from './AdminDocumentAction';
import DeleteAction from './DeleteAction';
import StatusActionButton from './StatusActionButton';

export default function AdminPaymentItem({ payment }: { payment: Payment }) {
	return (
		<TableRow key={payment.id}>
			<TableCell>{convertDate(payment.created_at)}</TableCell>
			<TableCell>{payment.title}</TableCell>
			<TableCell>${payment.amount}</TableCell>
			<TableCell>
				<StatusActionButton payment={payment} />
			</TableCell>
			<TableCell>
				<AdminDocumentAction payment={payment} />
			</TableCell>
			<TableCell>
				<DeleteAction payment={payment} />
			</TableCell>
		</TableRow>
	);
}
