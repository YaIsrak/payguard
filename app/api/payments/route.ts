import { connectDB } from '@/lib/db';
import { Payment } from '@/lib/models/payment.model';
import { replaceMongoIdInArray } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { title, amount, user_id } = await req.json();

	// Validation
	if (!title || !amount || !user_id) {
		return NextResponse.json(
			{ message: 'All fields are required' },
			{ status: 400 },
		);
	}

	try {
		await connectDB();

		const newPayment = await Payment.create({
			title,
			amount,
			user_id,
		});

		return NextResponse.json(newPayment);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}

export async function GET(req: Request) {
	const url = new URL(req.url);
	const user_id = url.searchParams.get('user_id');

	try {
		await connectDB();

		if (user_id) {
			const payments = await Payment.find({ user_id });
			return NextResponse.json(replaceMongoIdInArray(payments));
		} else {
			const payments = await Payment.find();
			return NextResponse.json(replaceMongoIdInArray(payments));
		}
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}
