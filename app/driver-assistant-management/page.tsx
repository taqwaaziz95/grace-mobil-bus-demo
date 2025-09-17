"use client";
import Layout from "@/components/layout/Layout";
import JumbotronHeader from "@/components/jumbotron-header";
import { H3, H4, H6, P } from "@/components/typography";
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import CustomHeaders from "@/components/custom-headers";

/* =========================
   Types & Templates
========================= */
type VehicleType = "Shuttle Bus";
type SeatStatus = "empty" | "occupied" | "reserved" | "blocked";

interface Seat {
	id: string; // e.g., "1A"
	row: number;
	col: string; // "A" | "B" | "C" | "D"
	side: "L" | "R";
}

interface LayoutTemplate {
	name: string;
	rows: number;
	leftCols: string[];
	rightCols: string[];
	note?: string;
}

const SHUTTLE_TEMPLATES: LayoutTemplate[] = [
	{
		name: "Hiace 2+1 (10 baris)",
		rows: 10,
		leftCols: ["A", "B"],
		rightCols: ["C"],
		note: "Umum untuk shuttle 15-seat",
	},
];

const BUS_TEMPLATES: LayoutTemplate[] = [
	{
		name: "Shuttle 2+2 (7 baris ≈ 28)",
		rows: 7,
		leftCols: ["A", "B"],
		rightCols: ["C", "D"],
		note: "Shuttle varian 25–30 kursi",
	},
	{
		name: "Shuttle 2+2 (10 baris = 40)",
		rows: 10,
		leftCols: ["A", "B"],
		rightCols: ["C", "D"],
		note: "Shuttle varian 40 kursi",
	},
];

/* =========================
   Helpers
========================= */
const formatPercent = (v: number) => `${Math.round(v * 100)}%`;

const genSeats = (tpl: LayoutTemplate): Seat[] => {
	const seats: Seat[] = [];
	for (let r = 1; r <= tpl.rows; r++) {
		for (const c of tpl.leftCols)
			seats.push({ id: `${r}${c}`, row: r, col: c, side: "L" });
		for (const c of tpl.rightCols)
			seats.push({ id: `${r}${c}`, row: r, col: c, side: "R" });
	}
	return seats;
};

const normalizeSeat = (raw: string) =>
	raw.trim().toUpperCase().replace(/\s+/g, "");

