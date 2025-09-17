"use client";
import React from "react";

type CategoryButtonProps = {
	label: string;
	value: string;
	selectedValue: string;
	onSelect: (value: string) => void;
	className?: string;
};

export default function CategoryButton({
	label,
	value,
	selectedValue,
	onSelect,
	className = "",
}: CategoryButtonProps) {
	const isActive = selectedValue === value;

	return (
		<button
			className={`category-link text-sm-bold btn-click ${
				isActive ? "active" : ""
			} text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800 ${className}`}
			onClick={() => onSelect(value)}
		>
			{label}
		</button>
	);
}
