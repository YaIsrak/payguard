export type Status = 'pending' | 'approved' | 'rejected';

export interface Payment {
	id: string;
	title: string;
	amount: number;
	status: Status;
	user_id: string;
	created_at: Date;
}

export interface Document {
	id: string;
	user_id: string;
	file_url: string;
	payment_id: string;
	status: Status;
	uploaded_at: Date;
}
