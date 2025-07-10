import React, { ReactNode, CSSProperties } from "react";

type GridProps = {
	children: ReactNode;
	rows?: number;
	cols?: number; // default: 1
	gap?: number | string; // default: 4 (Tailwind gap-4)
	className?: string; // Supports Tailwind and tw:! prefixed classes
	style?: CSSProperties; // Optional inline styles
	responsive?: {
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
		"2xl"?: number;
	};
};

const getColsClass = (prefix: string, cols?: number) =>
	cols ? `${prefix}:grid-cols-${cols}` : "";

const Grid = ({
	children,
	cols = 1,
	gap = 4,
	className = "",
	style,
	responsive = {},
	rows,
}: GridProps) => {
	const baseCols = `grid-cols-${cols}`;
	const gapClass = typeof gap === "number" ? `gap-${gap}` : `gap-[${gap}]`;
	const rowsClass = rows ? `grid-rows-${rows}` : "";
	const responsiveClasses = [
		getColsClass("sm", responsive.sm),
		getColsClass("md", responsive.md),
		getColsClass("lg", responsive.lg),
		getColsClass("xl", responsive.xl),
		getColsClass("2xl", responsive["2xl"]),
	]
		.filter(Boolean)
		.join(" ");
	return (
		<div
			className={`grid ${baseCols} ${rowsClass} ${gapClass} ${responsiveClasses} ${className}`}
			style={style}
		>
			{children}
		</div>
	);
};

export default Grid;
