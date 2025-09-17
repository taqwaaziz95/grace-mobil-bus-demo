import React, { useEffect, useState } from "react";
import { CreditCard, Wallet, QrCode, Banknote } from "lucide-react";
import Button from "../button";
import moment from "moment";

/* -------------------------------
 * Payment Method Selector
 * ----------------------------- */
type PaymentMethodSelectorProps = {
	paymentMethod: string;
	setPaymentMethod: (method: string) => void;
	onTopup: () => void;
	walletBalance: number;
};

export const PaymentMethodSelector = ({
	paymentMethod,
	setPaymentMethod,
	onTopup,
	walletBalance,
}: PaymentMethodSelectorProps) => (
	<div className="tw:!w-full tw:!p-6 tw:!bg-white">
		<h5 className="tw:!text-lg tw:!font-semibold tw:!mb-4">Select Payment Method</h5>
		<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-4">
			{[
				{ value: "Debit", label: "Debit Card", icon: CreditCard },
				{
					value: "Wallet Balance",
					label: `Wallet Balance (Rp${walletBalance.toLocaleString("id-ID")})`,
					icon: Wallet,
				},
				{ value: "QR", label: "QR Code", icon: QrCode },
				{ value: "Xendit", label: "Virtual Account", icon: Banknote },
			].map((option) => {
				const Icon = option.icon;
				return (
					<label
						key={option.value}
						className={`tw:!flex tw:!items-center tw:!gap-3 tw:!p-4 tw:!rounded-xl tw:!border tw:!cursor-pointer tw:!transition-all tw:!duration-200 ${paymentMethod === option.value
							? "tw:!border-[#2A9FD6] tw:!bg-[#EAF6FB]"
							: "tw:!border-gray-300 hover:tw:!bg-gray-50"
							}`}
					>
						<input
							type="radio"
							name="paymentMethod"
							value={option.value}
							checked={paymentMethod === option.value}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className="tw:!hidden"
						/>
						<Icon className="tw:!w-6 tw:!h-6 tw:!text-gray-600" />
						<span className="tw:!font-medium">{option.label}</span>
						{option.value === "Wallet Balance" && (
							<button
								type="button"
								onClick={onTopup}
								className="tw:!ml-auto tw:!px-3 tw:!py-1 tw:!text-xs tw:!rounded-full tw:!bg-gray-200 tw:!hover:bg-gray-300"
							>
								Topup
							</button>
						)}
					</label>
				);
			})}
		</div>
	</div>
);

/* -------------------------------
 * Payment Summary
 * ----------------------------- */
type Booking = {
	bookingCode: string;
	busName: string;
	seat: string;
	route: string;
	dateTime: string;
	price: number;
};

export const PaymentSummary = ({ bookings }: { bookings: Booking[] }) => {
	const subtotal = bookings.reduce((sum, b) => sum + b.price, 0);
	const ppn = subtotal * 0.11;
	const transactionFee = subtotal > 0 ? 2500 : 0;
	const totalPrice = subtotal + ppn + transactionFee;

	return (
		<div className="tw:!w-full tw:!p-6 tw:!bg-white">
			<h2 className="tw:!text-xl tw:!font-semibold tw:!mb-4">Purchase Summary</h2>
			<div className="tw:!space-y-3">
				{bookings.map((b, idx) => (
					<div
						key={idx}
						className="tw:!p-4 tw:!bg-gray-50 tw:!rounded-lg tw:!border tw:!border-gray-200"
					>
						{[
							{ label: "Booking Code", value: b.bookingCode },
							{ label: "Route", value: b.route },
							{ label: "Seat", value: b.seat },
							{ label: "Tanggal", value: moment(b.dateTime).format("DD/MM/YYYY") },
							{ label: "Waktu", value: moment(b.dateTime).format("HH:mm") },
						].map((item, index) => (
							<div key={index} className="tw:!flex tw:!justify-between tw:!mb-1">
								<span className="tw:!font-semibold tw:!text-gray-600">{item.label}:</span>
								<span>{item.value}</span>
							</div>
						))}
						<div className="tw:!flex tw:!justify-end tw:!mt-2">
							<span className="tw:!font-bold tw:!text-[#2A9FD6] tw:!text-lg">
								Rp{b.price.toLocaleString("id-ID")}
							</span>
						</div>
					</div>
				))}
			</div>
			<div className="tw:!mt-6 tw:!space-y-2 tw:!text-sm">
				<div className="tw:!flex tw:!justify-between">
					<span>Subtotal</span>
					<span>Rp{subtotal.toLocaleString("id-ID")}</span>
				</div>
				<div className="tw:!flex tw:!justify-between">
					<span>PPN (11%)</span>
					<span>Rp{ppn.toLocaleString("id-ID")}</span>
				</div>
				<div className="tw:!flex tw:!justify-between">
					<span>Biaya Transaksi</span>
					<span>Rp{transactionFee.toLocaleString("id-ID")}</span>
				</div>
				<hr />
				<div className="tw:!flex tw:!justify-between tw:!font-bold tw:!text-lg">
					<span>Total</span>
					<span className="tw:!text-[#2A9FD6]">Rp{totalPrice.toLocaleString("id-ID")}</span>
				</div>
			</div>
		</div>
	);
};

/* -------------------------------
 * Countdown Timer
 * ----------------------------- */
export const CountdownTimer = ({ seconds }: { seconds: number }) => {
	const formatTime = (s: number): string => {
		const hrs = Math.floor(s / 3600);
		const mins = Math.floor((s % 3600) / 60);
		const secs = s % 60;
		return `${hrs.toString().padStart(2, "0")}:${mins
			.toString()
			.padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="tw:!text-center tw:!bg-[#F9FAFB] tw:!rounded-lg tw:!py-3 tw:!text-gray-700 tw:!font-medium">
			Sisa Waktu: <span className="tw:!font-bold tw:!text-[#2A9FD6]">{formatTime(seconds)}</span>
		</div>
	);
};

/* -------------------------------
 * Checkout Section
 * ----------------------------- */
export const CheckoutPaymentSection = ({
	paymentMethod,
	setPaymentMethod,
	onTopup,
	bookings,
	countdown,
	onPayment,
}: {
	paymentMethod: string;
	setPaymentMethod: (method: string) => void;
	onTopup: () => void;
	bookings: Booking[];
	countdown: number;
	onPayment: () => void;
}) => {
	const [walletBalance, setWalletBalance] = useState<number>(0);

	useEffect(() => {
		const storedBalance = localStorage.getItem("walletBalance");
		if (storedBalance) {
			setWalletBalance(parseInt(storedBalance, 10));
		}
	}, []);

	return (
		<div className="tw:!max-w-5xl tw:!mx-auto tw:!py-8 tw:!px-4">
			<h2 className="tw:!text-2xl tw:!font-bold tw:!mb-6 tw:!text-center">Complete Your Payment</h2>
			<div className="tw:!grid tw:!grid-cols-1 lg:tw:!grid-cols-2 tw:!gap-6">
				<PaymentSummary bookings={bookings} />
				<div className="tw:!flex tw:!flex-col tw:!gap-6">
					<PaymentMethodSelector
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
						onTopup={onTopup}
						walletBalance={walletBalance}
					/>
					<CountdownTimer seconds={countdown} />
					<Button onClick={onPayment} block variant="primary" size="large">
						Proceed to Payment
					</Button>
				</div>
			</div>
		</div>
	);
};