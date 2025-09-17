import React from "react";
import jsPDF from "jspdf";

interface PdfExportViewProps {
  issuedDate: string;
  bookingNo: string;
  shuttleBookingRef: string;
  bookingDetails: any;
  ticketNumber: string;
  generalInformation: string[];
  logoBase64?: string;
  qrBase64?: string;
}

const PdfExportView: React.FC<PdfExportViewProps> = ({
  issuedDate,
  bookingNo,
  shuttleBookingRef,
  bookingDetails,
  ticketNumber,
  generalInformation,
  logoBase64,
  qrBase64,
}) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("E-Ticket Itinerary", 105, 20, { align: "center" });

    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 10, 10, 30, 15);
    }

    doc.setFontSize(12);
    doc.text(`Issued Date: ${issuedDate}`, 10, 35);
    doc.text(`Booking No: ${bookingNo}`, 10, 45);
    doc.text(`Shuttle Booking Ref: ${shuttleBookingRef}`, 10, 55);
    doc.text(`Payment Method: ${bookingDetails.paymentMethod}`, 10, 65);

    // Passenger details
    doc.setFont("helvetica", "bold");
    doc.text("Passenger Details", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text(`Username: Guest`, 10, 90);
    doc.text(`Ticket Number: ${ticketNumber}`, 10, 100);

    // Ticket details
    let y = 115;
    bookingDetails.tickets.forEach((ticket: any, index: number) => {
      doc.setFont("helvetica", "bold");
      doc.text(`Shuttle Bus Departure Details #${index + 1}`, 10, y);
      doc.setFont("helvetica", "normal");
      y += 10;
      doc.text(`Bus Name: ${ticket.busName}`, 10, y);
      y += 8;
      doc.text(`Bus Code: Auto Generated`, 10, y); // no busCode in JSON
      y += 8;
      doc.text(`Route: ${ticket.route}`, 10, y);
      y += 8;
      doc.text(`Seat: ${ticket.seat}`, 10, y);
      y += 8;
      doc.text(`Departure Time: ${ticket.dateTime}`, 10, y);
      y += 8;
      doc.text(`Price: Rp${ticket.price.toLocaleString("id-ID")}`, 10, y);
      y += 12;
      doc.setDrawColor(200, 200, 200);
      doc.line(10, y, 200, y);
      y += 8;
    });

    // Additional info
    doc.setFont("helvetica", "bold");
    doc.text("Additional Information", 10, y);
    doc.setFont("helvetica", "normal");
    y += 10;
    generalInformation.forEach((info) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`- ${info}`, 12, y);
      y += 7;
    });

    // QR code
    y += 10;
    doc.setFontSize(10);
    doc.text("Scan QR code in the app for check-in", 10, y);

    if (qrBase64) {
      doc.addImage(qrBase64, "PNG", 150, y - 5, 40, 40);
    }

    doc.save("eticket.pdf");
  };

  return (
    <button
      onClick={handleExportPDF}
      className="tw:!px-4 tw:!py-2 tw:!bg-[#2A9FD6] tw:!text-white tw:!rounded-lg tw:!hover:bg-[#238bbd] tw:!transition"
    >
      Download E-Ticket (PDF)
    </button>
  );
};

export default PdfExportView;