import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	file_url: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending',
	},
	uploaded_at: {
		type: Date,
		default: Date.now,
	},
});

export const Document =
	mongoose.models.Document || mongoose.model('Document', documentSchema);
