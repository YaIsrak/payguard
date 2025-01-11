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

export const env = {
	MONGO_URI: process.env.MONGO_URI as string,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY as string,
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env
		.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string,
};

interface MongoDBObject {
	_id: string;
	[key: string]: any;
}

interface ReplacedMongoDBObject {
	id: string;
	[key: string]: any;
}

export const replaceMongoIdInArray = (
	array: MongoDBObject[],
): ReplacedMongoDBObject[] => {
	const mappedArray = array.map(
		(item: MongoDBObject): ReplacedMongoDBObject => {
			const plainObject = JSON.parse(JSON.stringify(item));
			const { _id, ...rest } = plainObject;
			return { id: _id.toString(), ...rest };
		},
	);

	return mappedArray;
};

export const replaceMongoIdInObject = (obj: any) => {
	const plainObject = JSON.parse(JSON.stringify(obj));
	const { _id, ...updatedObj } = plainObject;
	return { id: _id.toString(), ...updatedObj };
};
