import { Roles } from '@/types/globals';
import { auth } from '@clerk/nextjs/server';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const checkRole = async (role: Roles) => {
	const { sessionClaims } = await auth();
	return sessionClaims?.metadata.role === role;
};
