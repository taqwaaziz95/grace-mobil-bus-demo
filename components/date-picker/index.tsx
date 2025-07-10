import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PickerType = "date" | "date-range-picker";

interface CustomDatePickerProps {
	selected: Date | null;
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
	const yearsList =
		years || Array.from({ length: 5 }, (_, i) => currentYear + i);

	// Default custom header if not provided
	const defaultHeader = ({
		date,
		changeYear,
		changeMonth,
		decreaseMonth,
		increaseMonth,
		prevMonthButtonDisabled,
		nextMonthButtonDisabled,
	}: import("react-datepicker").ReactDatePickerCustomHeaderProps): React.ReactElement => (
		<div
			style={{
				margin: 10,
				display: "flex",
				justifyContent: "center",
			}}
		>
			<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
				{"<"}
			</button>
			<select
				value={date.getFullYear()}
				onChange={({ target: { value } }) => changeYear(Number(value))}
			>
				{yearsList.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<select
				value={months[date.getMonth()]}
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
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
	);

	if (type === "date-range-picker") {
		return (
			<DatePicker
				selectsRange
				startDate={rangeValue ? rangeValue[0] : null}
				endDate={rangeValue ? rangeValue[1] : null}
				onChange={(update) => onChange(update)}
				minDate={minDate}
				maxDate={maxDate}
				todayButton={todayButton}
				dateFormat={dateFormat}
				renderCustomHeader={renderCustomHeader || defaultHeader}
				isClearable
				className="tw:!w-[225px] tw:!max-w-[300px] tw:!min-w-[200px] tw:!border-neutral-300 tw:!border-2 tw:!rounded-lg tw:!p-2 tw:!text-sm"
			/>
		);
	}
	return (
		<DatePicker
			selected={selected}
			onChange={(date) => onChange(date as Date | null)}
			minDate={minDate}
			maxDate={maxDate}
			startDate={startDate}
			endDate={endDate}
			selectsStart={selectsStart}
			selectsEnd={selectsEnd}
			todayButton={todayButton}
			dateFormat={dateFormat}
			renderCustomHeader={renderCustomHeader || defaultHeader}
		/>
	);

	// Usage Example for Date Range:
	//
	// const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
	// <CustomDatePicker
	//   type="date-range-picker"
	//   rangeValue={range}
	//   onChange={(update) => setRange(update as [Date | null, Date | null])}
	// />
};

export default CustomDatePicker;
