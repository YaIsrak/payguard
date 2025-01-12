'use client';

import { Document, Payment } from '@/types/types';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { getDocumentByPaymentId } from '@/lib/query';
import { Status } from '@/types/types';
import axios from 'axios';
import { Check, Edit2Icon, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import StatusBadge from '../StatusBadge';

export default function AdminDocumentAction({ payment }: { payment: Payment }) {
	const [document, setDocument] = useState<Document>();
	const [isEdit, setIsEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<Status>(document?.status || 'pending');
	const router = useRouter();

	useEffect(() => {
		const fetchDocument = async () => {
			try {
				const data = await getDocumentByPaymentId(payment.id);
				setDocument(data);
			} catch (error: any) {
				toast.error('Something went wrong while fetching document', {
					description: error.message,
				});
			}
		};
		fetchDocument();
	}, [payment.id]);

	const onStatusChange = async () => {
		setLoading(true);

		try {
			await axios.put(`/api/document/${payment.id}`, { status });

			toast.success('Status changed successfully');
			router.refresh();
		} catch (error: any) {
			toast.error('Something went wrong', {
				description: error.message,
			});

			setStatus(document?.status || 'pending');
		} finally {
			setLoading(false);
			setIsEdit(false);
		}
	};

	return (
		<>
			{document?.id ? (
				<div className='flex items-center gap-2'>
					<Button
						asChild
						variant='ghost'
						size='icon'>
						<Link
							href={document.file_url}
							target='_blank'>
							<Eye />
						</Link>
					</Button>

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
			) : (
				<div>No document uploaded</div>
			)}
		</>
	);
}
