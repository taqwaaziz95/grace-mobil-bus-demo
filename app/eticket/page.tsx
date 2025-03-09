"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./eticket.css";

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
		doc.text(`Bus Name: ${bookingDetails.car.name}`, 10, 20);
		doc.text(`Username: ${bookingDetails.username}`, 10, 30);
		doc.text(`Date: ${bookingDetails.date}`, 10, 40);
		doc.text(`Time: ${bookingDetails.time}`, 10, 50);
		doc.text(`Seats: ${bookingDetails.seats.join(", ")}`, 10, 60);
		doc.save("eticket.pdf");
	};

	if (!bookingDetails) {
		return null;
	}

	return (
		<div className="eticket-container">
			<div className="eticket">
				<h5>
					<strong>Here is your issued E-Ticket</strong>
				</h5>
				<p>
					<strong>Bus Name:</strong> {bookingDetails.car.name}
				</p>
				<p>
					<strong>Username:</strong> {bookingDetails.username}
				</p>
				<p>
					<strong>Date:</strong> {bookingDetails.date}
				</p>
				<p>
					<strong>Time:</strong> {bookingDetails.time}
				</p>
				<p>
					<strong>Seats:</strong> {bookingDetails.seats.join(", ")}
				</p>
				<button onClick={handleExportPDF}>Export as PDF</button>
			</div>
		</div>
	);
};

export default ETicketPage;
