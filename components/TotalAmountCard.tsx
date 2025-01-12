import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Payment } from '@/types/types';

export default function TotalAmountCard({ payments }: { payments: Payment[] }) {
	const totalAmount = payments.reduce(
		(acc, payment) => acc + payment.amount,
		0,
	);
	return (
		<Card className='col-span-1'>
			<CardHeader>
				<CardTitle>Total Amount</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-7xl font-semibold'>${totalAmount.toFixed(2)}</p>
				for {payments.length} payments
			</CardContent>
		</Card>
	);
}
