'use server';

import EmailTemplate from '@/components/EmailTemplate';
import { Payment, Status } from '@/types/types';
import { clerkClient } from '@clerk/nextjs/server';
import { Resend } from 'resend';

export async function sendEmail(
	user_id: string,
	payment: Payment,
	status: Status,
) {
	try {
		const client = await clerkClient();
		const user = await client.users.getUser(user_id);

		const resend = new Resend(process.env.RESEND_API_KEY);

		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: user.emailAddresses[0].emailAddress,
			subject: `Your payment has been ${status} for ${payment.title}`,
			react: EmailTemplate({ payment, status }),
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
}
