export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { payment_id } = await searchParams;

	return (
		<div>
			SuccessPage
			{payment_id}
		</div>
	);
}
