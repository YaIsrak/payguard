import { Loader } from 'lucide-react';

export default function FallbackLoading() {
	return (
		<div className='w-full h-56 flex items-center justify-center'>
			<Loader className='animate-spin' />
		</div>
	);
}
