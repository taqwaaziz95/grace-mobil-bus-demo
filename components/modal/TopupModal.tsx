import React, { useEffect, useState } from "react";
import "./BookingModal.css";
import { useRouter } from "next/navigation";
import moment from "moment";

interface TopupModalProps {
	car: any;
	onClose: () => void;
	handleBooking: () => void;
}

const TopupModal: React.FC<TopupModalProps> = ({ onClose }) => {
	return (
		<div className="modal">
			<div className="modal-content">
				<label>Topup Wallet</label>

				<button className="btn btn-gray tw:!mt-4" onClick={null}>
					Rp50.000
				</button>

				<button className="btn btn-gray tw:!mt-4" onClick={null}>
					Rp100.000
				</button>

				<button className="btn btn-gray tw:!mt-4" onClick={null}>
					Rp150.000
				</button>

				<button className="btn btn-gray tw:!mt-4" onClick={null}>
					Rp200.000
				</button>

				<button className="btn btn-gray tw:!mt-4" onClick={null}>
					Rp300.000
				</button>

				<div className="tw:!flex tw:!justify-between tw:!items-center tw:!mt-6">
					<button
						onClick={onClose}
						className="tw:!bg-black tw:!text-white tw:!font-semibold tw:!py-2 tw:!px-5 tw:!rounded-lg tw:!hover:bg-gray-800 tw:!transition"
					>
						Tutup
					</button>
					<button
						onClick={null}
						className="tw:!bg-black tw:!text-white tw:!font-semibold tw:!py-2 tw:!px-5 tw:!rounded-lg tw:!hover:bg-gray-800 tw:!transition"
					>
						Bayar
					</button>
				</div>
			</div>
		</div>
	);
};

export default TopupModal;
