import { connectDB } from '@/lib/db';
import { Document } from '@/lib/models/document.model';
import { replaceMongoIdInObject } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	if (!id) {
		return NextResponse.json(
			{ message: 'Payment ID is required' },
			{ status: 400 },
		);
	}

	try {
		await connectDB();
		const document = await Document.findOne({
			payment_id: id,
		});

		if (!document) {
			return NextResponse.json({});
		}
		return NextResponse.json(replaceMongoIdInObject(document));
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const { status } = await req.json();

	if (status !== 'pending' && status !== 'approved' && status !== 'rejected') {
		return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
	}

	if (!id) {
		return NextResponse.json(
			{ message: 'Payment ID is required' },
			{ status: 400 },
		);
	}

	try {
		await connectDB();
		const document = await Document.findOneAndUpdate(
			{
				payment_id: id,
			},
			{
				status,
			},
		);

		return NextResponse.json(replaceMongoIdInObject(document));
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}