/* =========================
   Small UI Bits
========================= */
const SegmentedTabs = ({
	active,
	setActive,
	tabs,
}: {
	active: number;
	setActive: (i: number) => void;
	tabs: string[];
}) => (
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

const StatusLegend = () => (
	<div className="tw:!flex tw:!flex-wrap tw:!gap-3 tw:!justify-center">
		<LegendChip
			color="tw:!bg-gray-50 tw:!border-gray-300"
			dot="tw:!bg-gray-400"
			label="Kosong"
		/>
		<LegendChip
			color="tw:!bg-green-50 tw:!border-green-400"
			dot="tw:!bg-green-500"
			label="Terisi"
		/>
		<LegendChip
			color="tw:!bg-amber-50 tw:!border-amber-400"
			dot="tw:!bg-amber-500"
			label="Reservasi"
		/>
		<LegendChip
			color="tw:!bg-gray-200 tw:!border-gray-300"
			dot="tw:!bg-gray-500"
			label="Diblokir"
		/>
	</div>
);

const LegendChip = ({
	color,
	dot,
	label,
}: {
	color: string;
	dot: string;
	label: string;
}) => (
	<span
		className={`tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-2.5 tw:!py-1 tw:!rounded-full tw:!text-xs tw:!border ${color}`}
	>
		<span
			className={`tw:!inline-block tw:!w-2 tw:!h-2 tw:!rounded-full ${dot}`}
		/>
		{label}
	</span>
);

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

/* =========================
   Seat Status Modal
========================= */
function SeatStatusModal({
	seatId,
	current,
	onClose,
	onPick,
}: {
	seatId: string;
	current: SeatStatus;
	onClose: () => void;
	onPick: (st: SeatStatus) => void;
}) {
	return (
		<div className="tw:!fixed tw:!inset-0 tw:!z-[1000] tw:!flex tw:!items-center tw:!justify-center">
			<div
				className="tw:!absolute tw:!inset-0 tw:!bg-black/30"
				onClick={onClose}
			/>
			<div className="tw:!relative tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-xl tw:!w-full tw:!max-w-sm tw:!p-5">
				<H4 className="tw:!mb-2">Pilih Status Kursi</H4>
				<P className="tw:!text-sm tw:!text-gray-500 tw:!mb-4">
					Kursi <b>{seatId}</b> (sekarang: <i>{current}</i>)
				</P>

				<div className="tw:!grid tw:!grid-cols-2 tw:!gap-2">
					<button
						className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!bg-gray-50 hover:tw:!bg-gray-100"
						onClick={() => onPick("empty")}
					>
						Kosong
					</button>
					<button
						className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-green-400 tw:!bg-green-50 tw:!text-green-700 hover:tw:!bg-green-100"
						onClick={() => onPick("occupied")}
					>
						Terisi
					</button>
					<button
						className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-amber-400 tw:!bg-amber-50 tw:!text-amber-700 hover:tw:!bg-amber-100"
						onClick={() => onPick("reserved")}
					>
						Reservasi
					</button>
					<button
						className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!bg-gray-200 tw:!text-gray-600 hover:tw:!bg-gray-300"
						onClick={() => onPick("blocked")}
					>
						Diblokir
					</button>
				</div>

				<div className="tw:!mt-4 tw:!text-right">
					<button
						className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 hover:tw:!bg-gray-50"
						onClick={onClose}
					>
						Tutup
					</button>
				</div>
			</div>
		</div>
	);
}

/* =========================
   Seat Pill (opens modal)
========================= */
const SeatPill = ({
	seat,
	status,
	onClick,
	highlight = false,
	dim = false,
}: {
	seat: Seat;
	status: SeatStatus;
	onClick: (id: string) => void;
	highlight?: boolean;
	dim?: boolean;
}) => {
	const style =
		status === "occupied"
			? "tw:!bg-green-50 tw:!border-green-400 tw:!text-green-700"
			: status === "reserved"
				? "tw:!bg-amber-50 tw:!border-amber-400 tw:!text-amber-700"
				: status === "blocked"
					? "tw:!bg-gray-200 tw:!border-gray-300 tw:!text-gray-600"
					: "tw:!bg-gray-50 tw:!border-gray-300 tw:!text-gray-700";

	return (
		<button
			onClick={() => onClick(seat.id)}
			className={`tw:!w-10 tw:!h-10 md:tw:!w-11 md:tw:!h-11 tw:!rounded-lg tw:!border tw:!text-xs tw:!font-medium tw:!grid tw:!place-items-center tw:!transition ${style} ${
				highlight ? "tw:!ring-2 tw:!ring-primary-400" : "hover:tw:!shadow-sm"
			} ${dim ? "tw:!opacity-40" : ""}`}
			title={`Kursi ${seat.id} • ${status}`}
			aria-pressed={status !== "empty"}
		>
			{seat.id}
		</button>
	);
};

/* =========================
   Seat Map (centered)
========================= */
const SeatMap = ({
	seats,
	statusMap,
	onSeatClick,
	highlight,
	dimIds,
}: {
	seats: Seat[];
	statusMap: Record<string, SeatStatus>;
	onSeatClick: (id: string) => void;
	highlight?: string;
	dimIds?: Set<string>;
}) => {
	const rows = Math.max(...seats.map((s) => s.row));
	const leftCols = Array.from(
		new Set(seats.filter((s) => s.side === "L").map((s) => s.col))
	).sort();
	const rightCols = Array.from(
		new Set(seats.filter((s) => s.side === "R").map((s) => s.col))
	).sort();

	return (
		<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
			<div className="tw:!flex tw:!items-center tw:!justify-between tw:!mb-3">
				<H4 className="tw:!text-base">Peta Kursi</H4>
				<div className="tw:!text-xs tw:!text-gray-500 tw:!flex tw:!items-center tw:!gap-2">
					<span className="tw:!inline-block tw:!w-2 tw:!h-2 tw:!rounded-full tw:!bg-gray-400" />{" "}
					Depan kendaraan
				</div>
			</div>

			{/* Front bar */}
			<div className="tw:!h-2 tw:!rounded-full tw:!bg-gray-200 tw:!mb-4 tw:!mx-auto tw:!max-w-lg" />

			{/* Centered grid */}
			<div className="tw:!w-full tw:!flex tw:!justify-center">
				<div className="tw:!space-y-2 tw:!inline-block">
					{Array.from({ length: rows }).map((_, idx) => {
						const r = idx + 1;
						const leftSeats = leftCols.map(
							(c) => seats.find((s) => s.row === r && s.col === c)!
						);
						const rightSeats = rightCols.map(
							(c) => seats.find((s) => s.row === r && s.col === c)!
						);

						return (
							<div
								key={r}
								className="tw:!flex tw:!items-center tw:!gap-3 tw:!min-w-[320px]"
							>
								{/* Row label */}
								<div className="tw:!w-6 tw:!text-xs tw:!text-gray-500 tw:!text-right">
									{r}
								</div>

								{/* Left block */}
								<div className="tw:!flex tw:!gap-2">
									{leftSeats.map((seat) => (
										<SeatPill
											key={seat.id}
											seat={seat}
											status={statusMap[seat.id] ?? "empty"}
											onClick={onSeatClick}
											highlight={highlight === seat.id}
											dim={dimIds ? !dimIds.has(seat.id) : false}
										/>
									))}
								</div>

								{/* Aisle */}
								<div className="tw:!w-10" />

								{/* Right block */}
								<div className="tw:!flex tw:!gap-2">
									{rightSeats.map((seat) => (
										<SeatPill
											key={seat.id}
											seat={seat}
											status={statusMap[seat.id] ?? "empty"}
											onClick={onSeatClick}
											highlight={highlight === seat.id}
											dim={dimIds ? !dimIds.has(seat.id) : false}
										/>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="tw:!mt-4">
				<StatusLegend />
			</div>
		</div>
	);
};

/* =========================
   QR Generator (auto-rotate)
========================= */
function QrGeneratorPanel() {
	const [seed, setSeed] = React.useState<string>(() => makeSeed());

	function makeSeed() {
		// 8-char slug + minute bucket (rotates every 60s)
		const n = Math.random().toString(36).slice(2, 10).toUpperCase();
		const minute = Math.floor(Date.now() / 60000);
		return `GT-QR-${n}-${minute}`;
	}

	// rotate every 60s
	React.useEffect(() => {
		const id = setInterval(() => setSeed(makeSeed()), 60_000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5 tw:!text-center">
			<H4 className="tw:!mb-2">QR Check-In</H4>
			<P className="tw:!text-sm tw:!text-gray-600 tw:!mb-4">
				Tunjukkan QR ini ke penumpang untuk dipindai. Kode akan{" "}
				<b>berganti setiap 1 menit</b>.
			</P>

			<div className="tw:!flex tw:!items-center tw:!justify-center">
				<div className="tw:!p-4 tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!bg-gray-50">
					<QRCodeCanvas
						value={seed}
						size={192} // ~48 * 4
						level="M" // L / M / Q / H
						includeMargin
						bgColor="#ffffff"
						fgColor="#111827" // slate-900 feel
					/>
				</div>
			</div>

			<div className="tw:!mt-3 tw:!text-xs tw:!text-gray-500">
				Kode aktif:{" "}
				<code className="tw:!bg-gray-100 tw:!px-2 tw:!py-0.5 tw:!rounded">
					{seed}
				</code>
			</div>
		</div>
	);
}

/* =========================
   Scan panel (kept)
========================= */
const ScanPanel = ({ onDetect }: { onDetect: (seatId: string) => void }) => {
	const [open, setOpen] = useState(false);
	const [manual, setManual] = useState("");
	const videoRef = useRef<HTMLVideoElement>(null);
	const streamRef = useRef<MediaStream | null>(null);

	useEffect(() => {
		const start = async () => {
			if (!open) return;
			try {
				const stream = await navigator.mediaDevices?.getUserMedia?.({
					video: { facingMode: "environment" },
					audio: false,
				});
				if (videoRef.current && stream) {
					streamRef.current = stream;
					videoRef.current.srcObject = stream;
					await videoRef.current.play();
				}
			} catch {
				// ignore
			}
		};
		start();
		return () => {
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((t) => t.stop());
				streamRef.current = null;
			}
		};
	}, [open]);

	const submitManual = () => {
		if (!manual.trim()) return;
		onDetect(normalizeSeat(manual));
		setManual("");
	};

	return (
		<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
			<div className="tw:!flex tw:!items-center tw:!justify-between tw:!mb-3">
				<H4 className="tw:!text-base">Mode Pindai</H4>
				<button
					onClick={() => setOpen((v) => !v)}
					className="tw:!h-9 tw:!px-3 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!font-medium tw:!text-gray-700 hover:tw:!bg-gray-50"
				>
					{open ? "Tutup Kamera" : "Buka Kamera"}
				</button>
			</div>

			{open ? (
				<div className="tw:!rounded-xl tw:!overflow-hidden tw:!border tw:!border-gray-200 tw:!bg-black/5 tw:!mb-3">
					<video
						ref={videoRef}
						className="tw:!w-full tw:!h-56 tw:!object-cover"
						muted
						playsInline
					/>
				</div>
			) : (
				<P className="tw:!text-sm tw:!text-gray-600 tw:!mb-3">
					Gunakan kamera untuk scan kode kursi (mis. QR <code>12C</code>). Atau
					gunakan input manual.
				</P>
			)}

			<div className="tw:!flex tw:!gap-2">
				<input
					value={manual}
					onChange={(e) => setManual(e.target.value)}
					placeholder="Masukkan/scan kode kursi, mis. 12C"
					className="tw:!flex-1 tw:!px-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
				/>
				<button
					onClick={submitManual}
					className="tw:!px-4 tw:!py-2.5 tw:!rounded-xl tw:!bg-primary-600 tw:!text-white hover:tw:!bg-primary-700"
				>
					Tandai
				</button>
			</div>

			<P className="tw:!text-xs tw:!text-gray-500 tw:!mt-2">
				Ketuk kursi untuk memilih status (modal). Tidak ada multi-klik otomatis.
			</P>
		</div>
	);
};

/* =========================
   Main Page
========================= */
const ManagementAsistenPengemudiPage = () => {
	const [activeTab, setActiveTab] = useState(0); // 0: QR Generator, 1: Shuttle Bus
	const templates = activeTab === 1 ? BUS_TEMPLATES : SHUTTLE_TEMPLATES; // (we only use template when tab=1)
	const [tplIndex, setTplIndex] = useState(0);
	const tpl = templates[tplIndex];

	const baseSeats = useMemo(() => genSeats(tpl), [tpl]);
	const [statusMap, setStatusMap] = useState<Record<string, SeatStatus>>({});
	const [statusFilter, setStatusFilter] = useState<"all" | SeatStatus>("all");
	const [search, setSearch] = useState("");
	const [lastDetected, setLastDetected] = useState<string | null>(null);

	// Modal state (prevents multiple toggles)
	const [modalSeat, setModalSeat] = useState<string | null>(null);

	// Dim (not hide) non-matching seats so layout stays centered
	const dimIds = useMemo(() => {
		if (statusFilter === "all" && !search.trim()) return undefined;
		const q = search.trim().toUpperCase();
		return new Set(
			baseSeats
				.filter((s) => {
					const st = statusMap[s.id] ?? "empty";
					const statusOk = statusFilter === "all" || st === statusFilter;
					const searchOk = !q || s.id.includes(q);
					return statusOk && searchOk;
				})
				.map((s) => s.id)
		);
	}, [baseSeats, statusMap, statusFilter, search]);

	const metrics = useMemo(() => {
		const total = baseSeats.length;
		let occupied = 0,
			reserved = 0,
			blocked = 0;
		baseSeats.forEach((s) => {
			const st = statusMap[s.id] ?? "empty";
			if (st === "occupied") occupied++;
			if (st === "reserved") reserved++;
			if (st === "blocked") blocked++;
		});
		const empty = total - (occupied + reserved + blocked);
		const occRate = total ? occupied / total : 0;
		return { total, empty, occupied, reserved, blocked, occRate };
	}, [baseSeats, statusMap]);

	const setAll = (st: SeatStatus | "reset") => {
		if (st === "reset") {
			setStatusMap({});
			return;
		}
		setStatusMap(Object.fromEntries(baseSeats.map((s) => [s.id, st])));
	};

	const handleDetect = (raw: string) => {
		const seatId = normalizeSeat(raw);
		const exists = baseSeats.some((s) => s.id === seatId);
		setLastDetected(seatId);
		if (!exists) return;
		// set to occupied directly (human flow), not cycle
		setStatusMap((prev) => ({ ...prev, [seatId]: "occupied" }));
		setTimeout(
			() => setLastDetected((cur) => (cur === seatId ? null : cur)),
			2500
		);
	};

	const onSeatClick = (id: string) => {
		setModalSeat(id); // open modal only
	};

	const onPickSeatStatus = (st: SeatStatus) => {
		if (!modalSeat) return;
		setStatusMap((prev) => ({ ...prev, [modalSeat]: st }));
		setModalSeat(null);
	};

	// reset controls when template or tab changes
	useEffect(() => {
		setStatusMap({});
		setSearch("");
		setStatusFilter("all");
		setLastDetected(null);
		setModalSeat(null);
	}, [tplIndex, activeTab]);

	const blockedSeats = useMemo(
		() =>
			baseSeats
				.filter((s) => (statusMap[s.id] ?? "empty") === "blocked")
				.map((s) => s.id),
		[baseSeats, statusMap]
	);

	return (
		<Layout footerStyle={1}>
			{/* <JumbotronHeader
				title="Manajemen Asisten Pengemudi"
				subtitle="QR generator & pemetaan kursi shuttle"
				bannerImg={"/assets/imgs/page-header/banner.png"}
				breadcrumbs={[
					{ label: "Home", href: "/", isActive: false },
					{
						label: "Manajemen Asisten Pengemudi",
						href: "/management-asisten-pengemudi",
						isActive: true,
					},
				]}
			/> */}

			<CustomHeaders
				title="Driver Assistant Management"
				// subtitle="Pantau posisi Shuttle Bus yang sedang bertugas secara realtime."
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Driver Assistant Management" },
				]}
				// status={{ label: "Live", type: "live" }}
				// Optional overrides:
				// titleGradientClassName="tw:!bg-gradient-to-r tw:!from-sky-700 tw:!to-indigo-700"
				// rightSlot={<button className="tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!text-sm">Help</button>}
			/>

			<div className="tw:!bg-white">
				<div className="tw:!container tw:!py-4">
					<div className="tw:!mx-auto tw:!w-full tw:!max-w-3xl">
						{/* Tabs + Header Card */}
						<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5 tw:!mb-4">
							<div className="tw:!flex tw:!flex-col tw:!gap-4">
								<H3 color="dark" className="tw:!text-lg md:tw:!text-xl">
									{activeTab === 0
										? "QR Generator"
										: "Seat Management — Shuttle Bus"}
								</H3>

								<SegmentedTabs
									active={activeTab}
									setActive={setActiveTab}
									tabs={["QR Generator", "Shuttle Bus"]}
								/>

								{activeTab === 0 ? (
									<QrGeneratorPanel />
								) : (
									<>
										{/* Template select + metrics */}
										<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-3 tw:!gap-3">
											<div className="tw:!col-span-2 tw:!flex tw:!gap-2">
												<select
													value={tplIndex}
													onChange={(e) => setTplIndex(Number(e.target.value))}
													className="tw:!flex-1 tw:!px-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
												>
													{BUS_TEMPLATES.map((t, i) => (
														<option key={t.name} value={i}>
															{t.name}
														</option>
													))}
												</select>
												{BUS_TEMPLATES[tplIndex]?.note && (
													<div className="tw:!hidden md:tw:!block tw:!text-xs tw:!text-gray-500 tw:!self-center">
														{BUS_TEMPLATES[tplIndex].note}
													</div>
												)}
											</div>

											<div className="tw:!rounded-xl tw:!border tw:!border-gray-200 tw:!bg-gray-50 tw:!p-3">
												<div className="tw:!flex tw:!items-center tw:!justify-between tw:!mb-1">
													<P className="tw:!text-xs tw:!text-gray-500">
														Terisi
													</P>
													<P className="tw:!text-xs tw:!text-gray-500">
														{metrics.occupied}/{metrics.total}
													</P>
												</div>
												<div className="tw:!w-full tw:!h-2 tw:!rounded-full tw:!bg-gray-200 tw:!overflow-hidden">
													<div
														className="tw:!h-2 tw:!bg-primary-500"
														style={{ width: formatPercent(metrics.occRate) }}
													/>
												</div>
											</div>
										</div>

										{/* Search & status filter */}
										<div className="tw:!flex tw:!flex-col md:tw:!flex-row tw:!gap-3">
											<div className="tw:!relative tw:!flex-1">
												<input
													value={search}
													onChange={(e) => setSearch(e.target.value)}
													placeholder="Cari kursi (mis. 3A, 10C)"
													className="tw:!w-full tw:!pl-10 tw:!pr-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
												/>
												<svg
													className="tw:!absolute tw:!left-3 tw:!top-1/2 tw:!-translate-y-1/2 tw:!text-gray-400"
													width="18"
													height="18"
													viewBox="0 0 24 24"
													fill="none"
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

											<div className="tw:!flex tw:!items-center tw:!gap-2 tw:!flex-wrap">
												<FilterChip
													current={statusFilter}
													setCurrent={setStatusFilter}
													label="Semua"
													value="all"
												/>
												<FilterChip
													current={statusFilter}
													setCurrent={setStatusFilter}
													label="Kosong"
													value="empty"
												/>
												<FilterChip
													current={statusFilter}
													setCurrent={setStatusFilter}
													label="Terisi"
													value="occupied"
												/>
												<FilterChip
													current={statusFilter}
													setCurrent={setStatusFilter}
													label="Reservasi"
													value="reserved"
												/>
												<FilterChip
													current={statusFilter}
													setCurrent={setStatusFilter}
													label="Diblokir"
													value="blocked"
												/>
											</div>
										</div>

										{/* Bulk actions */}
										<div className="tw:!flex tw:!flex-wrap tw:!gap-2">
											<button
												onClick={() => setAll("reset")}
												className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!text-gray-700 hover:tw:!bg-gray-50"
											>
												Reset Semua
											</button>
											<button
												onClick={() => setAll("empty")}
												className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!text-gray-700 hover:tw:!bg-gray-50"
											>
												Tandai Semua Kosong
											</button>
											<button
												onClick={() => setAll("blocked")}
												className="tw:!px-3 tw:!py-2 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!text-gray-700 hover:tw:!bg-gray-50"
											>
												Blokir Semua
											</button>
											<span className="tw:!ml-auto tw:!text-sm tw:!text-gray-500">
												Total {metrics.total} • Kosong {metrics.empty} • Terisi{" "}
												{metrics.occupied} • Reservasi {metrics.reserved} •
												Diblokir {metrics.blocked}
											</span>
										</div>
									</>
								)}
							</div>
						</div>

						{/* When tab = Shuttle Bus: show seat map + scan panel + notice */}
						{activeTab === 1 && (
							<>
								{blockedSeats.length > 0 && (
									<div className="tw:!mb-4 tw:!rounded-xl tw:!border tw:!border-amber-200 tw:!bg-amber-50 tw:!p-4">
										<P className="tw:!text-sm tw:!text-amber-800">
											Beberapa kursi <b>diblokir</b> karena renovasi atau alasan
											keselamatan. Kursi:{" "}
											<span className="tw:!font-medium">
												{blockedSeats.join(", ")}
											</span>
										</P>
									</div>
								)}

								<SeatMap
									seats={baseSeats}
									statusMap={statusMap}
									onSeatClick={onSeatClick}
									highlight={lastDetected ?? undefined}
									dimIds={dimIds}
								/>

								<div className="tw:!mt-4">
									<ScanPanel onDetect={handleDetect} />
									{lastDetected && (
										<div className="tw:!mt-2 tw:!text-sm tw:!text-center">
											<span className="tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-2.5 tw:!py-1 tw:!rounded-full tw:!bg-primary-50 tw:!text-primary-700">
												Terakhir dipindai: <strong>{lastDetected}</strong>
											</span>
										</div>
									)}
								</div>
							</>
						)}

						{/* Help */}
						{/* <div className="tw:!mt-6 tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
							<H4 className="tw:!mb-3">Butuh bantuan?</H4>
							<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-3">
								<HelpCard
									href="/contact"
									title="Hubungi Customer Service"
									desc="Bantuan 24/7 untuk operasional armada"
									icon="phone"
								/>
								<HelpCard
									href="/faqs"
									title="FAQ"
									desc="Lihat pertanyaan yang sering diajukan"
									icon="help"
								/>
							</div>
						</div> */}
					</div>
				</div>
			</div>

			{/* Modal */}
			{modalSeat && (
				<SeatStatusModal
					seatId={modalSeat}
					current={statusMap[modalSeat] ?? "empty"}
					onClose={() => setModalSeat(null)}
					onPick={onPickSeatStatus}
				/>
			)}
		</Layout>
	);
};

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

export default ManagementAsistenPengemudiPage;
