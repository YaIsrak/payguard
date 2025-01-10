import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
	variable: '--font-inter',
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'PayGuard',
	description: 'Payment Tracking and Verification System',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.variable} font-inter`}>
					{children}
					<Toaster richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}
