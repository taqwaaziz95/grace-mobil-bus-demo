import SelectInput from "@/components/select-input";
import React from "react";

type PassengerSelectorProps = {
	passengerType: string;
	setPassengerType: (value: string) => void;
};

export default function PassengerSelector({
	passengerType,
	setPassengerType,
}: PassengerSelectorProps) {
	return (
		<SelectInput
			label="Penumpang"
			value={passengerType}
			options={["Warga", "Non Warga"]}
			onChange={setPassengerType}
			className="item-people-used"
		/>
	);
}
