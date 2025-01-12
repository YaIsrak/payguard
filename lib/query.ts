import axios from 'axios';
import { env } from './utils';

export async function getAllPayments(sort: 'asc' | 'desc' = 'desc') {
	try {
		const { data } = await axios.get(
			`${env.BASE_URL}/api/payments?sort=${sort}`,
		);
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
}

export async function getPaymentsByUserId(userId: string) {
	try {
		const { data } = await axios.get(
			`${env.BASE_URL}/api/payments?user_id=${userId}`,
		);
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
}

export async function getPaymentById(payment_id: string) {
	try {
		const { data } = await axios.get(
			`${env.BASE_URL}/api/payments/${payment_id}`,
		);
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
}

export async function getDocumentByPaymentId(payment_id: string) {
	try {
		const { data } = await axios.get(
			`${env.BASE_URL}/api/document/${payment_id}`,
		);
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		throw error;
	}
}
