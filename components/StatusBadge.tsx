import { Status } from '@/types/types';
import { BanIcon, CheckCheck, CircleDashed } from 'lucide-react';

export default function StatusBadge({ status }: { status: Status }) {
	const statusColor = {
		pending: 'bg-yellow-200',
		approved: 'bg-green-200',
		rejected: 'bg-red-200',
	}[status];

	const StatusIcon = {
		pending: CircleDashed,
		approved: CheckCheck,
		rejected: BanIcon,
	}[status];

	return (
		<span
			className={`${statusColor} px-2 py-1 text-xs font-semibold rounded-full flex items-center w-fit`}>
			<StatusIcon className='mr-2 size-4' />
			{status.toUpperCase()}
		</span>
	);
}
