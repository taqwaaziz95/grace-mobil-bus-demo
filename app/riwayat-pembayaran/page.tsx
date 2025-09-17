"use client";
import Layout from "@/components/layout/Layout";
import { H3, H4, H6, P, Span } from "@/components/typography";
import React, { useMemo } from "react";
import { withBasePath } from "@/lib/basePath";
import JumbotronHeader from "@/components/jumbotron-header";
import CustomTable, { Column } from "@/components/custom-table";
import CustomHeaders from "@/components/custom-headers";

// ---------- Types ----------
interface PaymentDetails {
	startDate: string;
	endDate: string;
	duration?: string;
	pickupLocation: string;
	dropoffLocation: string;
	driverName?: string;
	driverContact?: string;
	paymentMethod: string;
	additionalServices: string[];
	departureTime?: string;
	returnTime?: string;
	passengers?: string;
}

interface Payment {
	id: string;
	type: "Car Rental" | "Shuttle Bus" | "Bus";
	vehicle: string;
	date: string;
	amount: string;
	status: "completed" | "processing" | "canceled";
	details: PaymentDetails;
	image: string;
}

// ---------- Dummy data ----------
const dummyPayments: Payment[] = [
	{
		id: "INV-2025081401",
		type: "Car Rental",
		vehicle: "Toyota Avanza",
		date: "2025-08-10",
		amount: "750000",
		status: "completed",
		details: {
			startDate: "2025-08-15",
			endDate: "2025-08-17",
			duration: "2 days",
			pickupLocation: "Soekarno-Hatta Airport",
			dropoffLocation: "Soekarno-Hatta Airport",
			driverName: "Andi Wijaya",
			driverContact: "081234567890",
			paymentMethod: "Bank Transfer",
			additionalServices: ["Child Seat", "GPS Navigation"],
		},
		image: withBasePath("/assets/imgs/cars-listing/cars-listing-1/car-1.png"),
	},
	{
		id: "INV-2025081302",
		type: "Shuttle Bus",
		vehicle: "Hiace Commuter",
		date: "2025-08-13",
		amount: "1200000",
		status: "processing",
		details: {
			startDate: "2025-08-20",
			endDate: "2025-08-20",
			pickupLocation: "BSD City",
			dropoffLocation: "Jakarta Pusat",
			passengers: "8 orang",
			departureTime: "08:00",
			paymentMethod: "Credit Card",
			additionalServices: ["WiFi"],
		},
		image: withBasePath("/assets/imgs/cars-listing/cars-listing-1/car-2.png"),
	},
	{
		id: "INV-2025081203",
		type: "Bus",
		vehicle: "Medium Bus 25-Seater",
		date: "2025-08-12",
		amount: "3500000",
		status: "canceled",
		details: {
			startDate: "2025-08-18",
			endDate: "2025-08-19",
			pickupLocation: "Jakarta",
			dropoffLocation: "Bandung",
			passengers: "22 orang",
			departureTime: "06:30",
			returnTime: "16:00",
			paymentMethod: "Virtual Account",
			additionalServices: ["Karaoke", "Tour Guide"],
		},
		image: withBasePath("/assets/imgs/cars-listing/cars-listing-1/car-3.png"),
	},
	{
		id: "INV-2025080504",
		type: "Car Rental",
		vehicle: "Honda Brio",
		date: "2025-08-05",
		amount: "500000",
		status: "completed",
		details: {
			startDate: "2025-08-07",
			endDate: "2025-08-08",
			duration: "1 day",
			pickupLocation: "Depok",
			dropoffLocation: "Depok",
			driverName: "Budi Santoso",
			driverContact: "082187654321",
			paymentMethod: "E-Wallet",
			additionalServices: [],
		},
		image: withBasePath("/assets/imgs/cars-listing/cars-listing-1/car-4.png"),
	},
	{
		id: "INV-2025073005",
		type: "Bus",
		vehicle: "Big Bus 40-Seater",
		date: "2025-07-30",
		amount: "5000000",
		status: "completed",
		details: {
			startDate: "2025-08-01",
			endDate: "2025-08-03",
			pickupLocation: "Jakarta",
			dropoffLocation: "Yogyakarta",
			passengers: "38 orang",
			departureTime: "05:00",
			returnTime: "20:00",
			paymentMethod: "Corporate Account",
			additionalServices: ["Karaoke", "WiFi", "Tour Guide", "Meals"],
		},
		image: withBasePath("/assets/imgs/cars-listing/cars-listing-1/car-5.png"),
	},
];

