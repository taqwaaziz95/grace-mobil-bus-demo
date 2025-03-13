"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import './checkoutPage.css';

const CheckoutPage = () => {
    const router = useRouter();
    const [bookingDetails, setBookingDetails] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(24 * 60 * 60); // 24 hours in seconds

    useEffect(() => {
        const storedBookingDetails = localStorage.getItem("bookingDetails");
        if (storedBookingDetails) {
            setBookingDetails(JSON.parse(storedBookingDetails));
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - 1 : 0);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePayment = () => {
        if (paymentMethod) {
            const eticketDetails = {
                ...bookingDetails,
                paymentMethod,
                issuedDate: new Date().toLocaleDateString(),
            };
            localStorage.setItem("eticketDetails", JSON.stringify(eticketDetails));
            router.push('/eticket');
        } else {
            alert('Please select a payment method.');
        }
    };

    if (!bookingDetails) {
        return <p>Loading...</p>;
    }

    return (
        <Layout footerStyle={1}>
            <div className="checkout-page">
                <h2 className="title">Checkout</h2>
                <div className="booking-summary">
                    <h5>Booking Summary</h5>
                    {bookingDetails.bookings.map((booking: any, index: number) => (
                        <div key={index} className="card">
                            <div className="card-content">
                                <p><strong>Booking Code:</strong> {booking.bookingCode}</p>
                                <p><strong>Bus Name:</strong> {booking.busName}</p>
                                <p><strong>Bus Plate:</strong> {booking.busPlate}</p>
                                <p><strong>From:</strong> {booking.from} <strong>To:</strong> {booking.to}</p>
                                <p><strong>Date and Time:</strong> {booking.dateTime}</p>
                                <p><strong>Price:</strong> ${booking.price}</p>
                            </div>
                        </div>
                    ))}
                    <div className="total-section">
                        <p><strong>Grand Total:</strong> ${bookingDetails.totalPrice}</p>
                    </div>
                </div>
                <div className="payment-method">
                    <h5 style={{ textAlign: 'left' }}>Payment Method</h5>
                    <div className="payment-options">
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Debit"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Pay with Debit
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Wallet Balance"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Pay with Wallet Balance
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="QR"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Pay with QR
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Xendit"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Pay with Xendit
                        </label>
                    </div>
                </div>
                <div className="countdown-timer">
                    <p><strong>Time Remaining:</strong> {formatTime(countdown)}</p>
                </div>
                <button onClick={handlePayment} className="checkout-button">Proceed to Payment</button>
            </div>
        </Layout>
    );
};

export default CheckoutPage;