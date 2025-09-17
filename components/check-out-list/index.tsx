import React from "react";

export interface Booking {
	bookingCode: string;
	busName: string;
	busPlate: string;
	from: string;
	to: string;
	dateTime: string;
	price: number;
}

interface CheckOutListProps {
	bookings: Booking[];
	selected: number[];
	onSelect: (idx: number) => void;
	total: number;
	onCheckout: () => void;
	disabled?: boolean;
}

const CheckOutList: React.FC<CheckOutListProps> = ({
	bookings,
	selected,
	onSelect,
	total,
	onCheckout,
	disabled = false,
}) => (
	<div className="tw:!max-w-2xl tw:!mx-auto tw:!p-6 tw:!bg-white tw:!rounded-xl tw:!shadow-lg checkout-list-container">
		<h2 className="tw:!text-2xl tw:!font-bold tw:!mb-6 tw:!text-center checkout-title">
			Checkout List
		</h2>
		<div className="tw:!space-y-4 checkout-list">
			{bookings.map((b, idx) => (
				<div
					key={idx}
					className={`tw:!flex tw:!items-center tw:!justify-between tw:!bg-gray-50 tw:!rounded-lg tw:!p-4 tw:!border tw:!transition tw:!duration-200 tw:!ease-in tw:!shadow-sm checkout-card${
						selected.includes(idx)
							? " selected tw:!border-blue-500 tw:!ring-2 tw:!ring-blue-200"
							: " tw:!border-gray-200"
					}`}
				>
					<div className="tw:!flex-1 checkout-card-main">
						<div className="tw:!space-y-1 checkout-card-info">
							<div className="tw:!flex tw:!justify-between checkout-card-row">
								<span className="tw:!font-semibold tw:!text-gray-600 checkout-label">
									Booking Code
								</span>
								<span className="tw:!text-gray-800 checkout-value">
									{b.bookingCode}
								</span>
							</div>
							<div className="tw:!flex tw:!justify-between checkout-card-row">
								<span className="tw:!font-semibold tw:!text-gray-600 checkout-label">
									Bus
								</span>
								<span className="tw:!text-gray-800 checkout-value">
									{b.busName} ({b.busPlate})
								</span>
							</div>
							<div className="tw:!flex tw:!justify-between checkout-card-row">
								<span className="tw:!font-semibold tw:!text-gray-600 checkout-label">
									Route
								</span>
								<span className="tw:!text-gray-800 checkout-value">
									{b.from} → {b.to}
								</span>
							</div>
							<div className="tw:!flex tw:!justify-between checkout-card-row">
								<span className="tw:!font-semibold tw:!text-gray-600 checkout-label">
									Date & Time
								</span>
								<span className="tw:!text-gray-800 checkout-value">
									{b.dateTime}
								</span>
							</div>
							<div className="tw:!flex tw:!justify-between checkout-card-row">
								<span className="tw:!font-semibold tw:!text-gray-600 checkout-label">
									Price
								</span>
								<span className="tw:!text-blue-600 tw:!font-bold checkout-value price">
									Rp{b.price.toLocaleString()}
								</span>
							</div>
						</div>
					</div>
					<div className="tw:!ml-4 checkout-card-select">
						<input
							type="checkbox"
							checked={selected.includes(idx)}
							onChange={() => onSelect(idx)}
							className="tw:!w-5 tw:!h-5 tw:!accent-blue-500"
							disabled={disabled}
						/>
					</div>
				</div>
			))}
		</div>
		<div className="tw:!mt-8 tw:!flex tw:!items-center tw:!justify-between checkout-summary">
			<div className="tw:!text-lg tw:!font-semibold checkout-total-row">
				<span className="tw:!text-gray-700 checkout-total-label">
					Grand Total
				</span>
				<span className="tw:!text-blue-600 tw:!ml-2 checkout-total-value">
					Rp{total.toLocaleString()}
				</span>
			</div>
			<button
				className="tw:!bg-blue-600 tw:!text-white tw:!px-6 tw:!py-2 tw:!rounded-lg tw:!font-bold tw:!shadow tw:!hover:bg-blue-700 tw:!transition checkout-btn"
				disabled={disabled || selected.length === 0}
				onClick={onCheckout}
			>
				Checkout
			</button>
		</div>
	</div>
);

export default CheckOutList;
