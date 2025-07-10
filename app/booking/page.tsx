"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/navigation";
import "./bookingPage.css";

const BookingPage = () => {
  const router = useRouter();
  const [selectedBookings, setSelectedBookings] = useState<number[]>([]);

  const bookings = [
    {
      bookingCode: "STL-2211",
      busName: "Medium Bus",
      busPlate: "B 2951 XYA",
      from: "Suvana Sutera",
      to: "Menteng",
      dateTime: "2023-10-15 08:00 AM",
      price: 120000,
    },
    {
      bookingCode: "RNT-2591",
      busName: "Innova Reborn",
      busPlate: "B 4582 ABC",
      from: "1 Bulan",
      to: "Mobil + Supir + Tol",
      dateTime: "2023-10-16 09:00 AM",
      price: 14000000,
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
      bookings: selectedBookings
        .map((index) => bookings[index])
        .filter(Boolean),
      totalPrice,
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    router.push("/checkout");
  };

  return (
    <Layout footerStyle={1}>
      <div className="booking-page">
        <h2 className="title">Pesanan anda</h2>
        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <p>
                  <strong>Booking Code:</strong> {booking.bookingCode}
                </p>
                <p>
                  <strong>Bus Name:</strong> {booking.busName}
                </p>
                <p>
                  <strong>Bus Plate:</strong> {booking.busPlate}
                </p>
                <p>
                  <strong>From:</strong> {booking.from} <strong>To:</strong>{" "}
                  {booking.to}
                </p>
                <p>
                  <strong>Date and Time:</strong> {booking.dateTime}
                </p>
                <p>
                  <strong>Price:</strong> Rp{booking.price}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
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
          <p>
            <strong>Grand Total:</strong> Rp{totalPrice}
          </p>
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
