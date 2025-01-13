'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

export default function DownloadRecipt() {
	const handleDownload = () => {
		const doc = new jsPDF();
		const contentElement = document.getElementById('receipt');

		if (!contentElement) return;

		html2canvas(contentElement).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
			doc.save(`receipt.pdf`);
		});
	};

	return (
		<Button
			size='sm'
			onClick={handleDownload}>
			Download Receipt
			<Download className='ml-2 h-4 w-4' />
		</Button>
	);
}
