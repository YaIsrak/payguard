'use client';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getAllPayments } from '@/lib/query';
import { Payment } from '@/types/types';
import { SortAsc, SortDesc } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import AdminPaymentItem from './AdminPaymentItem';

export default function AdminPaymentsList() {
	const [payments, setPayments] = useState<Payment[]>();
	const [sort, setSort] = useState<'asc' | 'desc'>('desc');

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const data = await getAllPayments(sort);
				setPayments(data);
			} catch (error: any) {
				toast.error('Something went wrong while fetching payments', {
					description: error.message,
				});
			}
		};
		fetchPayments();
	}, [sort]);

	const handleSort = () => {
		setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'));
	};

	return (
		<div className='mt-4'>
			<div>
				<Button
					onClick={handleSort}
					variant='outline'
					size='sm'>
					{sort === 'asc'
						? 'Sort by date (newest first)'
						: 'Sort by date (oldest first)'}
					{sort === 'asc' ? <SortAsc /> : <SortDesc />}
				</Button>
			</div>
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

					<div>{payments?.length === 0 && <p>No payments found</p>}</div>
				</TableBody>
			</Table>
		</div>
	);
}
