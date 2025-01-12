import { TableCell, TableRow } from '@/components/ui/table';
import { getDocumentByPaymentId } from '@/lib/query';
import { Document, Payment } from '@/types/types';
import AdminDocumentAction from './AdminDocumentAction';
import DeleteAction from './DeleteAction';
import StatusActionButton from './StatusActionButton';

export default async function AdminPaymentItem({
	payment,
}: {
	payment: Payment;
}) {
	const document: Document = await getDocumentByPaymentId(payment.id);

	return (
		<TableRow key={payment.id}>
			<TableCell>10/10/2023</TableCell>
			<TableCell>{payment.title}</TableCell>
			<TableCell>${payment.amount}</TableCell>
			<TableCell>
				<StatusActionButton payment={payment} />
			</TableCell>
			<TableCell>
				<AdminDocumentAction
					payment={payment}
					document={document}
				/>
			</TableCell>
			<TableCell>
				<DeleteAction payment={payment} />
			</TableCell>
		</TableRow>
	);
}
