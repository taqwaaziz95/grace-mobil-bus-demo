// components/Toggle.tsx
"use client";
import React, { useId, useState } from "react";

type ToggleBaseProps = {
	id?: string;
	name?: string;
	className?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	/** Controlled value (use with onChange) */
	checked?: boolean;
	/** Uncontrolled default value */
	defaultChecked?: boolean;
	onChange?: (v: boolean) => void;
	ariaLabel?: string;
};

const sizeMap = {
	sm: {
		track: "tw:!w-9 tw:!h-5",
		knob: "tw:!w-4 tw:!h-4",
		knobTranslateX: "tw:!translate-x-4",
	},
	md: {
		track: "tw:!w-11 tw:!h-6",
		knob: "tw:!w-5 tw:!h-5",
		knobTranslateX: "tw:!translate-x-5",
	},
	lg: {
		track: "tw:!w-14 tw:!h-8",
		knob: "tw:!w-7 tw:!h-7",
		knobTranslateX: "tw:!translate-x-6",
	},
};

export function Toggle({
	id,
	name,
	className = "",
	disabled = false,
	size = "md",
	checked,
	defaultChecked,
	onChange,
	ariaLabel,
}: ToggleBaseProps) {
	const autoId = useId();
	const inputId = id ?? autoId;

	const isControlled = typeof checked === "boolean";
	const [internalChecked, setInternalChecked] =
		useState<boolean>(!!defaultChecked);
	const isOn = isControlled ? (checked as boolean) : internalChecked;

	const handleToggle = (next: boolean) => {
		if (!isControlled) setInternalChecked(next);
		onChange?.(next);
	};

	const SZ = sizeMap[size];

	return (
		<label
			htmlFor={inputId}
			className={`tw:!inline-flex tw:!items-center tw:!cursor-pointer ${
				disabled ? "tw:!opacity-50 tw:!cursor-not-allowed" : ""
			} ${className}`}
		>
			<input
				id={inputId}
				name={name}
				type="checkbox"
				className="tw:!hidden"
				disabled={disabled}
				checked={isOn}
				onChange={(e) => handleToggle(e.target.checked)}
				aria-label={ariaLabel}
			/>
			<span
				role="switch"
				aria-checked={isOn}
				aria-disabled={disabled}
				className={[
					"tw:!relative tw:!rounded-full tw:!transition-colors tw:!duration-200 tw:!ease-in-out",
					"tw:focus:!outline-none tw:focus:!ring-2 tw:focus:!ring-emerald-300",
					SZ.track,
					isOn ? "tw:!bg-emerald-600" : "tw:!bg-gray-300",
				].join(" ")}
			>
				<span
					className={[
						"tw:!absolute tw:!top-0.5 tw:!left-0.5 tw:!rounded-full tw:!bg-white tw:!shadow",
						"tw:!transition-transform tw:!duration-200 tw:!ease-in-out",
						SZ.knob,
						isOn ? SZ.knobTranslateX : "",
					].join(" ")}
				/>
			</span>
		</label>
	);
}

type ToggleRowProps = ToggleBaseProps & {
	title: string;
	desc?: string;
	/** Use this to swap in your <P> component if you want */
	TitleTag?: React.ElementType;
	DescTag?: React.ElementType;
};

export function ToggleRow({
	title,
	desc,
	TitleTag = "p",
	DescTag = "p",
	...toggleProps
}: ToggleRowProps) {
	return (
		<div className="tw:!flex tw:!items-center tw:!justify-between tw:!gap-3 tw:!py-2">
			<div className="tw:!min-w-0">
				<TitleTag className="tw:!text-sm tw:!font-medium tw:!truncate">
					{title}
				</TitleTag>
				{desc ? (
					<DescTag className="tw:!text-xs tw:!text-gray-500 tw:!mt-0.5 tw:!truncate">
						{desc}
					</DescTag>
				) : null}
			</div>
			<Toggle {...toggleProps} />
		</div>
	);
}

export default Toggle;
