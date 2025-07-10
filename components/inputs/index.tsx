import React from "react";

// Reusable Input Props
export type InputSize = "sm" | "normal" | "lg";

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string;
	inputSize?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
	sm: "tw:!h-8", // Example: 2rem height
	normal: "tw:!h-10", // Example: 2.5rem height
	lg: "tw:!h-12", // Example: 3rem height
};

export const Input: React.FC<InputProps> = ({
	label,
	disabled,
	inputSize = "normal",
	...props
}) => (
	<div className="tw:mb-4">
		{label && (
			<label className="tw:block tw:text-sm tw:font-medium tw:text-neutral-800 tw:mb-1">
				{label}
			</label>
		)}
		<div className={`tw:!w-full ${sizeClasses[inputSize]}`}>
			<input
				className={`tw:!border tw:!border-gray-300 tw:!rounded tw:!w-full tw:!h-full tw:!px-3 tw:!text-base focus:tw:!outline-none focus:tw:!border-blue-500 ${disabled ? "tw:bg-neutral-100 tw:cursor-not-allowed" : ""}`}
				disabled={disabled}
				{...props}
			/>
		</div>
	</div>
);

// Reusable MultiTextInput Props
export interface MultiTextInputProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	size?: InputSize;
}

export const MultiTextInput: React.FC<MultiTextInputProps> = ({
	label,
	disabled,
	size = "normal",
	...props
}) => (
	<div className="tw:mb-4">
		{label && (
			<label className="tw:block tw:text-sm tw:font-medium tw:text-neutral-800 tw:mb-1">
				{label}
			</label>
		)}
		<textarea
			className={`tw:!border tw:!border-gray-300 tw:!rounded tw:!w-full focus:tw:!outline-none focus:tw:!border-blue-500 ${sizeClasses[size]} ${disabled ? "tw:bg-neutral-100 tw:cursor-not-allowed" : ""}`}
			disabled={disabled}
			{...props}
		/>
	</div>
);

// Demo Component
export const InputDemo = () => (
	<div className="tw:!space-y-4">
		<h2 className="tw:!text-xl tw:!font-semibold">Input</h2>
		<Input placeholder="Type here..." />
		<Input placeholder="Small input" inputSize="sm" />
		<Input placeholder="Large input" inputSize="lg" />
		<h2 className="tw:!text-xl tw:!font-semibold">Input (Disabled)</h2>
		<Input placeholder="Disabled input" disabled />
		<h2 className="tw:!text-xl tw:!font-semibold">MultiTextInput</h2>
		<MultiTextInput placeholder="Type multiple lines..." rows={4} />
		<MultiTextInput placeholder="Small textarea" rows={2} size="sm" />
		<MultiTextInput placeholder="Large textarea" rows={6} size="lg" />
		<h2 className="tw:!text-xl tw:!font-semibold">MultiTextInput (Disabled)</h2>
		<MultiTextInput placeholder="Disabled textarea" rows={4} disabled />
	</div>
);