// ---------- Helpers ----------
const formatDate = (dateString: string) =>
	new Date(dateString).toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

const formatCurrency = (amount: number | string) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(Number(amount));

const normalizePembayaran = (method: string) => {
	const s = method.toLowerCase();
	if (s.includes("virtual")) return "Xendit";
	if (s.includes("credit")) return "Xendit";
	if (s.includes("wallet")) return "QR";
	if (s.includes("transfer")) return "Transfer";
	if (s.includes("corporate")) return "Transfer";
	return method;
};

const parseQty = (p: Payment): number => {
	const text = p.details.passengers || "";
	const m = text.match(/\d+/);
	if (m) return Number(m[0]);
	return p.type === "Car Rental" ? 1 : 1;
};

// ---------- Row shape (add original payment for details) ----------
type Row = {
	id: string;
	rute: string;
	mobil: string;
	tanggal: string;
	tanggalRaw: string;
	jam: string;
	quantity: number;
	total: number;
	status: Payment["status"];
	pembayaran: string;
	payment: Payment; // full reference
};

const columns: Column<Row>[] = [
	{
		key: "no",
		header: "No",
		widthClass: "tw:!w-14",
		align: "center",
		render: (_, globalIndex) => globalIndex + 1,
	},
	{ key: "rute", header: "Rute", sortable: true },
	{ key: "mobil", header: "Mobil", sortable: true },
	{
		key: "tanggal",
		header: "Tanggal",
		sortable: true,
		sortAccessor: (row) => new Date(row.tanggalRaw),
	},
	{ key: "jam", header: "Jam", sortable: true, widthClass: "tw:!w-24" },
	{
		key: "quantity",
		header: "Quantity",
		sortable: true,
		align: "right",
		widthClass: "tw:!w-24",
		render: (row) => <span className="tw:!tabular-nums">{row.quantity}</span>,
	},
	{
		key: "total",
		header: "Total",
		sortable: true,
		align: "right",
		widthClass: "tw:!w-40",
		render: (row) => (
			<span className="tw:!font-semibold">{formatCurrency(row.total)}</span>
		),
		sortAccessor: (row) => row.total,
	},
	{
		key: "status",
		header: "Status",
		sortable: true,
		widthClass: "tw:!w-36",
		render: (row) => {
			const map: Record<
				Row["status"],
				{ bg: string; text: string; dot: string; label: string }
			> = {
				completed: {
					bg: "tw:!bg-green-50 tw:!border-green-200",
					text: "tw:!text-green-700",
					dot: "tw:!bg-green-500",
					label: "Selesai",
				},
				processing: {
					bg: "tw:!bg-blue-50 tw:!border-blue-200",
					text: "tw:!text-blue-700",
					dot: "tw:!bg-blue-500",
					label: "Diproses",
				},
				canceled: {
					bg: "tw:!bg-red-50 tw:!border-red-200",
					text: "tw:!text-red-700",
					dot: "tw:!bg-red-500",
					label: "Dibatalkan",
				},
			};
			const style = map[row.status];
			return (
				<span
					className={`tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-2.5 tw:!py-1 tw:!rounded-full tw:!text-xs tw:!border ${style.bg} ${style.text}`}
				>
					<span className={`tw:!w-2 tw:!h-2 tw:!rounded-full ${style.dot}`} />
					{style.label}
				</span>
			);
		},
		sortAccessor: (row) => row.status,
	},
	{
		key: "pembayaran",
		header: "Pembayaran",
		sortable: true,
		widthClass: "tw:!w-56",
		render: (row) => {
			const chip =
				row.pembayaran === "Xendit"
					? "tw:!bg-purple-50 tw:!border-purple-200 tw:!text-purple-700"
					: row.pembayaran === "QR"
						? "tw:!bg-amber-50 tw:!border-amber-200 tw:!text-amber-700"
						: "tw:!bg-gray-50 tw:!border-gray-200 tw:!text-gray-700";
			return (
				<span
					className={`tw:!inline-flex tw:!items-center tw:!px-2.5 tw:!py-1 tw:!rounded-full tw:!text-xs tw:!border ${chip}`}
				>
					{row.pembayaran}
				</span>
			);
		},
		sortAccessor: (row) => row.pembayaran,
	},
];

