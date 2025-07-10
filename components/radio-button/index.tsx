import React from "react";

type RadioButtonColor =
	| "primary"
	| "secondary"
	| "white"
	| "black"
	| "gray"
	| "accent"
	| "warning"
	| "danger"
	| "info"
	| "disabled";

const colorMap: Record<RadioButtonColor, string> = {
	primary: "tw:!text-blue-500 tw:!accent-blue-500",
	secondary: "tw:!text-gray-600 tw:!accent-gray-600",
	white: "tw:!text-white tw:!accent-white",
	black: "tw:!text-black tw:!accent-black",
	gray: "tw:!text-gray-300 tw:!accent-gray-300",
	accent: "tw:!text-black-600 tw:!accent-black-600",
	warning: "tw:!text-amber-600 tw:!accent-amber-600",
	danger: "tw:!text-red-500 tw:!accent-red-500",
	info: "tw:!text-cyan-500 tw:!accent-cyan-500",
	disabled: "tw:!text-gray-400 tw:!accent-gray-400",
};

type RadioButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<RadioButtonSize, string> = {
	xs: "tw:w-3 tw:h-3 tw:text-xs",
	sm: "tw:w-4 tw:h-4 tw:text-sm",
	md: "tw:w-5 tw:h-5 tw:text-base",
	lg: "tw:w-6 tw:h-6 tw:text-lg",
	xl: "tw:w-7 tw:h-7 tw:text-xl",
};

type RadioButtonProps = {
	label: string;
	name: string;
	value: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	disabled?: boolean;
	id?: string;
	color?: RadioButtonColor;
	size?: RadioButtonSize;
};

const RadioButton = ({
	label,
	name,
	value,
	checked,
	onChange,
	className = "",
	disabled = false,
	id,
	color = "primary",
	size = "md",
}: RadioButtonProps) => {
	const inputId = id || `${name}-${value}`;
	const colorClass = colorMap[color] || colorMap.primary;
	const sizeClass = sizeMap[size] || sizeMap.md;
	return (
		<div
			className={`tw:!inline-flex tw:!items-center tw:!gap-2 ${className} ${colorClass}`}
		>
			<label htmlFor={inputId}>
				<input
					id={inputId}
					type="radio"
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					className={`tw:!${colorClass} tw:!${sizeClass}`}
				/>
			</label>
			<span className="tw:!mb-2">{label}</span>
		</div>
	);
};

export default RadioButton;
