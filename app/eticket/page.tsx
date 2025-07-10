"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./eticket.css";

const generateRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const ETicketPage: React.FC = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const storedBookingDetails = localStorage.getItem("bookingDetails");
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("E-Ticket", 10, 10);
    bookingDetails.bookings.forEach((booking: any, index: number) => {
      doc.text(`Booking ${index + 1}`, 10, 20 + index * 10);
      doc.text(`Bus Name: ${booking.busName}`, 10, 30 + index * 10);
      doc.text(`From: ${booking.from}`, 10, 40 + index * 10);
      doc.text(`To: ${booking.to}`, 10, 50 + index * 10);
      doc.text(`Date and Time: ${booking.dateTime}`, 10, 60 + index * 10);
      doc.text(`Price: $${booking.price}`, 10, 70 + index * 10);
    });
    doc.save("eticket.pdf");
  };

  if (!bookingDetails) {
    return null;
  }

  const bookingNo = generateRandomString(8);
  const shuttleBookingRef = generateRandomString(6);
  const ticketNumber = generateRandomString(10);
  const busCode = generateRandomString(5);
  const issuedDate = new Date().toLocaleDateString();

  const generalInformation = [
    "The bus booking reference can be used to check in, select seats, and purchase goods.",
    "All departure/arrival times are in local times.",
    "Please arrive at the bus station at least 30 minutes before departure.",
    "Keep your e-ticket and ID ready for verification.",
    "Seats are assigned on a first-come, first-served basis.",
    "Luggage should be checked in at the designated counters.",
    "Food and beverages are available for purchase on board.",
    "Free Wi-Fi is available on the bus.",
    "Smoking is strictly prohibited on the bus.",
    "Contact customer service for any assistance.",
  ];

  return (
    <div className="eticket-container">
      <div className="eticket">
        <header className="header">
          <img
            src="/assets/imgs/template/grace-logo.png"
            alt="Grace Logo"
            className="logo"
          />
          <div className="title">
            <div className="main-title">E-Ticket Itinerary</div>
            <div className="subtitle">Issued Date: {issuedDate}</div>
          </div>
        </header>
        <section className="booking-info">
          <p>
            <strong>Booking No:</strong> {bookingNo}
          </p>
          <p>
            <strong>Shuttle Booking Reference:</strong> {shuttleBookingRef}
          </p>
        </section>
        <section className="passenger-details">
          <div className="section-title">Passenger Details</div>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Username:</strong>{" "}
                  {bookingDetails.bookings[0].username}
                </td>
                <td>
                  <strong>Ticket Number:</strong> {ticketNumber}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="bus-details">
          <div className="section-title">Shuttle Bus Departure Details</div>
          {bookingDetails.bookings.map((booking: any, index: number) => (
            <div key={index} className="border p-2 mt-1">
              <p>
                <strong>Bus Name:</strong> {booking.busName}
              </p>
              <p>
                <strong>Bus Code:</strong> {busCode}
              </p>
              <p>
                <strong>From:</strong> {booking.from}
              </p>
              <p>
                <strong>To:</strong> {booking.to}
              </p>
              <p>
                <strong>Estimated Time of Arrival:</strong> {booking.dateTime}
              </p>
            </div>
          ))}
        </section>
        <section className="additional-info">
          <div className="section-title">Additional Information</div>
          <ul>
            {generalInformation.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </section>
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" />
        <button onClick={handleExportPDF}>Export as PDF</button>
      </div>
    </div>
  );
};

export default ETicketPage;
