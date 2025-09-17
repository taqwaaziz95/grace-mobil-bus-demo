import SelectInput from "@/components/select-input";
import React from "react";

type DurasiSelectorProps = {
	durasi: string;
	durasiList: Array<{ label: string; value: string }>;
	setDurasi: (value: string) => void;
};

export default function DurasiSelector({
	durasi,
	durasiList,
	setDurasi,
}: DurasiSelectorProps) {
	return (
		<SelectInput
			label="Durasi"
			value={durasi}
			options={durasiList.map((item) => item.value)}
			onChange={setDurasi}
			className="item-search"
		/>
	);
}
