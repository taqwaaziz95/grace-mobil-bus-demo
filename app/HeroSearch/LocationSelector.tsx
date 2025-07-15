import SelectInput from "@/components/select-input";
import React from "react";

type LocationSelectorProps = {
	pickUpLocation: string;
	dropOffLocation: string;
	pickUpLocations: string[];
	dropOffLocations: string[];
	setPickUpLocation: (location: string) => void;
	setDropOffLocation: (location: string) => void;
	category: string;
};

export default function LocationSelector({
	pickUpLocation,
	dropOffLocation,
	pickUpLocations,
	dropOffLocations,
	setPickUpLocation,
	setDropOffLocation,
	category,
}: LocationSelectorProps) {
	return (
		<>
			<SelectInput
				label={category !== "harian" ? "Keberangkatan" : "Penjemputan"}
				value={pickUpLocation}
				options={pickUpLocations}
				onChange={setPickUpLocation}
				className="item-search"
			/>
			{category !== "harian" && category !== "bulanan" && (
				<SelectInput
					label="Tujuan"
					value={dropOffLocation}
					options={dropOffLocations}
					onChange={setDropOffLocation}
					className="item-search item-search-2"
				/>
			)}
		</>
	);
}
