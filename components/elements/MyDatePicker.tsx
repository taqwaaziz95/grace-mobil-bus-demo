'use client';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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

interface MyDatePickerProps {
	form?: boolean;
	value?: Date | null; // Controlled value
	onChange?: (date: Date | null) => void; // Callback to parent
}

export default function MyDatePicker({ form, value, onChange }: MyDatePickerProps) {
	const [internalDate, setInternalDate] = useState<Date>(new Date());
	const selectedDate = value || internalDate;

	const handleChange = (date: Date | null) => {
		setInternalDate(date || new Date());
		if (onChange) {
			onChange(date);
		}
	};

	return (
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
						gap: 5,
					}}
				>
					<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
						{"<"}
					</button>

					<select
						value={getYear(date)}
						onChange={({ target: { value } }) => changeYear(Number(value))}
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

					<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
						{">"}
					</button>
				</div>
			)}
			selected={selectedDate}
			onChange={handleChange}
			className={!form ? "search-input datepicker" : "form-control calendar-date"}
		/>
	);
}