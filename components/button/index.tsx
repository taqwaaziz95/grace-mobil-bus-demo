import React from "react";
import { ArrowRight } from "lucide-react";

// Button Props
export type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "danger";
	size?: "small" | "medium" | "large";
	iconRight?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	type = "button",
	className = "",
	disabled = false,
	variant = "primary",
	size = "medium",
	iconRight = <ArrowRight className="tw:!ml-2 tw:!w-4 tw:!h-4" />,
}) => {
	const variantClasses = {
		primary: "tw:!bg-blue-700 tw:!text-white hover:tw:!bg-blue-800",
		secondary: "tw:!bg-gray-700 tw:!text-white hover:tw:!bg-gray-800",
		danger: "tw:!bg-red-700 tw:!text-white hover:tw:!bg-red-800",
	};
	const sizeClasses = {
		small: "tw:!px-4 tw:!py-2 tw:!text-sm",
		medium: "tw:!px-5 tw:!py-2 tw:!text-sm",
		large: "tw:!px-8 tw:!py-3 tw:!text-base",
	};
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={`tw:inline-flex tw:items-center tw:rounded-full tw:font-semibold tw:transition disabled:tw:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "tw:!cursor-not-allowed" : ""} ${className}`}
		>
			{children}
			{iconRight}
		</button>
	);
};

// Reusable LinkButton Props
export type LinkButtonProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
	variant?: "white" | "sky" | "yellow";
	iconRight?: React.ReactNode;
	[key: string]: any;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
	href,
	children,
	className = "",
	variant = "white",
	iconRight = <ArrowRight className="tw:!ml-2 tw:!w-4 tw:!h-4" />,
	...rest
}) => {
	const variantClasses = {
		white:
			"tw:!inline-flex tw:!items-center tw:!bg-white tw:!text-sky-600 tw:!border tw:!border-sky-500 tw:!rounded-full tw:!px-5 tw:!py-2 tw:!text-sm tw:!font-semibold tw:hover:!bg-sky-500 tw:hover:!text-white tw:!transition",
		sky: "tw:!inline-flex tw:!items-center tw:!bg-sky-500 tw:!text-white tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold tw:hover:!bg-sky-600 tw:!transition",
		yellow:
			"tw:!inline-flex tw:!items-center tw:!bg-yellow-400 tw:!text-black tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold tw:hover:!bg-yellow-300 tw:!transition",
	};
	return (
		<a
			href={href}
			className={`${variantClasses[variant]} ${className}`}
			{...rest}
		>
			{children}
			{iconRight}
		</a>
	);
};

export default Button;
