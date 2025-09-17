import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRGeneratorProps {
	value: string;
	size?: number;
	onScan?: () => void;
}

// This component renders a QR code and simulates a scan event
export const QRGenerator: React.FC<QRGeneratorProps> = ({
	value,
	size = 180,
	onScan,
}) => {
	const handleSimulateScan = () => {
		if (onScan) {
			onScan();
		} else {
			alert("Ticket has been submitted, you may proceed");
		}
	};

	return (
		<div className="tw:!flex tw:!flex-col tw:!items-center tw:!gap-2 tw:!my-4">
			<QRCodeSVG value={value} size={size} />
			{/* <button
				className="tw:!mt-2 tw:!px-4 tw:!py-2 tw:!rounded tw:!bg-blue-600 tw:!text-white tw:!font-semibold tw:!shadow tw:!hover:bg-blue-700 tw:!transition"
				onClick={handleSimulateScan}
			>
				Simulate Scan
			</button> */}
		</div>
	);
};
