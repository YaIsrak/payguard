import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { WalletCards } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default async function Navbar() {
	const user = await currentUser();

	return (
		<nav className='fixed top-0 left-0 right-0 z-10 p-4 bg-white/40 backdrop-blur-lg border-b border-gray-200'>
			<div className='container mx-auto flex items-center justify-between'>
				{/* Left */}
				<Link
					href='/'
					className='text-2xl font-semibold flex items-center gap-2'>
					<WalletCards />
					PayGuard
				</Link>

				{/* Right */}
				<div className='flex items-center space-x-4'>
					<SignedIn>
						{/* User Button */}
						<UserButton />

						{/* Admin Button */}
						{user?.publicMetadata.role === 'admin' && (
							<Button
								asChild
								variant={'secondary'}>
								<Link href='/admin'>Admin</Link>
							</Button>
						)}

						{/* Logout Button */}
						<Button
							className='rounded-xl'
							asChild
							variant={'destructive'}>
							<SignOutButton>Logout</SignOutButton>
						</Button>
					</SignedIn>

					{/* Sign In Button */}
					<SignedOut>
						<Button
							className='rounded-xl'
							asChild>
							<Link href='/sign-in'>Sign In</Link>
						</Button>
					</SignedOut>
				</div>
			</div>
		</nav>
	);
}
