'use client';

import { supabase } from '@/lib/supabaseClient';
import { Document, Payment } from '@/types/types';
import { useUser } from '@clerk/nextjs';
import { DialogTrigger } from '@radix-ui/react-dialog';
import axios from 'axios';
import { Eye, Loader, UploadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import StatusBadge from './StatusBadge';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';

export default function DocumentUpload({ payment }: { payment: Payment }) {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { user } = useUser();
	const [document, setDocument] = useState<Document | null>();
	const router = useRouter();

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const { data } = await axios.get(`/api/document/${payment.id}`);

				if (data.id) {
					setDocument(data);
				}
			} catch (error: any) {
				toast.error('Something went wrong', {
					description: `${error.message}`,
				});
			}
		};

		fetchDocuments();
	}, [payment.id]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			if (files[0].size > 5 * 1024 * 1024) {
				toast.error('File size must be less than 5MB');
				setFile(null);
				return;
			}
			setFile(files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) {
			toast.error('Please select a file');
			return;
		}

		setLoading(true);

		try {
			const { data, error } = await supabase.storage
				.from('document')
				.upload(`uploads/${file.name}`, file, {
					cacheControl: '3600',
					upsert: false,
				});

			if (error) {
				toast.error('Failed to upload on supabase', {
					description: error.message,
				});
			}

			// update database
			if (data) {
				await axios
					.post('/api/document', {
						user_id: user?.id as string,
						file_url: `https://ealsacdqmlcxmxmfpzcr.supabase.co/storage/v1/object/public/document/${data.path}`,
						payment_id: payment.id,
					})
					.then(() => {
						setOpen(false);
						toast.success('Document uploaded successfully');
						router.refresh();
					})
					.catch((error) => {
						toast.error('Failed to update database for document', {
							description: error.message,
						});
					});
			}
		} catch (error: any) {
			toast.error('Failed to upload', {
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<span>
			{document ? (
				<Dialog>
					<DialogTrigger asChild>
						<Button
							size='sm'
							variant={'outline'}>
							1 Document
							<StatusBadge status={document.status} />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className='text-center'>
								Uploaded Document
							</DialogTitle>
							<DialogDescription className='text-center'>
								<StatusBadge status={document.status} />
							</DialogDescription>

							<div className='mt-4'>
								<p className='text-balance text-sm break-all mb-4'>
									File: {document.file_url}
								</p>
								<a
									href={document.file_url}
									target='_blank'
									rel='noopener noreferrer'>
									<Button>
										<Eye className='size-4' />
										View
									</Button>
								</a>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			) : (
				<Dialog
					open={open}
					onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button size='sm'>
							<UploadIcon className='size-4' /> UploadFile
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle className='text-center'>
								Upload File for verification
							</DialogTitle>
							<DialogDescription className='text-center'>
								*Only pdf/jpg/jpeg/png files are allowed* <br />
								*Max file size is 5MB*
							</DialogDescription>
						</DialogHeader>

						{/*  */}
						<Input
							type='file'
							accept='.pdf,.jpg,.jpeg,.png'
							onChange={handleFileChange}
						/>
						<Button
							onClick={handleUpload}
							disabled={loading}>
							{loading ? (
								<Loader className='size-4 animate-spin' />
							) : (
								<UploadIcon className='size-4' />
							)}
							Upload
						</Button>
					</DialogContent>
				</Dialog>
			)}
		</span>
	);
}
