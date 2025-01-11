export type Status = 'pending' | 'approved' | 'rejected';

export interface Payment {
	id: string;
	title: string;
	amount: number;
	status: Status;
	user_id: string;
	created_at: Date;
}
