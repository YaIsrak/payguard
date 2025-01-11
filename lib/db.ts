import mongoose from 'mongoose';
import { env } from './utils';

export async function connectDB() {
	try {
		if (mongoose.connection.readyState === 1) {
			// eslint-disable-next-line no-console
			console.log('Database already connected. ✅');
			return mongoose.connection;
		}
		await mongoose.connect(env.MONGO_URI, {
			serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
			socketTimeoutMS: 45000,
		});

		// eslint-disable-next-line no-console
		console.log('Database connected successfully.');
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('There is an error in mongodb 🔴🔴', error);
		throw error;
	}
}
