import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PickerType = "date" | "date-range-picker";

interface CustomDatePickerProps {
	selected?: Date | null;
	onChange: (date: Date | null | [Date | null, Date | null]) => void;
	minDate?: Date;
	maxDate?: Date;
	startDate?: Date;
	endDate?: Date;
	selectsStart?: boolean;
	selectsEnd?: boolean;
	todayButton?: string;
	dateFormat?: string;
	years?: number[];
	months?: string[];
	renderCustomHeader?: (
		props: import("react-datepicker").ReactDatePickerCustomHeaderProps
	) => React.ReactElement;
	type?: PickerType;
	rangeValue?: [Date | null, Date | null];
}

const defaultMonths = [
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

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	selected,
	onChange,
	minDate,
	maxDate,
	startDate,
	endDate,
	selectsStart,
	selectsEnd,
	todayButton = "Hari ini",
	dateFormat = "dd/MM/yyyy",
	years,
	months = defaultMonths,
	renderCustomHeader,
	type = "date",
	rangeValue,
}) => {
	// Default years if not provided
	const currentYear = new Date().getFullYear();
	const yearsList = years || Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

	const defaultHeader = ({
		date,
		changeYear,
		changeMonth,
		decreaseMonth,
		increaseMonth,
		prevMonthButtonDisabled,
		nextMonthButtonDisabled,
	}: import("react-datepicker").ReactDatePickerCustomHeaderProps): React.ReactElement => (
		<div className="custom-header">
			{/* Previous Button */}
			<button
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
				aria-label="Previous Month"
				className="nav-btn"
			>
				<ChevronLeft size={20} strokeWidth={2.5} />
			</button>

			{/* Year Select */}
			<select
				className="header-select"
				value={date.getFullYear()}
				onChange={({ target: { value } }) => changeYear(Number(value))}
			>
				{yearsList.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>

			{/* Month Select */}
			<select
				className="header-select"
				value={months[date.getMonth()]}
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
			>
				{months.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>

			{/* Next Button */}
			<button
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
				aria-label="Next Month"
				className="nav-btn"
			>
				<ChevronRight size={20} strokeWidth={2.5} />
			</button>
		</div>
	);

	const commonProps = {
		minDate,
		maxDate,
		todayButton,
		dateFormat,
		renderCustomHeader: renderCustomHeader || defaultHeader,
		calendarClassName: "custom-datepicker", // For your CSS theme
	};

	if (type === "date-range-picker") {
		return (
			<DatePicker
				selectsRange
				startDate={rangeValue ? rangeValue[0] : null}
				endDate={rangeValue ? rangeValue[1] : null}
				onChange={(update) => onChange(update)}
				isClearable
				className="tw:!w-[225px] tw:!max-w-[300px] tw:!min-w-[200px] tw:!border-neutral-300 tw:!border-2 tw:!rounded-lg tw:!p-2 tw:!text-sm"
				{...commonProps}
			/>
		);
	}

	return (
		<DatePicker
			selected={selected}
			onChange={(date) => onChange(date as Date | null)}
			startDate={startDate}
			endDate={endDate}
			selectsStart={selectsStart}
			selectsEnd={selectsEnd}
			className="tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:p-2 tw:text-sm"
			{...commonProps}
		/>
	);
};

export default CustomDatePicker;