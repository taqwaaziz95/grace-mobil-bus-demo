import React, { useMemo, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown, Lock } from "lucide-react";

export interface SelectInputProps {
	label?: string;
	value: string;
	options?: { label: string; value: string; disabled?: boolean }[];
	onChange: (value: string) => void;
	className?: string;
	labelClassName?: string;
	dropdownClassName?: string;
	toggleClassName?: string;
	menuClassName?: string;
	disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
	label,
	value,
	options = [],
	onChange,
	className = "",
	labelClassName = "",
	dropdownClassName = "dropdown",
	toggleClassName = "",
	menuClassName = "",
	disabled = false,
}) => {
	const [open, setOpen] = useState(false);

	const selectedLabel = useMemo(
		() => options.find((o) => o.value === value)?.label ?? value,
		[options, value]
	);

	const handleToggle = (nextShow: boolean) => {
		if (disabled) return;
		setOpen(nextShow);
	};

	const handleSelect = (optValue: string, optDisabled?: boolean) => {
		if (disabled || optDisabled) return;
		onChange(optValue);
		setOpen(false);
	};

	return (
		<div className={`tw:!flex tw:!flex-col ${className}`}>
			{label && <label className={`tw:!mb-2 ${labelClassName}`}>{label}</label>}

			<Dropdown
				show={!disabled && open}
				onToggle={handleToggle}
				className={`${dropdownClassName}`}
			>
				<Dropdown.Toggle
					as="div"
					role="button"
					aria-expanded={!disabled && open}
					aria-haspopup="listbox"
					aria-disabled={disabled}
					tabIndex={disabled ? -1 : 0}
					onClick={(e: React.MouseEvent) => {
						if (disabled) {
							e.preventDefault();
							e.stopPropagation();
							return;
						}
						setOpen((s) => !s);
					}}
					className={`
            tw:!flex tw:!items-center tw:!justify-between tw:!w-full
            tw:!rounded-md tw:!bg-white tw:!px-4 tw:!py-2
            tw:!text-gray-700 tw:!font-normal tw:!border tw:!border-gray-200
            hover:tw:!bg-gray-50 focus:tw:!ring-2 focus:tw:!ring-blue-200
            ${disabled ? "tw:!opacity-60 tw:!cursor-not-allowed" : "tw:!cursor-pointer"}
            ${toggleClassName}
          `}
				>
					<span className="tw:!truncate tw:!flex tw:!items-center tw:!gap-2">
						{disabled && (
							<Lock className="tw:!w-3.5 tw:!h-3.5 tw:!text-gray-500" />
						)}
						{selectedLabel}
					</span>
					<ChevronDown className="tw:!w-4 tw:!h-4 tw:!text-gray-500" />
				</Dropdown.Toggle>

				<Dropdown.Menu
					as="ul"
					className={`
            tw:!mt-2 tw:!w-full tw:!bg-white
            tw:!rounded-xl tw:!shadow-[0_6px_12px_rgba(0,0,0,0.06)]
            tw:!p-2 tw:!border tw:!border-gray-100
            tw:!max-h-64 tw:!overflow-auto
            ${menuClassName}
          `}
				>
					{options.map((option) => {
						const isActive = option.value === value;
						const isDisabled = !!option.disabled;

						return (
							<Dropdown.Item
								as="li"
								key={option.value}
								onClick={() => handleSelect(option.value, isDisabled)}
								disabled={isDisabled}
								aria-disabled={isDisabled}
								aria-selected={isActive}
								className={`
                  tw:!py-2 tw:!px-3 tw:!rounded-lg tw:!text-gray-700 tw:!flex tw:!items-center tw:!gap-2
                  ${isDisabled ? "tw:!opacity-60 tw:!cursor-not-allowed" : "tw:!cursor-pointer hover:tw:!bg-gray-100"}
                  ${isActive ? "tw:!bg-gray-50" : ""}
                `}
							>
								{isDisabled && (
									<Lock className="tw:!w-3.5 tw:!h-3.5 tw:!text-gray-500" />
								)}
								<span className="tw:!truncate">{option.label}</span>
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default SelectInput;