const RiwayatPembayaranPage = () => {
	const rows: Row[] = useMemo(() => {
		return dummyPayments.map((p) => ({
			id: p.id,
			rute: `${p.details.pickupLocation} → ${p.details.dropoffLocation}`,
			mobil: p.vehicle,
			tanggal: formatDate(p.details.startDate || p.date),
			tanggalRaw: p.details.startDate || p.date,
			jam: p.details.departureTime ?? "-",
			quantity: parseQty(p),
			total: Number(p.amount),
			status: p.status,
			pembayaran: normalizePembayaran(p.details.paymentMethod),
			payment: p,
		}));
	}, []);

	return (
		<Layout footerStyle={1}>
			{/* <JumbotronHeader
				title="Riwayat Pembayaran"
				subtitle="Lihat dan kelola riwayat pembayaran Anda"
				bannerImg={"/assets/imgs/page-header/banner.png"}
				breadcrumbs={[
					{ label: "Home", href: "/", isActive: false },
					{
						label: "Riwayat Pembayaran",
						href: "/riwayat-pembayaran",
						isActive: true,
					},
				]}
			/> */}

			<CustomHeaders
				title="Riwayat Pembayaran"
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Riwayat Pembayaran" },
				]}
			/>

			<div className="tw:!bg-gray-50">
				<div className="tw:!container tw:!mx-auto tw:!px-4 tw:!py-8">
					{/* widened container */}
					<div className="tw:!mx-auto tw:!w-full tw:!max-w-6xl">
						<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
							<H3 color="dark" className="tw:!text-lg md:tw:!text-xl tw:!mb-3">
								Riwayat Transaksi
							</H3>

							<CustomTable<Row>
								columns={columns}
								data={rows}
								pageSize={10}
								initialSort={{ key: "tanggal", direction: "desc" }}
								searchable
								searchPlaceholder="Cari Rute, Mobil, Status, Pembayaran…"
								expandable
								rowKey={(r) => r.id}
								renderExpanded={(row) => <ExpandedDetails row={row} />}
								emptyState={
									<div className="tw:!text-center">
										<img
											src={withBasePath(
												"/assets/imgs/template/icons/empty-state.svg"
											)}
											className="tw:!w-24 tw:!h-24 tw:!mx-auto tw:!mb-3"
											alt="Tidak ada transaksi"
										/>
										<H4 className="tw:!mb-1">Tidak ada transaksi</H4>
										<P className="tw:!text-gray-500">
											Coba ubah kata kunci pencarian
										</P>
									</div>
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

// ---------- Expanded detail panel ----------
const ExpandedDetails = ({ row }: { row: Row }) => {
	const p = row.payment;
	return (
		<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!p-3 md:tw:!p-4">
			<div className="tw:!flex tw:!items-start tw:!gap-3 md:tw:!gap-4">
				<div className="tw:!w-28 tw:!h-20 tw:!rounded-xl tw:!overflow-hidden tw:!bg-gray-100 tw:!border tw:!border-gray-200">
					<img
						src={withBasePath(p.image)}
						alt={p.vehicle}
						className="tw:!w-full tw:!h-full tw:!object-cover"
					/>
				</div>

				<div className="tw:!flex-1 tw:!min-w-0">
					<div className="tw:!flex tw:!items-center tw:!gap-2 tw:!mb-1">
						<H6 className="tw:!truncate">{p.vehicle}</H6>
						<StatusPill status={p.status} />
					</div>
					<P className="tw:!text-xs tw:!text-gray-500">
						{p.id} • Dibuat {formatDate(p.date)}
					</P>

					<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-3 tw:!gap-3 tw:!mt-3">
						<Info label="Tipe" value={p.type} />
						<Info
							label="Tanggal Mulai"
							value={formatDate(p.details.startDate)}
						/>
						<Info
							label="Tanggal Selesai"
							value={formatDate(p.details.endDate)}
						/>
						{p.details.duration && (
							<Info label="Durasi" value={p.details.duration} />
						)}
						<Info label="Pengambilan" value={p.details.pickupLocation} />
						<Info label="Pengembalian" value={p.details.dropoffLocation} />
						<Info
							label="Waktu Berangkat"
							value={p.details.departureTime ?? "-"}
						/>
						{p.details.returnTime && (
							<Info label="Waktu Kembali" value={p.details.returnTime} />
						)}
						{p.details.passengers && (
							<Info label="Penumpang" value={p.details.passengers} />
						)}
						{p.details.driverName && (
							<Info label="Pengemudi" value={p.details.driverName} />
						)}
						{p.details.driverContact && (
							<Info label="Kontak" value={p.details.driverContact} />
						)}
						<Info label="Metode Pembayaran" value={p.details.paymentMethod} />
					</div>

					{p.details.additionalServices.length > 0 && (
						<div className="tw:!mt-3">
							<P className="tw:!text-xs tw:!text-gray-500 tw:!mb-1.5">
								Layanan Tambahan
							</P>
							<div className="tw:!flex tw:!flex-wrap tw:!gap-2">
								{p.details.additionalServices.map((s, i) => (
									<span
										key={i}
										className="tw:!px-2.5 tw:!py-1 tw:!text-xs tw:!rounded-full tw:!bg-gray-100 tw:!border tw:!border-gray-200"
									>
										{s}
									</span>
								))}
							</div>
						</div>
					)}

					<div className="tw:!mt-4 tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-3 tw:!gap-3">
						<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-gray-50 tw:!p-3">
							<P className="tw:!text-xs tw:!text-gray-500">Total Dibayar</P>
							<H6 className="tw:!mt-0.5">{formatCurrency(p.amount)}</H6>
						</div>
						<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-gray-50 tw:!p-3">
							<P className="tw:!text-xs tw:!text-gray-500">Pembayaran</P>
							<P className="tw:!text-sm">
								{normalizePembayaran(p.details.paymentMethod)}
							</P>
						</div>
						<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-gray-50 tw:!p-3">
							<P className="tw:!text-xs tw:!text-gray-500">Quantity</P>
							<P className="tw:!text-sm">{parseQty(p)}</P>
						</div>
					</div>

					<div className="tw:!mt-4 tw:!flex tw:!flex-wrap tw:!gap-2 tw:!justify-end">
						{p.status === "completed" && (
							<a
								href="#"
								className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!bg-primary-600 tw:!text-white hover:tw:!bg-primary-700"
							>
								Unduh Invoice
							</a>
						)}
						{p.status === "processing" && (
							<a
								href="#"
								className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!bg-primary-600 tw:!text-white hover:tw:!bg-primary-700"
							>
								Cek Status
							</a>
						)}
						<a
							href="/contact"
							className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-gray-700 hover:tw:!bg-gray-50"
						>
							Bantuan
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

const Info = ({ label, value }: { label: string; value?: string }) => {
	if (!value) return null;
	return (
		<div className="tw:!min-w-0">
			<P className="tw:!text-[11px] tw:!text-gray-500">{label}</P>
			<P className="tw:!text-sm tw:!font-medium tw:!truncate">{value}</P>
		</div>
	);
};

const StatusPill = ({ status }: { status: Payment["status"] }) => {
	const map: Record<
		Payment["status"],
		{ bg: string; text: string; dot: string; label: string }
	> = {
		completed: {
			bg: "tw:!bg-green-50 tw:!border-green-200",
			text: "tw:!text-green-700",
			dot: "tw:!bg-green-500",
			label: "Selesai",
		},
		processing: {
			bg: "tw:!bg-blue-50 tw:!border-blue-200",
			text: "tw:!text-blue-700",
			dot: "tw:!bg-blue-500",
			label: "Diproses",
		},
		canceled: {
			bg: "tw:!bg-red-50 tw:!border-red-200",
			text: "tw:!text-red-700",
			dot: "tw:!bg-red-500",
			label: "Dibatalkan",
		},
	};
	const style = map[status];
	return (
		<span
			className={`tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-2.5 tw:!py-1 tw:!rounded-full tw:!text-xs tw:!border ${style.bg} ${style.text}`}
		>
			<span className={`tw:!w-2 tw:!h-2 tw:!rounded-full ${style.dot}`} />
			{style.label}
		</span>
	);
};

export default RiwayatPembayaranPage;
