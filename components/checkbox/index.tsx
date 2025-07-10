import React from "react";

type CheckboxColor =
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "danger"
	| "info"
	| "black"
	| "white"
	| "disabled";

type CheckboxProps = {
	label: string;
	name?: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	disabled?: boolean;
	color?: CheckboxColor;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const sizeClasses: Record<NonNullable<CheckboxProps["size"]>, string> = {
	xs: "tw:!h-3 tw:!w-3",
	sm: "tw:!h-4 tw:!w-4",
	md: "tw:!h-5 tw:!w-5",
	lg: "tw:!h-6 tw:!w-6",
	xl: "tw:!h-7 tw:!w-7",
};

const colorClasses: Record<CheckboxColor, string> = {
	primary: "tw:text-blue-600",
	secondary: "tw:text-gray-600",
	success: "tw:text-green-600",
	warning: "tw:text-yellow-600",
	danger: "tw:text-red-600",
	info: "tw:text-cyan-600",
	black: "tw:text-black",
	white: "tw:text-white",
	disabled: "tw:text-gray-400",
};

export const Checkbox = ({
	label,
	name,
	checked,
	onChange,
	className = "",
	disabled = false,
	color = "black",
	size = "sm",
}: CheckboxProps) => {
	return (
		<label
			className={`tw:!inline-flex tw:!items-center gap-2 ${className} ${colorClasses[disabled ? "disabled" : color]}`}
		>
			<input
				type="checkbox"
				name={name}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				className={sizeClasses[size]}
			/>
			<span className="tw:!ml-2">{label}</span>
		</label>
	);
};
