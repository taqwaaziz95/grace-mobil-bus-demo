"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { withBasePath } from "@/lib/basePath";
import { QRGenerator } from "@/components/qr-generator";
import PdfExportView from "@/components/pdf-export-view";
import moment from "moment";

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
		const storedBookingDetails = localStorage.getItem("receiptDetails");
		if (storedBookingDetails) {
			setBookingDetails(JSON.parse(storedBookingDetails));
		} else {
			router.push("/");
		}
	}, [router]);

	if (!bookingDetails) return null;

	const bookingNo = generateRandomString(8);
	const shuttleBookingRef = generateRandomString(6);
	const ticketNumber = generateRandomString(10);
	const busCode = generateRandomString(5);
	const issuedDate = bookingDetails.issuedDate || new Date().toLocaleDateString();

	const generalInformation = [
		"Referensi pemesanan bus dapat digunakan untuk check-in, memilih kursi, dan membeli barang.",
		"Semua waktu keberangkatan/kedatangan adalah waktu setempat.",
		"Harap tiba di terminal bus minimal 30 menit sebelum keberangkatan.",
		"Simpan e-tiket dan identitas Anda untuk verifikasi.",
		"Kursi dialokasikan berdasarkan kedatangan pertama.",
		"Bagasi harus didaftarkan di loket yang tersedia.",
		"Makanan dan minuman tersedia untuk dibeli di dalam bus.",
		"Wi-Fi gratis tersedia di dalam bus.",
		"Dilarang merokok di dalam bus.",
		"Hubungi layanan pelanggan untuk bantuan.",
	];

	return (
		<Layout footerStyle={1}>
			<div className="tw:!max-w-3xl tw:!border tw:!border-[#dde1de] tw:!mx-auto tw:!bg-white tw:!shadow-md tw:!rounded-xl tw:!p-6 tw:!my-8">
				{/* Header */}
				<div className="tw:!flex tw:!items-center tw:!justify-between tw:!mb-6">
					<img
						src={withBasePath("/assets/imgs/template/grace-logo.png")}
						alt="Logo Grace"
						className="tw:!h-12"
					/>
					<div className="tw:!text-right">
						<h1 className="tw:!text-xl tw:!font-bold">Itinerary E-Tiket</h1>
						<p className="tw:!text-sm tw:!text-gray-500">Tanggal Terbit: {issuedDate}</p>
					</div>
				</div>

				{/* Informasi Pemesanan */}
				<div className="tw:!mb-4">
					<p><strong>No. Pemesanan:</strong> {bookingNo}</p>
					<p><strong>Referensi Shuttle:</strong> {shuttleBookingRef}</p>
					<p><strong>Metode Pembayaran:</strong> {bookingDetails.paymentMethod}</p>
				</div>

				{/* Detail Penumpang */}
				<div className="tw:!mb-6">
					<h2 className="tw:!font-semibold tw:!text-lg tw:!mb-2">Detail Penumpang</h2>
					<div className="tw:!flex tw:!justify-between tw:!text-sm tw:!border tw:!rounded-lg tw:!p-3 tw:!bg-gray-50">
						<span><strong>Nama:</strong> Tamu</span>
						<span><strong>No. Tiket:</strong> {ticketNumber}</span>
					</div>
				</div>

				{/* Detail Bus */}
				<div className="tw:!mb-6">
					<h2 className="tw:!font-semibold tw:!text-lg tw:!mb-2">Detail Keberangkatan Shuttle</h2>
					<div className="tw:!space-y-3">
						{bookingDetails.tickets.map((booking: any, index: number) => (
							<div
								key={index}
								className="tw:!border tw:!rounded-lg tw:!p-4 tw:!bg-gray-50 tw:!flex tw:!justify-between tw:!items-center tw:!gap-4"
							>
								{/* Left: Ticket Details */}
								<div className="tw:!flex-1">
									<p><strong>Kode Bus:</strong> {booking.bookingCode}</p>
									<p><strong>Rute:</strong> {booking.route}</p>
									<p><strong>Kursi:</strong> {booking.seat}</p>
									<p><strong>Waktu Keberangkatan:</strong> {moment(booking.dateTime).format("DD/MM/YYYY HH:mm")}</p>
								</div>

								{/* Right: QR Code */}
								<div className="tw:!w-24 tw:!h-24 tw:!flex tw:!justify-center tw:!items-center">
									<QRGenerator size={96} value={`${booking.bookingCode}-${booking.seat}`} />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Informasi Tambahan */}
				<div className="tw:!mb-6">
					<h2 className="tw:!font-semibold tw:!text-lg tw:!mb-2">Informasi Tambahan</h2>
					<ul className="tw:!list-disc tw:!pl-5 tw:!text-sm tw:!text-gray-700 tw:!space-y-1">
						{generalInformation.map((info, index) => (
							<li key={index}>{info}</li>
						))}
					</ul>
				</div>

				{/* QR Code */}
				<div className="tw:!flex tw:!flex-col tw:!justify-center tw:!mb-6">
					<h2 className="tw:!font-semibold tw:!text-lg tw:!mb-2 tw!:mt-4 tw:!text-center">Scan disini untuk verifikasi semua tiket</h2>
					<QRGenerator value={bookingNo} />
				</div>

				{/* Ekspor PDF */}
				<PdfExportView
					issuedDate={issuedDate}
					bookingNo={bookingNo}
					shuttleBookingRef={shuttleBookingRef}
					bookingDetails={bookingDetails}
					ticketNumber={ticketNumber}
					generalInformation={generalInformation}
				/>
			</div>
		</Layout>
	);
};

export default ETicketPage;