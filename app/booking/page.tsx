"use client";
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import './bookingPage.css';

const BookingPage = () => {
    const router = useRouter();
    const [selectedBookings, setSelectedBookings] = useState<number[]>([]);

    const bookings = [
        {
            bookingCode: 'ABC123',
            busName: 'Grace Express',
            busPlate: 'XYZ-1234',
            from: 'New York',
            to: 'Washington D.C.',
            dateTime: '2023-10-15 08:00 AM',
            price: 50,
        },
        {
            bookingCode: 'DEF456',
            busName: 'Grace Travels',
            busPlate: 'XYZ-5678',
            from: 'Los Angeles',
            to: 'San Francisco',
            dateTime: '2023-10-16 09:00 AM',
            price: 75,
        },
        {
            bookingCode: 'GHI789',
            busName: 'Grace Lines',
            busPlate: 'XYZ-9101',
            from: 'Chicago',
            to: 'Detroit',
            dateTime: '2023-10-17 10:00 AM',
            price: 60,
        },
    ];

    const handleCheckboxChange = (index: number) => {
        setSelectedBookings((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    const totalPrice = selectedBookings.reduce((total, index) => {
        const booking = bookings[index];
        return booking ? total + booking.price : total;
    }, 0);

    const handleCheckout = () => {
        const bookingDetails = {
            bookings: selectedBookings.map((index) => bookings[index]).filter(Boolean),
            totalPrice,
            date: new Date().toLocaleDateString(),
        };
        localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
        router.push('/checkout');
    };

    return (
        <Layout footerStyle={1}>
            <div className="booking-page">
                <h2 className="title">Your Bookings</h2>
                <div className="booking-list">
                    {bookings.map((booking, index) => (
                        <div key={index} className="card">
                            <div className="card-content">
                                <p><strong>Booking Code:</strong> {booking.bookingCode}</p>
                                <p><strong>Bus Name:</strong> {booking.busName}</p>
                                <p><strong>Bus Plate:</strong> {booking.busPlate}</p>
                                <p><strong>From:</strong> {booking.from} <strong>To:</strong> {booking.to}</p>
                                <p><strong>Date and Time:</strong> {booking.dateTime}</p>
                                <p><strong>Price:</strong> ${booking.price}</p>
                            </div>
                            <div style={{textAlign : "right",}}>
                                <input
                                    type="checkbox"
                                    checked={selectedBookings.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                    className="card-checkbox"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="total-section">
                    <p><strong>Grand Total:</strong> ${totalPrice}</p>
                    <button onClick={handleCheckout} className="checkout-button">Checkout</button>
                </div>
            </div>
        </Layout>
    );
};

export default BookingPage;