import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending',
	},
	user_id: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

export const Payment =
	mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
