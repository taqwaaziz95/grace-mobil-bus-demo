export const Span: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<span className={`${getColorClass(color)} ${className}`}>{children}</span>
);
/**
 * Usage example:
 * <H1 color="primary">Primary Heading</H1>
 * <P color="secondary">Secondary paragraph</P>
 * <H6 color="dark">Dark heading</H6>
 * <Caption color="light">Light caption</Caption>
 */

import React, { ReactNode } from "react";

interface TypographyProps {
	children: ReactNode;
	className?: string;
	color?: "primary" | "secondary" | "dark" | "light" | string;
}

function getColorClass(color?: string) {
	switch (color) {
		case "primary":
			return "tw:!text-[#0095e1]";
		case "secondary":
			return "tw:!text-secondary-600";
		case "dark":
			return "tw:!text-gray-900";
		case "light":
			return "tw:!text-gray-400";
		case "white":
			return "tw:!text-white";
		default:
			return color ? color : "";
	}
}

export const H1: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<h1
		className={`tw:!text-4xl tw:!font-bold ${getColorClass(color)} ${className}`}
	>
		{children}
	</h1>
);

export const H2: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<h2
		className={`tw:!text-3xl tw:!font-semibold ${getColorClass(color)} ${className}`}
	>
		{children}
	</h2>
);

export const H3: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<h3
		className={`tw:!text-2xl tw:!font-semibold ${getColorClass(color)} ${className}`}
	>
		{children}
	</h3>
);

export const H4: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<h4
		className={`tw:!text-xl tw:!font-medium ${getColorClass(color)} ${className}`}
	>
		{children}
	</h4>
);

export const H5: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<h5
		className={`tw:!text-lg tw:!font-medium ${getColorClass(color)} ${className}`}
	>
		{children}
	</h5>
);

export const H6: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<h6
		className={`tw:!text-base tw:!font-medium ${getColorClass(color)} ${className}`}
	>
		{children}
	</h6>
);

export const P: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<p
		className={`tw:!text-base ${getColorClass(color) || "tw:!text-gray-700"} ${className}`}
	>
		{children}
	</p>
);

export const Blockquote: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<blockquote
		className={`tw:!border-l-4 tw:!border-blue-400 tw:!pl-4 tw:!italic ${getColorClass(color) || "tw:!text-gray-600"} ${className}`}
	>
		{children}
	</blockquote>
);

export const Code: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<code
		className={`tw:!bg-gray-100 tw:!px-2 tw:!py-1 tw:!rounded tw:!text-sm tw:!font-mono ${getColorClass(color)} ${className}`}
	>
		{children}
	</code>
);

export const Pre: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<pre
		className={`tw:!bg-gray-100 tw:!p-3 tw:!rounded tw:!overflow-x-auto tw:!text-sm tw:!font-mono ${getColorClass(color)} ${className}`}
	>
		{children}
	</pre>
);

export const UL: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<ul
		className={`tw:!list-disc tw:!pl-6 tw:!text-base ${getColorClass(color) || "tw:!text-gray-700"} ${className}`}
	>
		{children}
	</ul>
);

export const OL: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<ol
		className={`tw:!list-decimal tw:!pl-6 tw:!text-base ${getColorClass(color) || "tw:!text-gray-700"} ${className}`}
	>
		{children}
	</ol>
);

export const LI: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => <li className={`${getColorClass(color)} ${className}`}>{children}</li>;

export const Caption: React.FC<TypographyProps> = ({
	children,
	className = "",
	color,
}) => (
	<span
		className={`tw:!text-xs ${getColorClass(color) || "tw:!text-gray-400"} ${className}`}
	>
		{children}
	</span>
);
