'use client';

import { Payment } from '@/types/types';
import axios from 'axios';
import { Loader, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function DeleteAction({ payment }: { payment: Payment }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setLoading(true);
		try {
			await axios.delete(`/api/payments/${payment.id}`);
			toast.success('Payment deleted successfully');
			router.refresh();
		} catch (error: any) {
			toast.error('Something went wrong', {
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant='destructive'
			size='icon'
			disabled={loading}
			onClick={handleDelete}>
			{loading ? (
				<Loader className='size-4 animate-spin' />
			) : (
				<Trash2 className='size-4' />
			)}
		</Button>
	);
}
