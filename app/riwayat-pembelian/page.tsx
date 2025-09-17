"use client";
import Layout from "@/components/layout/Layout";
import { H3, H4, H6, P } from "@/components/typography";
import React, { useMemo, useState } from "react";
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import JumbotronHeader from "@/components/jumbotron-header";
import CustomHeaders from "@/components/custom-headers";

// ---------- Types ----------
type PurchaseType = "Car Rental" | "Shuttle Bus" | "Bus";
type PurchaseStatus = "confirmed" | "awaiting" | "canceled";

interface Passenger {
	name: string;
	seat?: string;
}

interface PriceBreakdown {
	base: number;
	serviceFee?: number;
	insurance?: number;
	tax?: number;
	discount?: number; // positive number; will be shown as minus
	total: number;
}

interface PurchaseDetails {
	startDate: string;
	endDate: string;
	duration?: string;
	pickupLocation: string;
	dropoffLocation: string;
	passengers?: string; // e.g., "8 orang"
	passengerList?: Passenger[];
	departureTime?: string;
	returnTime?: string;
	driverName?: string;
	driverContact?: string;
	addOns: string[];
	paymentMethod: string;
	provider?: string; // vendor/operator
	voucherCode?: string;
	cancellationPolicy?: string;
	notes?: string;
	price: PriceBreakdown;
}

interface Purchase {
	id: string;
	type: PurchaseType;
	vehicle: string;
	orderDate: string; // createdAt of the purchase
	status: PurchaseStatus;
	details: PurchaseDetails;
	image: string;
}

