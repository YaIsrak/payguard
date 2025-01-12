'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { sendEmail } from '@/lib/action';
import { Payment, Status } from '@/types/types';
import axios from 'axios';
import { Check, Edit2Icon, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import StatusBadge from '../StatusBadge';
import { Button } from '../ui/button';

export default function StatusActionButton({ payment }: { payment: Payment }) {
	const [isEdit, setIsEdit] = useState(false);
	const [status, setStatus] = useState<Status>(payment.status);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onStatusChange = async () => {
		setLoading(true);
		try {
			const { data }: { data: Payment } = await axios.put(
				`/api/payments/${payment.id}`,
				{
					status,
				},
			);

			await sendEmail(data.user_id, data, status);

			toast.success('Status changed successfully');
			router.refresh();
		} catch (error: any) {
			toast.error('Something went wrong', {
				description: error.message,
			});
		} finally {
			setLoading(false);
			setIsEdit(false);
		}
	};

	return (
		<div className='flex items-center gap-2'>
			{isEdit ? (
				<>
					<Select
						defaultValue={status}
						onValueChange={(value) => setStatus(value as Status)}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='pending'>Pending</SelectItem>
							<SelectItem value='approved'>Approved</SelectItem>
							<SelectItem value='rejected'>Rejected</SelectItem>
						</SelectContent>
					</Select>
					<Button
						size='icon'
						disabled={loading}
						onClick={onStatusChange}>
						{loading ? (
							<Loader className='animate-spin' />
						) : (
							<Check className='size-4' />
						)}
					</Button>
				</>
			) : (
				<>
					<StatusBadge status={status} />

					<Button
						size='icon'
						className='size-6'
						variant='outline'
						onClick={() => setIsEdit(true)}>
						<Edit2Icon className='size-4' />
					</Button>
				</>
			)}
		</div>
	);
}
