import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export interface SelectInputProps {
	label?: string;
	value: string;
	options: string[];
	onChange: (value: string) => void;
	className?: string;
	labelClassName?: string;
	dropdownClassName?: string;
	toggleClassName?: string;
	menuClassName?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
	label,
	value,
	options,
	onChange,
	className = "",
	labelClassName = "",
	dropdownClassName = "dropdown",
	toggleClassName = "btn btn-secondary dropdown-toggle btn-dropdown-search",
	menuClassName = "dropdown-menu",
}) => {
	return (
		<div className={className}>
			{label && <label className={labelClassName}>{label}</label>}
			<Dropdown className={dropdownClassName}>
				<Dropdown.Toggle
					as="div"
					className={toggleClassName}
					aria-expanded="false"
				>
					{value}
				</Dropdown.Toggle>
				<Dropdown.Menu as="ul" className={menuClassName}>
					{options.map((option) => (
						<Dropdown.Item key={option} onClick={() => onChange(option)}>
							{option}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default SelectInput;
