import { connectDB } from '@/lib/db';
import { Document } from '@/lib/models/document.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { user_id, file_url, payment_id } = await req.json();

	if (!user_id || !file_url || !payment_id) {
		return NextResponse.json(
			{ message: 'All fields are required' },
			{ status: 400 },
		);
	}

	try {
		await connectDB();

		const newDocument = await Document.create({
			user_id,
			file_url,
			payment_id,
		});

		return NextResponse.json(newDocument);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}
