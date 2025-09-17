"use client";
import React, { useEffect, useMemo, useState } from "react";
import SelectInput from "../select-input";
import { useRouter } from "next/navigation";
import { filter } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Button from "../button";

/* -- date utils -- */
function getMonth(date: any) {
	return moment(date).format("M");
}
function getYear(date: any) {
	return moment(date).format("YYYY");
}
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
const months = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

export default function HeroSearch({
	category = "",
	initialPickUp,
	lockedResidence, // NEW: lock a value (e.g., picked residence)
}: {
	category?: string;
	initialPickUp?: string;
	lockedResidence?: string;
}) {
	const router = useRouter();

	const [pickUpLocation, setPickUpLocation] = useState<string>(
		initialPickUp || "Central Park"
	);
	const [dropOffLocation, setDropOffLocation] =
		useState<string>("Pondok Indah");
	const [passengerType, setPassengerType] = useState("Warga");
	const [durasi, setDurasi] = useState("6 Bulan");

	const [startDateShuttle, setStartDateShuttle] = useState(new Date());
	const [endDateShuttle, setEndDateShuttle] = useState(new Date());
	const [startDateRent, setStartDateRent] = useState(new Date());
	const [endDateRent, setEndDateRent] = useState(new Date());

	const isShuttle =
		category !== "bandara" && category !== "harian" && category !== "bulanan";

	// build pick/drop options by category
	const basePickups = useMemo(() => {
		if (category === "antar-kota")
			return ["Jakarta", "Bandung", "Jogja", "Bali"];
		if (category === "bandara")
			return [
				"Bandar Udara Internasional Soekarno–Hatta",
				"Bandar Udara Internasional Halim Perdanakusuma",
				"Bandar Udara Internasional Jawa Barat Kertajati",
				"Bandar Udara Internasional Husein Sastranegara",
			];
		return [
			"Central Park",
			"Pondok Indah",
			"Kemang",
			"Menteng",
			"Kebayoran Baru",
			"Tebet",
			"Kelapa Gading",
			"Sudirman",
		];
	}, [category]);

	const baseDropoffs = useMemo(() => {
		if (category === "korporat")
			return ["PT Citra Abadi Sejati", "PT Solusi Integrasi Teknologi"];
		if (category === "antar-kota")
			return ["Jakarta", "Bandung", "Jogja", "Bali"];
		if (category === "mall")
			return [
				"Mall Pondok Indah",
				"Mall Bintaro Xchange",
				"Mall Gandaria City",
				"Mall Emporium Pluit",
			];
		return [
			"Central Park",
			"Pondok Indah",
			"Kemang",
			"Menteng",
			"Kebayoran Baru",
			"Tebet",
			"Kelapa Gading",
			"Sudirman",
		];
	}, [category]);

	// Put initialPickUp first in pickups
	const pickUpOptions = useMemo(() => {
		if (!initialPickUp) return basePickups;
		const rest = basePickups.filter((x) => x !== initialPickUp);
		return [initialPickUp, ...rest];
	}, [basePickups, initialPickUp]);

	// Ensure dropOff != pickup
	const dropOffOptions = useMemo(() => {
		return filter(baseDropoffs, (o: string) => o !== pickUpLocation);
	}, [baseDropoffs, pickUpLocation]);

	// Durasi list
	const durasiList = useMemo(() => {
		if (category === "harian") {
			return [
				"12 Jam",
				"18 Jam",
				"1 Hari",
				"2 Hari",
				"3 Hari",
				"4 Hari",
				"5 Hari",
				"6 Hari",
				"7 Hari",
				"8 Hari",
				"9 Hari",
				"10 Hari",
			];
		}
		return ["6 Bulan", "12 Bulan", "24 Bulan"];
	}, [category]);

	// reset defaults on category/options change
	useEffect(() => {
		const defaultPickup = initialPickUp || pickUpOptions[0];
		setPickUpLocation(defaultPickup);

		const firstDrop =
			dropOffOptions[0] ||
			baseDropoffs.find((x) => x !== defaultPickup) ||
			baseDropoffs[0];
		setDropOffLocation(firstDrop);

		setDurasi(durasiList[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category, initialPickUp, pickUpOptions.length, baseDropoffs.length]);

	// swap keberangkatan <-> tujuan
	const swapLocations = () => {
		setPickUpLocation((prevPickup) => {
			const prevDrop = dropOffLocation;
			setDropOffLocation(prevPickup);
			return prevDrop;
		});
	};

	// --- LOCK LOGIC: disable the select that matches the locked residence ---
	const lockPickup = !!lockedResidence && pickUpLocation === lockedResidence;
	const lockDrop = !!lockedResidence && dropOffLocation === lockedResidence;

	return (
		<div className="box-bottom-search background-card tw:!relative">
			{(category === "bulanan" || category === "harian") && (
				<SelectInput
					label="Durasi"
					labelClassName="text-sm-bold neutral-500"
					value={durasi}
					options={durasiList.map((d) => ({ label: d, value: d }))}
					onChange={setDurasi}
					className="item-search"
				/>
			)}

			{/* Keberangkatan + compact Swap + Tujuan */}
			{category !== "bulanan" && (
				<>
					{/* Keberangkatan / Penjemputan */}
					<SelectInput
						label={category !== "harian" ? "Keberangkatan" : "Penjemputan"}
						labelClassName="text-sm-bold neutral-500"
						value={pickUpLocation}
						options={pickUpOptions.map((d) => ({ label: d, value: d }))}
						onChange={setPickUpLocation}
						className="item-search tw:!pr-0 md:tw:!pr-0 tw:!max-w-[250px] tw:md:!w-[200px]"
						disabled={lockPickup}
					/>

					{/* Tiny swap button */}
					{category !== "harian" && (
						<div className="tw:!flex tw:!self-end">
							<button
								type="button"
								onClick={swapLocations}
								className="tw:md:!ml-6 tw:!w-10 tw:!h-10 tw:!rounded-full tw:!border tw:!border-gray-300 tw:!flex tw:!items-center tw:!justify-center hover:tw:!bg-gray-50 "
								aria-label="Tukar Keberangkatan & Tujuan"
								title="Tukar Keberangkatan & Tujuan"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
									<path
										d="M7 7h10M17 7l-3-3m3 3l-3 3"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M17 17H7m0 0l3-3m-3 3l3 3"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					)}

					{/* Tujuan */}
					{category !== "harian" && (
						<SelectInput
							label="Tujuan"
							labelClassName="text-sm-bold neutral-500"
							value={dropOffLocation}
							options={dropOffOptions.map((d) => ({ label: d, value: d }))}
							onChange={setDropOffLocation}
							className="item-search tw:!pr-0 md:tw:!pr-0 tw:!max-w-[250px] tw:md:!w-[200px]"
							disabled={lockDrop}
						/>
					)}
				</>
			)}

			{isShuttle && (
				<SelectInput
					label="Penumpang"
					labelClassName="text-sm-bold neutral-500"
					value={passengerType}
					options={[
						{ label: "Warga", value: "Warga" },
						{ label: "Non Warga", value: "Non Warga" },
					]}
					onChange={setPassengerType}
					className="item-search item-search-2"
				/>
			)}

			{/* Start date */}
			<div className="item-search item-search-3 tw:!w-full tw:!px-8 tw:md:!w-40 p-2">
				<label className="text-sm-bold neutral-500">
					{category === "antar-kota" ? "Berangkat" : "Dari Tanggal"}
				</label>
				<div className="box-calendar-date">
					<DatePicker
						renderCustomHeader={({
							date,
							changeYear,
							changeMonth,
							decreaseMonth,
							increaseMonth,
							prevMonthButtonDisabled,
							nextMonthButtonDisabled,
						}) => (
							<div
								style={{
									margin: 10,
									display: "flex",
									justifyContent: "center",
								}}
							>
								<button
									onClick={decreaseMonth}
									disabled={prevMonthButtonDisabled}
								>
									{"<"}
								</button>
								<select
									value={getYear(date)}
									onChange={({ target: { value } }) =>
										changeYear(Number(value))
									}
								>
									{years.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<select
									value={months[Number(getMonth(date)) - 1]}
									onChange={({ target: { value } }) =>
										changeMonth(months.indexOf(value))
									}
								>
									{months.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<button
									onClick={increaseMonth}
									disabled={nextMonthButtonDisabled}
								>
									{">"}
								</button>
							</div>
						)}
						minDate={new Date()}
						selected={isShuttle ? startDateShuttle : startDateRent}
						onChange={(date) =>
							isShuttle
								? date && setStartDateShuttle(date)
								: date && setStartDateRent(date)
						}
						selectsStart
						todayButton="Hari ini"
						dateFormat="dd/MM/yyyy"
						startDate={isShuttle ? startDateShuttle : startDateRent}
						endDate={isShuttle ? endDateShuttle : endDateRent}
					/>
				</div>
			</div>

			{/* End date */}
			{category !== "antar-kota" &&
				category !== "bulanan" &&
				category !== "harian" && (
					<div className="item-search tw:!w-full tw:!px-8 tw:md:!w-[200px] p-2">
						<label className="text-sm-bold neutral-500">Sampai Tanggal</label>
						<div className="box-calendar-date">
							<DatePicker
								renderCustomHeader={({
									date,
									changeYear,
									changeMonth,
									decreaseMonth,
									increaseMonth,
									prevMonthButtonDisabled,
									nextMonthButtonDisabled,
								}) => (
									<div style={{ display: "flex", justifyContent: "center" }}>
										<button
											onClick={decreaseMonth}
											disabled={prevMonthButtonDisabled}
										>
											{"<"}
										</button>
										<select
											value={getYear(date)}
											onChange={({ target: { value } }) =>
												changeYear(Number(value))
											}
										>
											{years.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
										<select
											value={months[Number(getMonth(date)) - 1]}
											onChange={({ target: { value } }) =>
												changeMonth(months.indexOf(value))
											}
										>
											{months.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
										<button
											onClick={increaseMonth}
											disabled={nextMonthButtonDisabled}
										>
											{">"}
										</button>
									</div>
								)}
								selected={isShuttle ? endDateShuttle : endDateRent}
								onChange={(date) =>
									isShuttle
										? date && setEndDateShuttle(date)
										: date && setEndDateRent(date)
								}
								maxDate={
									isShuttle
										? moment(startDateShuttle).add(9, "days").toDate()
										: moment(startDateRent).add(9, "days").toDate()
								}
								selectsEnd
								todayButton="Hari ini"
								dateFormat="dd/MM/yyyy"
								startDate={isShuttle ? startDateShuttle : startDateRent}
								endDate={isShuttle ? endDateShuttle : endDateRent}
								minDate={isShuttle ? startDateShuttle : startDateRent}
							/>
						</div>
					</div>
				)}

			{/* Search */}
			<div className="tw:!pr-6 tw:!pl-4 tw:!flex tw:!justify-center tw:!items-center tw:!h-full">
				<Button
					onClick={() => router.push("/search?category=" + category)}
					size="large"
				>
					<svg
						className="me-2"
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z"
							stroke="#000000"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="text-white">Cari</span>
				</Button>
			</div>
		</div>
	);
}
