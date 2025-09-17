"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/navigation";
import "./checkoutPage.css";
import TopupModal from "../../components/modal/TopupModal";
import {
	PaymentMethodSelector,
	PaymentSummary,
	CountdownTimer,
} from "@/components/payment-components";
import Button from "@/components/button";

const CheckoutPage = () => {
	const router = useRouter();
	const [bookingDetails, setBookingDetails] = useState<any>(null);
	const [paymentMethod, setPaymentMethod] = useState<string>("");
	const [countdown, setCountdown] = useState<number>(5 * 60); // 24 hours in seconds
	const [wallet, setWallet] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const storedBookingDetails = localStorage.getItem("checkoutDetails");
		if (storedBookingDetails) {
			setBookingDetails(JSON.parse(storedBookingDetails));
		}

		const storedWallet = localStorage.getItem("wallet");
		if (storedWallet) {
			setWallet(parseInt(storedWallet, 10));
		}
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) =>
				prevCountdown > 0 ? prevCountdown - 1 : 0
			);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handlePayment = () => {
		if (paymentMethod) {
			const receiptDetails = {
				...bookingDetails,
				paymentMethod,
				issuedDate: new Date().toLocaleDateString(),
			};
			localStorage.setItem("receiptDetails", JSON.stringify(receiptDetails));
			router.push("/receipt");
		} else {
			alert("Please select a payment method.");
		}
	};

	const handleTopupConfirm = (amount: number) => {
		const newWallet = wallet + amount;
		localStorage.setItem("wallet", newWallet.toString());
		setWallet(newWallet);
		setIsModalOpen(false);
	};

	if (!bookingDetails) {
		return <p>Loading...</p>;
	}

	return (
		<Layout footerStyle={1}>
			<div className="tw:!max-w-3xl tw:!mx-auto tw:!py-8 tw:!px-4">
				<h2 className="tw:!title tw:!text-2xl tw:!font-bold tw:!mb-6 tw:!text-center">
					Bayar
				</h2>
				<div className="tw:!gap-8">
					<PaymentSummary bookings={bookingDetails.tickets} />
					<div className="tw:!flex tw:!flex-col tw:!gap-6">
						<PaymentMethodSelector
							walletBalance={wallet}
							paymentMethod={paymentMethod}
							setPaymentMethod={setPaymentMethod}
							onTopup={handleOpenModal}
						/>
						<CountdownTimer seconds={countdown} />

						<div className="tw:!flex tw:!gap-4 tw:!justify-between">
							<Button
								variant="secondary"
								onClick={() => router.back()}
								className="tw:!flex-1"
							>
								Back
							</Button>
							<Button
								onClick={handlePayment}
								className="tw:!flex-1"
							>
								Proses Bayar
							</Button>
						</div>
					</div>
				</div>
			</div>
			{isModalOpen && (
				<TopupModal onClose={handleCloseModal} onTopupConfirm={handleTopupConfirm} />
			)}
		</Layout>
	);
};

export default CheckoutPage;