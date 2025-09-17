import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

type DateRangePickerProps = {
	isShuttle: boolean;
	startDate: Date | null;
	endDate: Date | null;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;
	years: number[];
	months: string[];
	category: string;
};

export default function DateRangePicker({
	isShuttle,
	startDate,
	endDate,
	setStartDate,
	setEndDate,
	years,
	months,
	category,
}: DateRangePickerProps) {
	interface GetMonthFn {
		(date: Date | null | undefined): string;
	}

	const getMonth: GetMonthFn = (date) => {
		return moment(date).format("M");
	};
	interface GetYearFn {
		(date: Date | null | undefined): string;
	}

	const getYear: GetYearFn = (date) => {
		return moment(date).format("YYYY");
	};
	return (
		<>
			<div className="item-search item-search-3">
				<label>
					{category === "antar-kota" ? "Berangkat" : "Dari Tanggal"}
				</label>
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
								onChange={(e) => changeYear(Number(e.target.value))}
							>
								{years.map((y) => (
									<option key={y}>{y}</option>
								))}
							</select>
							<select
								value={months[Number(getMonth(date)) - 1]}
								onChange={(e) => changeMonth(months.indexOf(e.target.value))}
							>
								{months.map((m) => (
									<option key={m}>{m}</option>
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
					selected={startDate}
					onChange={(date) => date && setStartDate(date)}
					minDate={new Date()}
					todayButton="Hari ini"
					dateFormat="dd/MM/yyyy"
				/>
			</div>
			{category !== "antar-kota" &&
				category !== "bulanan" &&
				category !== "harian" && (
					<div className="item-search item-search-3">
						<label>Sampai Tanggaxl</label>
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
										onChange={(e) => changeYear(Number(e.target.value))}
									>
										{years.map((y) => (
											<option key={y}>{y}</option>
										))}
									</select>
									<select
										value={months[Number(getMonth(date)) - 1]}
										onChange={(e) =>
											changeMonth(months.indexOf(e.target.value))
										}
									>
										{months.map((m) => (
											<option key={m}>{m}</option>
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
							selected={endDate}
							onChange={(date) => date && setEndDate(date)}
							minDate={startDate ?? undefined}
							maxDate={moment(startDate).add(9, "days").toDate()}
							selectsEnd
							todayButton="Hari ini"
							dateFormat="dd/MM/yyyy"
						/>
					</div>
				)}
		</>
	);
}
