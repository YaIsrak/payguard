import { connectDB } from '@/lib/db';
import { Document } from '@/lib/models/document.model';
import { replaceMongoIdInObject } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	if (!params.id) {
		return NextResponse.json(
			{ message: 'Payment ID is required' },
			{ status: 400 },
		);
	}

	try {
		await connectDB();
		const document = await Document.findOne({
			payment_id: params.id,
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
