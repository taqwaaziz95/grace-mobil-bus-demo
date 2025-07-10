// src/components/Typography.tsx

import React, { ReactNode } from "react";

interface TypographyProps {
	children: ReactNode;
	className?: string;
}

export const H1: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<h1 className={`tw:!text-4xl tw:!font-bold tw:!text-gray-900 ${className}`}>
		{children}
	</h1>
);

export const H2: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<h2
		className={`tw:!text-3xl tw:!font-semibold tw:!text-gray-900 ${className}`}
	>
		{children}
	</h2>
);

export const H3: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<h3
		className={`tw:!text-2xl tw:!font-semibold tw:!text-gray-900 ${className}`}
	>
		{children}
	</h3>
);

export const H4: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<h4 className={`tw:!text-xl tw:!font-medium tw:!text-gray-900 ${className}`}>
		{children}
	</h4>
);

export const H5: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<h5 className={`tw:!text-lg tw:!font-medium tw:!text-gray-900 ${className}`}>
		{children}
	</h5>
);

export const H6: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<h6
		className={`tw:!text-base tw:!font-medium tw:!text-gray-900 ${className}`}
	>
		{children}
	</h6>
);

export const P: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<p className={`tw:!text-base tw:!text-gray-700 ${className}`}>{children}</p>
);

export const Blockquote: React.FC<TypographyProps> = ({
	children,
	className = "",
}) => (
	<blockquote
		className={`tw:!border-l-4 tw:!border-blue-400 tw:!pl-4 tw:!italic tw:!text-gray-600 ${className}`}
	>
		{children}
	</blockquote>
);

export const Code: React.FC<TypographyProps> = ({
	children,
	className = "",
}) => (
	<code
		className={`tw:!bg-gray-100 tw:!px-2 tw:!py-1 tw:!rounded tw:!text-sm tw:!font-mono ${className}`}
	>
		{children}
	</code>
);

export const Pre: React.FC<TypographyProps> = ({
	children,
	className = "",
}) => (
	<pre
		className={`tw:!bg-gray-100 tw:!p-3 tw:!rounded tw:!overflow-x-auto tw:!text-sm tw:!font-mono ${className}`}
	>
		{children}
	</pre>
);

export const UL: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<ul
		className={`tw:!list-disc tw:!pl-6 tw:!text-base tw:!text-gray-700 ${className}`}
	>
		{children}
	</ul>
);

export const OL: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<ol
		className={`tw:!list-decimal tw:!pl-6 tw:!text-base tw:!text-gray-700 ${className}`}
	>
		{children}
	</ol>
);

export const LI: React.FC<TypographyProps> = ({ children, className = "" }) => (
	<li className={`${className}`}>{children}</li>
);

export const Caption: React.FC<TypographyProps> = ({
	children,
	className = "",
}) => (
	<span className={`tw:!text-xs tw:!text-gray-400 ${className}`}>
		{children}
	</span>
);
