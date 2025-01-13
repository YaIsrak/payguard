import Navbar from '@/components/layout/Navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await currentUser();

	if (!user) {
		redirect('/sign-in');
	}

	const isAdmin = user.publicMetadata.role === 'admin';

	if (!isAdmin) {
		redirect('/');
		toast.error('You do not have permission to access this page');
	}

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
