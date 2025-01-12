import StatusBadge from '@/components/StatusBadge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Payment } from '@/types/types';

export default function SummaryCard({ payments }: { payments: Payment[] }) {
	const pendingPayments: Payment[] = payments.filter(
		(payment) => payment.status === 'pending',
	);
	const approvedPayments: Payment[] = payments.filter(
		(payment) => payment.status === 'approved',
	);
	const rejectedPayments: Payment[] = payments.filter(
		(payment) => payment.status === 'rejected',
	);

	const totalPendingAmount = pendingPayments.reduce(
		(acc, payment) => acc + payment.amount,
		0,
	);
	const totalApprovedAmount = approvedPayments.reduce(
		(acc, payment) => acc + payment.amount,
		0,
	);
	const totalRejectedAmount = rejectedPayments.reduce(
		(acc, payment) => acc + payment.amount,
		0,
	);

	return (
		<Card className='col-span-2'>
			<CardHeader>
				<CardTitle>Summary</CardTitle>
				<CardDescription>Overview of payments</CardDescription>
			</CardHeader>
			<CardContent className=' grid grid-cols-3 gap-2 border-separate'>
				<div className='border-r'>
					<StatusBadge status='pending' />
					{pendingPayments.length > 0 &&
						pendingPayments.map((payment) => (
							<PaymentListForSummary
								key={payment.id}
								payment={payment}
							/>
						))}

					<p className='p-2 border-t-2 font-semibold'>
						Total - ${totalPendingAmount.toFixed(2)}
					</p>
				</div>
				<div className='border-r'>
					<StatusBadge status='approved' />
					{approvedPayments.length &&
						approvedPayments.map((payment) => (
							<PaymentListForSummary
								key={payment.id}
								payment={payment}
							/>
						))}

					<p className='p-2 border-t-2 font-semibold'>
						Total - ${totalApprovedAmount.toFixed(2)}
					</p>
				</div>
				<div>
					<StatusBadge status='rejected' />
					{rejectedPayments.length &&
						rejectedPayments.map((payment) => (
							<PaymentListForSummary
								key={payment.id}
								payment={payment}
							/>
						))}

					<p className='p-2 border-t-2 font-semibold'>
						Total - ${totalRejectedAmount.toFixed(2)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

function PaymentListForSummary({ payment }: { payment: Payment }) {
	return (
		<div className='p-2 bg-transparent hover:bg-black/5 transition-all'>
			<p>{payment.title}</p>
			<p>${payment.amount.toFixed(2)}</p>
		</div>
	);
}
