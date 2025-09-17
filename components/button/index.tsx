import React from "react";
import { ArrowRight } from "lucide-react";

export type ButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
	disabled?: boolean;
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "danger"
		| "success"
		| "warning";
	size?: "small" | "medium" | "large";
	iconRight?: React.ReactNode;
	isRightIcon?: boolean;
	block?: boolean;
	label?: string;
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
	isRightIcon = false,
	block = false,
	label,
}) => {
	// === Variants ===
	const variantClasses: Record<string, string> = {
		primary: `
      tw:!bg-[#2A9FD6] tw:!text-white
      hover:tw:!bg-[#2389B9]
      tw:focus:!ring-2 tw:focus:!ring-[#C8E8F3]
      tw:!border-none
    `,
		secondary: `
      tw:!bg-gray-100 tw:!text-gray-800 tw:!border-none tw:!border-gray-300
      hover:tw:!bg-gray-200
      tw:focus:!ring-2 tw:focus:!ring-gray-200
    `,
		outline: `
      tw:!bg-transparent tw:!border-none tw:!border-[#2A9FD6] tw:!text-[#2A9FD6]
      hover:tw:!bg-[#E4F4FB]
      tw:focus:!ring-2 tw:focus:!ring-[#C8E8F3]
    `,
		danger: `
      tw:!bg-red-600 tw:!text-white
      hover:tw:!bg-red-700
      tw:focus:!ring-2 tw:focus:!ring-red-300
    `,
		success: `
      tw:!bg-emerald-600 tw:!text-white
      hover:tw:!bg-emerald-700
      tw:focus:!ring-2 tw:focus:!ring-emerald-300
    `,
		warning: `
      tw:!bg-amber-400 tw:!text-gray-900
      hover:tw:!bg-amber-500
      tw:focus:!ring-2 tw:focus:!ring-amber-200
    `,
	};

	// === Sizes ===
	const sizeClasses: Record<string, string> = {
		small: "tw:!px-4 tw:!py-1.5 tw:!text-sm",
		medium: "tw:!px-5 tw:!py-2 tw:!text-sm",
		large: "tw:!px-8 tw:!py-3 tw:!text-base",
	};

	const blockClass = block ? "tw:!w-full" : "";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
        tw:!inline-flex tw:!items-center tw:!justify-center tw:!rounded-full tw:!font-semibold tw:!transition tw:!duration-200 tw:!ease-in-out
        disabled:tw:!opacity-50 disabled:tw:!cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${blockClass} ${className}
      `}
		>
			{label && <span className="tw:!mr-2">{label}</span>}
			{children}
			{isRightIcon && iconRight}
		</button>
	);
};

// === Link Button ===
export type LinkButtonProps = {
	href: string;
	children?: React.ReactNode;
	className?: string;
	variant?: "primary" | "outline" | "success" | "warning";
	iconRight?: React.ReactNode;
	[key: string]: any;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
	href,
	children,
	className = "",
	variant = "primary",
	iconRight = <ArrowRight className="tw:!ml-2 tw:!w-4 tw:!h-4" />,
	...rest
}) => {
	const variantClasses: Record<string, string> = {
		primary: `
      tw:!inline-flex tw:!items-center tw:!bg-[#2A9FD6] tw:!text-white tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold
      hover:tw:!bg-[#2389B9] tw:!transition tw:!duration-200
    `,
		outline: `
      tw:!inline-flex tw:!items-center tw:!border-none tw:!border-[#2A9FD6] tw:!text-[#2A9FD6] tw:!bg-transparent
      tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold
      hover:tw:!bg-[#E4F4FB] tw:!transition tw:!duration-200
    `,
		success: `
      tw:!inline-flex tw:!items-center tw:!bg-emerald-600 tw:!text-white tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold
      hover:tw:!bg-emerald-700 tw:!transition tw:!duration-200
    `,
		warning: `
      tw:!inline-flex tw:!items-center tw:!bg-amber-400 tw:!text-gray-900 tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold
      hover:tw:!bg-amber-500 tw:!transition tw:!duration-200
    `,
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
