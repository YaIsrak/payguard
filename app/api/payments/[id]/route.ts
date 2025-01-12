import { connectDB } from '@/lib/db';
import { Payment } from '@/lib/models/payment.model';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params;
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
		const updatedPayment = await Payment.findByIdAndUpdate(
			id,
			{ status },
			{ new: true },
		);

		revalidatePath('/');
		return NextResponse.json(updatedPayment);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params;
	if (!id) {
		return NextResponse.json(
			{ message: 'Payment ID is required' },
			{ status: 400 },
		);
	}

	try {
		await connectDB();
		const deletedPayment = await Payment.findByIdAndDelete(id);

		revalidatePath('/');
		return NextResponse.json(deletedPayment);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 500 },
		);
	}
}
