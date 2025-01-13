'use client';

import { Payment } from '@/types/types';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from './ui/chart';

export default function ChartCard({ payments }: { payments: Payment[] }) {
	const chartData = payments.map((payment) => ({
		date: new Date(payment.created_at).toISOString().split('T')[0],
		title: payment.title,
		amount: payment.amount,
	}));

	const chartConfig = {
		amount: {
			label: 'Amount',
		},
	} satisfies ChartConfig;

	return (
		<ChartContainer
			config={chartConfig}
			className='w-full'>
			<BarChart data={chartData}>
				<XAxis dataKey='title' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar
					dataKey='amount'
					fill='var(--color-primary)'
					radius={4}
				/>
			</BarChart>
		</ChartContainer>
	);
}
