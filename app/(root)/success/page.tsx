export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { payment_id } = await searchParams;

	console.log(payment_id);

	return <div>SuccessPage</div>;
}
