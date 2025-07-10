import React from "react";

type TextInputProps = {
	label: string;
	type?: string;
	className?: string;
	[key: string]: any;
};

const TextInput = ({
	label,
	type = "text",
	className = "",
	...props
}: TextInputProps) => {
	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm text-gray-700">{label}</label>
			<input
				type={type}
				className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
				{...props}
			/>
		</div>
	);
};

export default TextInput;