// ---------- Dummy data ----------
const dummyPurchases: Purchase[] = [
	{
		id: "ORD-2025081401",
		type: "Car Rental",
		vehicle: "Toyota Avanza",
		orderDate: "2025-08-14",
		status: "confirmed",
		details: {
			startDate: "2025-08-18",
			endDate: "2025-08-20",
			duration: "2 days",
			pickupLocation: "Soekarno-Hatta Airport (T3)",
			dropoffLocation: "Soekarno-Hatta Airport (T3)",
			driverName: "Andi Wijaya",
			driverContact: "0812-3456-7890",
			addOns: ["Child Seat", "GPS"],
			paymentMethod: "Kartu Kredit",
			provider: "GraceTrans",
			voucherCode: "HEMAT50",
			cancellationPolicy:
				"Gratis pembatalan hingga 24 jam sebelum waktu pengambilan.",
			notes: "Ambil di area parkir P2, konter 17.",
			price: {
				base: 800_000,
				serviceFee: 15_000,
				insurance: 10_000,
				tax: 88_000, // ~11%
				discount: 50_000,
				total: 863_000,
			},
		},
		image: withBasePath("/assets/imgs/cars-listing/cars-listing-1/car-1.png"),
	},
	{
		id: "ORD-2025081302",
		type: "Shuttle Bus",
		vehicle: "Hiace Commuter",
		orderDate: "2025-08-13",
		status: "awaiting",
		details: {
			startDate: "2025-08-21",
			endDate: "2025-08-21",
			pickupLocation: "BSD City",
			dropoffLocation: "Jakarta Pusat",
			passengers: "8 orang",
			passengerList: [
				{ name: "Rina", seat: "2A" },
				{ name: "Budi", seat: "2B" },
				{ name: "Sari", seat: "3A" },
				{ name: "Tomo", seat: "3B" },
			],
			departureTime: "08:00",
			addOns: ["WiFi"],
			paymentMethod: "Virtual Account",
			provider: "GraceTrans Shuttle",
			cancellationPolicy:
				"Biaya pembatalan 10% jika < 12 jam sebelum keberangkatan.",
			price: {
				base: 1_000_000,
				serviceFee: 15_000,
				tax: 110_000,
				total: 1_125_000,
			},
		},
		image: withBasePath("/assets/imgs/gracetrans/cars/hiace.jpg"),
	},
	{
		id: "ORD-2025081203",
		type: "Bus",
		vehicle: "Medium Bus 25-Seater",
		orderDate: "2025-08-12",
		status: "canceled",
		details: {
			startDate: "2025-08-19",
			endDate: "2025-08-20",
			pickupLocation: "Jakarta",
			dropoffLocation: "Bandung",
			passengers: "22 orang",
			passengerList: [{ name: "Tim A (22 pax)" }],
			departureTime: "06:30",
			returnTime: "16:00",
			addOns: ["Karaoke", "Tour Guide"],
			paymentMethod: "Transfer Bank",
			provider: "GraceTrans Bus",
			cancellationPolicy:
				"Tidak dapat dikembalikan (< 24 jam sebelum keberangkatan).",
			price: {
				base: 3_300_000,
				serviceFee: 20_000,
				tax: 363_000,
				discount: 100_000,
				total: 3_583_000,
			},
		},
		image: withBasePath("/assets/imgs/gracetrans/cars/medium-bus.jpg"),
	},
	{
		id: "ORD-2025073004",
		type: "Bus",
		vehicle: "Big Bus 40-Seater",
		orderDate: "2025-07-30",
		status: "confirmed",
		details: {
			startDate: "2025-08-02",
			endDate: "2025-08-03",
			pickupLocation: "Jakarta",
			dropoffLocation: "Yogyakarta",
			passengers: "38 orang",
			passengerList: [{ name: "Rombongan Perusahaan (38 pax)" }],
			departureTime: "05:00",
			returnTime: "20:00",
			addOns: ["Karaoke", "WiFi", "Tour Guide", "Meals"],
			paymentMethod: "Akun Korporat",
			provider: "GraceTrans Premium",
			cancellationPolicy: "Gratis reschedule 1x hingga H-3.",
			price: {
				base: 4_600_000,
				serviceFee: 25_000,
				insurance: 15_000,
				tax: 506_000,
				total: 5_146_000,
			},
		},
		image: withBasePath("/assets/imgs/gracetrans/cars/big-bus.jpg"),
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

// ---------- UI bits ----------
const StatusBadge = ({ status }: { status: PurchaseStatus }) => {
	const map: Record<
		PurchaseStatus,
		{ bg: string; text: string; dot: string; label: string }
	> = {
		confirmed: {
			bg: "tw:!bg-green-50",
			text: "tw:!text-green-700",
			dot: "tw:!bg-green-500",
			label: "Berhasil",
		},
		awaiting: {
			bg: "tw:!bg-amber-50",
			text: "tw:!text-amber-700",
			dot: "tw:!bg-amber-500",
			label: "Menunggu",
		},
		canceled: {
			bg: "tw:!bg-red-50",
			text: "tw:!text-red-700",
			dot: "tw:!bg-red-500",
			label: "Dibatalkan",
		},
	};
	const style = map[status];
	return (
		<span
			className={`tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-2.5 tw:!py-1 tw:!rounded-full tw:!text-xs ${style.bg} ${style.text}`}
		>
			<span
				className={`tw:!inline-block tw:!w-2 tw:!h-2 tw:!rounded-full ${style.dot}`}
			/>
			{style.label}
		</span>
	);
};

const SegmentedTabs = ({
	active,
	setActive,
	tabs,
}: {
	active: number;
	setActive: (i: number) => void;
	tabs: string[];
}) => {
	return (
		<div className="tw:!w-full tw:!bg-gray-100 tw:!rounded-xl tw:!p-1 tw:!flex tw:!gap-1">
			{tabs.map((t, i) => (
				<button
					key={t}
					onClick={() => setActive(i)}
					className={`tw:!flex-1 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!transition tw:!font-medium ${
						active === i
							? "tw:!bg-white tw:!shadow tw:!text-primary-600"
							: "tw:!text-gray-600 hover:tw:!text-gray-800"
					}`}
				>
					{t}
				</button>
			))}
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

const PriceLine = ({
	label,
	value,
	bold,
	negative = false,
}: {
	label: string;
	value?: number;
	bold?: boolean;
	negative?: boolean;
}) => {
	if (value === undefined) return null;
	const formatted = `${negative ? "-" : ""}${formatCurrency(value)}`;
	return (
		<div className="tw:!flex tw:!items-center tw:!justify-between">
			<P
				className={`tw:!text-sm ${bold ? "tw:!font-semibold" : "tw:!text-gray-600"}`}
			>
				{label}
			</P>
			<P
				className={`tw:!text-sm ${bold ? "tw:!font-semibold" : "tw:!text-gray-800"}`}
			>
				{formatted}
			</P>
		</div>
	);
};

// ---------- Card ----------
const PurchaseCard = ({ purchase }: { purchase: Purchase }) => {
	const [open, setOpen] = useState(false);
	const d = purchase.details;

	return (
		<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5 tw:!transition hover:tw:!shadow-md">
			{/* Header */}
			<div className="tw:!flex tw:!items-center tw:!justify-between tw:!gap-3">
				<div className="tw:!min-w-0">
					<div className="tw:!flex tw:!items-center tw:!gap-2 tw:!mb-1">
						<H6 className="tw:!truncate">{purchase.type}</H6>
						<StatusBadge status={purchase.status} />
					</div>
					<P className="tw:!text-xs tw:!text-gray-500 tw:!truncate">
						{purchase.id} • Pesan {formatDate(purchase.orderDate)}
					</P>
				</div>
				<div className="tw:!text-right">
					<P className="tw:!text-xs tw:!text-gray-500">Total</P>
					<H6 color="primary">{formatCurrency(d.price.total)}</H6>
				</div>
			</div>

			{/* Body */}
			<div className="tw:!mt-4 tw:!flex tw:!items-center tw:!gap-4">
				<div className="tw:!w-28 tw:!h-20 tw:!rounded-xl tw:!overflow-hidden tw:!bg-gray-100 tw:!border tw:!border-gray-200">
					<img
						src={withBasePath(purchase.image)}
						alt={purchase.vehicle}
						className="tw:!w-full tw:!h-full tw:!object-cover"
					/>
				</div>

				<div className="tw:!flex-1 tw:!min-w-0">
					<H6 className="tw:!mb-0.5 tw:!truncate">{purchase.vehicle}</H6>
					<div className="tw:!grid tw:!grid-cols-2 tw:!gap-2">
						<Info label="Mulai" value={formatDate(d.startDate)} />
						<Info label="Ambil" value={d.pickupLocation} />
					</div>
				</div>

				<button
					onClick={() => setOpen((v) => !v)}
					className="tw:!shrink-0 tw:!h-9 tw:!px-3 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!font-medium tw:!text-gray-700 hover:tw:!bg-gray-50 tw:!transition"
					aria-expanded={open}
				>
					{open ? "Sembunyikan" : "Detail"}
				</button>
			</div>

			{/* Expandable */}
			{open && (
				<div className="tw:!mt-4 tw:!pt-4 tw:!border-t tw:!border-gray-100">
					{/* Primary facts */}
					<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-3 tw:!gap-3">
						<Info label="Tanggal Mulai" value={formatDate(d.startDate)} />
						<Info label="Tanggal Selesai" value={formatDate(d.endDate)} />
						<Info label="Durasi" value={d.duration} />
						<Info label="Pengambilan" value={d.pickupLocation} />
						<Info label="Pengembalian" value={d.dropoffLocation} />
						<Info label="Metode Pembayaran" value={d.paymentMethod} />
						<Info label="Operator" value={d.provider} />
						<Info label="Waktu Berangkat" value={d.departureTime} />
						<Info label="Waktu Kembali" value={d.returnTime} />
						{d.driverName && <Info label="Pengemudi" value={d.driverName} />}
						{d.driverContact && (
							<Info label="Kontak Pengemudi" value={d.driverContact} />
						)}
						{d.voucherCode && <Info label="Voucher" value={d.voucherCode} />}
						{d.passengers && (
							<Info label="Total Penumpang" value={d.passengers} />
						)}
					</div>

					{/* Passengers & seats */}
					{d.passengerList?.length ? (
						<div className="tw:!mt-3">
							<P className="tw:!text-xs tw:!text-gray-500 tw:!mb-1.5">
								Daftar Penumpang
							</P>
							<div className="tw:!flex tw:!flex-wrap tw:!gap-2">
								{d.passengerList.map((ps, idx) => (
									<span
										key={idx}
										className="tw:!px-2.5 tw:!py-1 tw:!text-xs tw:!rounded-full tw:!bg-gray-100 tw:!border tw:!border-gray-200"
									>
										{ps.name}
										{ps.seat ? ` • Kursi ${ps.seat}` : ""}
									</span>
								))}
							</div>
						</div>
					) : null}

					{/* Add-ons */}
					{d.addOns.length > 0 && (
						<div className="tw:!mt-3">
							<P className="tw:!text-xs tw:!text-gray-500 tw:!mb-1.5">
								Layanan Tambahan
							</P>
							<div className="tw:!flex tw:!flex-wrap tw:!gap-2">
								{d.addOns.map((s, i) => (
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

					{/* Price breakdown */}
					<div className="tw:!mt-4 tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-gray-50 tw:!p-3">
						<P className="tw:!text-xs tw:!text-gray-500 tw:!mb-2">
							Rincian Harga
						</P>
						<div className="tw:!space-y-1.5">
							<PriceLine label="Harga Dasar" value={d.price.base} />
							<PriceLine label="Biaya Layanan" value={d.price.serviceFee} />
							<PriceLine label="Asuransi" value={d.price.insurance} />
							<PriceLine label="Pajak" value={d.price.tax} />
							<PriceLine label="Diskon" value={d.price.discount} negative />
							<div className="tw:!border-t tw:!border-gray-200 tw:!my-2" />
							<PriceLine label="Total" value={d.price.total} bold />
						</div>
					</div>

					{/* Policy & notes */}
					{(d.cancellationPolicy || d.notes) && (
						<div className="tw:!mt-3 tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-3">
							{d.cancellationPolicy && (
								<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-white tw:!p-3">
									<P className="tw:!text-xs tw:!text-gray-500 tw:!mb-1">
										Kebijakan Pembatalan
									</P>
									<P className="tw:!text-sm">{d.cancellationPolicy}</P>
								</div>
							)}
							{d.notes && (
								<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-white tw:!p-3">
									<P className="tw:!text-xs tw:!text-gray-500 tw:!mb-1">
										Catatan
									</P>
									<P className="tw:!text-sm">{d.notes}</P>
								</div>
							)}
						</div>
					)}

					{/* Actions */}
					<div className="tw:!mt-4 tw:!flex tw:!flex-wrap tw:!justify-end tw:!gap-2">
						{/* <Link
							href="/contact"
							className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-gray-700 hover:tw:!bg-gray-50"
						>
							Bantuan
						</Link> */}

						{purchase.status === "confirmed" && (
							<>
								<Link
									href="#"
									className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!bg-primary-600 tw:!text-white hover:tw:!bg-primary-700"
								>
									Lihat E-Tiket
								</Link>
								{/* <Link
									href="#"
									className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!border tw:!border-primary-200 tw:!text-primary-700 hover:tw:!bg-primary-50"
								>
									Unduh Voucher
								</Link> */}
							</>
						)}

						{purchase.status === "awaiting" && (
							<>
								<Link
									href="#"
									className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!bg-primary-600 tw:!text-white hover:tw:!bg-primary-700"
								>
									Selesaikan Pembayaran
								</Link>
								<Link
									href="#"
									className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-gray-700 hover:tw:!bg-gray-50"
								>
									Ubah Jadwal
								</Link>
							</>
						)}

						{purchase.status === "canceled" && (
							<Link
								href="#"
								className="tw:!px-3 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-gray-700 hover:tw:!bg-gray-50"
							>
								Kebijakan Refund
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

// ---------- Controls ----------
const FilterChip = <T extends string>({
	current,
	setCurrent,
	label,
	value,
}: {
	current: T;
	setCurrent: (v: T) => void;
	label: string;
	value: T;
}) => {
	const active = current === value;
	return (
		<button
			onClick={() => setCurrent(value)}
			className={`tw:!px-3 tw:!py-1.5 tw:!text-sm tw:!rounded-full tw:!border tw:!transition ${
				active
					? "tw:!bg-primary-50 tw:!text-primary-700 tw:!border-primary-200"
					: "tw:!bg-white tw:!text-gray-700 tw:!border-gray-300 hover:tw:!bg-gray-50"
			}`}
			aria-pressed={active}
		>
			{label}
		</button>
	);
};

// ---------- Page ----------
const RiwayatPembelianPage = () => {
	const [activeTab, setActiveTab] = useState(0); // 0: Semua, 1: Car Rental, 2: Shuttle Bus, 3: Bus
	const [statusFilter, setStatusFilter] = useState<"all" | PurchaseStatus>(
		"all"
	);
	const [search, setSearch] = useState("");

	const tabs = ["Semua", "Car Rental", "Shuttle Bus", "Bus"];

	const filtered = useMemo(() => {
		const type: PurchaseType | "all" =
			activeTab === 1
				? "Car Rental"
				: activeTab === 2
					? "Shuttle Bus"
					: activeTab === 3
						? "Bus"
						: "all";

		let list = [...dummyPurchases];

		if (type !== "all") list = list.filter((p) => p.type === type);
		if (statusFilter !== "all")
			list = list.filter((p) => p.status === statusFilter);

		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter(
				(p) =>
					p.id.toLowerCase().includes(q) ||
					p.vehicle.toLowerCase().includes(q) ||
					p.type.toLowerCase().includes(q) ||
					p.details.provider?.toLowerCase().includes(q)
			);
		}

		// newest first
		list.sort((a, b) => +new Date(b.orderDate) - +new Date(a.orderDate));
		return list;
	}, [activeTab, statusFilter, search]);

	return (
		<Layout footerStyle={1}>
			<CustomHeaders
				title="Riwayat Pembelian"
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Riwayat Pembelian" },
				]}
			/>
			{/* <JumbotronHeader
				title="Riwayat Pembelian"
				subtitle="Lihat semua pesanan Car Rental, Shuttle Bus, dan Bus Anda"
				bannerImg={"/assets/imgs/page-header/banner.png"}
				breadcrumbs={[
					{ label: "Home", href: "/", isActive: false },
					{
						label: "Riwayat Pembelian",
						href: "/riwayat-pembelian",
						isActive: true,
					},
				]}
			/> */}

			<div className="tw:!bg-white">
				<div className="tw:!container tw:!mx-auto tw:!px-4 tw:!py-8">
					<div className="tw:!mx-auto tw:!w-full tw:!max-w-3xl">
						{/* Controls */}
						<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5 tw:!mb-4">
							<div className="tw:!flex tw:!flex-col tw:!gap-4">
								<div className="tw:!flex tw:!items-center tw:!justify-between">
									<H3 color="dark" className="tw:!text-lg md:tw:!text-xl">
										Riwayat Pesanan
									</H3>
								</div>

								<SegmentedTabs
									active={activeTab}
									setActive={setActiveTab}
									tabs={tabs}
								/>

								<div className="tw:!flex tw:!flex-col md:tw:!flex-row tw:!gap-3">
									{/* Search */}
									<div className="tw:!relative tw:!flex-1">
										<input
											type="text"
											placeholder="Cari ID, kendaraan, operator…"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											className="tw:!w-full tw:!pl-10 tw:!pr-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent tw:!bg-white"
										/>
										<svg
											className="tw:!absolute tw:!left-3 tw:!top-1/2 tw:!-translate-y-1/2 tw:!text-gray-400"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle
												cx="11"
												cy="11"
												r="8"
												stroke="currentColor"
												strokeWidth="2"
											/>
											<path
												d="M21 21L16.65 16.65"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</div>

									{/* Status chips */}
									<div className="tw:!flex tw:!items-center tw:!gap-2 tw:!flex-wrap">
										<FilterChip
											current={statusFilter}
											setCurrent={setStatusFilter}
											label="Semua Status"
											value="all"
										/>
										<FilterChip
											current={statusFilter}
											setCurrent={setStatusFilter}
											label="Berhasil"
											value="confirmed"
										/>
										<FilterChip
											current={statusFilter}
											setCurrent={setStatusFilter}
											label="Menunggu"
											value="awaiting"
										/>
										<FilterChip
											current={statusFilter}
											setCurrent={setStatusFilter}
											label="Dibatalkan"
											value="canceled"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* List */}
						<div className="tw:!space-y-3">
							{filtered.length > 0 ? (
								filtered.map((p) => <PurchaseCard key={p.id} purchase={p} />)
							) : (
								<EmptyState />
							)}
						</div>

						{/* Help */}
						<div className="tw:!mt-6 tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
							<H4 className="tw:!mb-3">Butuh bantuan?</H4>
							<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-3">
								<HelpCard
									href="/contact"
									title="Hubungi Customer Service"
									desc="Bantuan 24/7 untuk pesanan Anda"
									icon="phone"
								/>
								<HelpCard
									href="/faqs"
									title="FAQ"
									desc="Lihat pertanyaan yang sering diajukan"
									icon="help"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

const EmptyState = () => (
	<div className="tw:!text-center tw:!py-14 tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm">
		<img
			src={withBasePath("/assets/imgs/template/icons/empty-state.svg")}
			alt="Tidak ada pesanan"
			className="tw:!w-24 tw:!h-24 tw:!mx-auto tw:!mb-4"
		/>
		<H4>Tidak ada pesanan</H4>
		<P className="tw:!text-gray-500 tw:!mt-1">
			Coba ubah filter atau kata kunci pencarian
		</P>
	</div>
);

const HelpCard = ({
	href,
	title,
	desc,
	icon,
}: {
	href: string;
	title: string;
	desc: string;
	icon: "phone" | "help";
}) => (
	<Link
		href={href}
		className="tw:!flex tw:!items-center tw:!gap-3 tw:!p-4 tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-white hover:tw:!bg-gray-50 tw:!transition"
	>
		<div className="tw:!rounded-full tw:!bg-primary-100 tw:!p-3">
			{icon === "phone" ? (
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
					<path
						d="M15 3H9C7.9 3 7 3.9 7 5V19C7 20.1 7.9 21 9 21H15C16.1 21 17 20.1 17 19V5C17 3.9 16.1 3 15 3Z"
						stroke="#0095e1"
						strokeWidth="2"
					/>
					<path
						d="M12 18H12.01"
						stroke="#0095e1"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			) : (
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
					<path
						d="M9.1 9c.23-.67.7-1.23 1.3-1.59.61-.36 1.33-.49 2.03-.37.7.12 1.34.47 1.8.99.47.54.73 1.24.72 1.97 0 2-3 3-3 3M12 17H12.01M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10Z"
						stroke="#0095e1"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			)}
		</div>
		<div>
			<H6 color="primary" className="tw:!mb-0.5">
				{title}
			</H6>
			<P className="tw:!text-sm tw:!text-gray-500">{desc}</P>
		</div>
	</Link>
);

export default RiwayatPembelianPage;
