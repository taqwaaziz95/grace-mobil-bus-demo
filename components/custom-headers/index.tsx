"use client";
import Link from "next/link";
import React from "react";

type Breadcrumb = { label: string; href?: string };

type StatusType =
	| "live"
	| "success"
	| "info"
	| "warning"
	| "danger"
	| "neutral";

type CustomHeadersProps = {
	title: string;
	subtitle?: string;
	breadcrumbs?: Breadcrumb[];
	status?: { label: string; type?: StatusType };
	/** Override title gradient classes if needed */
	titleGradientClassName?: string;
	/** Extra classes for the white card wrapper */
	className?: string;
	/** Extra classes for the outer container */
	containerClassName?: string;
	/** Toggle the soft decorative glow */
	showGlow?: boolean;
	/** Right-side slot (e.g. buttons) */
	rightSlot?: React.ReactNode;
};

const statusStyles: Record<
	StatusType,
	{ pillBg: string; pillBorder: string; text: string; dot: string }
> = {
	live: {
		pillBg: "tw:!bg-sky-50",
		pillBorder: "tw:!border-sky-200",
		text: "tw:!text-sky-700",
		dot: "tw:!bg-green-500",
	},
	success: {
		pillBg: "tw:!bg-emerald-50",
		pillBorder: "tw:!border-emerald-200",
		text: "tw:!text-emerald-700",
		dot: "tw:!bg-emerald-500",
	},
	info: {
		pillBg: "tw:!bg-blue-50",
		pillBorder: "tw:!border-blue-200",
		text: "tw:!text-blue-700",
		dot: "tw:!bg-blue-500",
	},
	warning: {
		pillBg: "tw:!bg-amber-50",
		pillBorder: "tw:!border-amber-200",
		text: "tw:!text-amber-700",
		dot: "tw:!bg-amber-500",
	},
	danger: {
		pillBg: "tw:!bg-rose-50",
		pillBorder: "tw:!border-rose-200",
		text: "tw:!text-rose-700",
		dot: "tw:!bg-rose-500",
	},
	neutral: {
		pillBg: "tw:!bg-gray-50",
		pillBorder: "tw:!border-gray-200",
		text: "tw:!text-gray-700",
		dot: "tw:!bg-gray-400",
	},
};

export default function CustomHeaders({
	title,
	subtitle,
	breadcrumbs,
	status,
	titleGradientClassName = "tw:!bg-gradient-to-r tw:!from-sky-700 tw:!to-indigo-700",
	className = "",
	containerClassName = "",
	showGlow = true,
	rightSlot,
}: CustomHeadersProps) {
	const s = statusStyles[status?.type ?? "neutral"];

	return (
		<div className="tw:!bg-gradient-to-b tw:!from-sky-50 tw:!to-transparent">
			<div
				className={`tw:!container tw:!mx-auto tw:!px-4 tw:!pt-6 md:tw:!pt-8 ${containerClassName}`}
			>
				<div className="tw:!mx-auto tw:!w-full tw:!max-w-6xl">
					<div
						className={`tw:!relative tw:!overflow-hidden tw:!rounded-2xl tw:!border tw:!border-sky-100 tw:!bg-white tw:!p-6 md:tw:!p-8 tw:!mb-6 ${className}`}
					>
						{showGlow && (
							<div className="tw:!pointer-events-none tw:!absolute -tw:!top-10 tw:!right-0 tw:!h-48 tw:!w-48 tw:!rounded-full tw:!bg-sky-100 tw:!blur-3xl tw:!opacity-60" />
						)}

						{/* Top row */}
						<div className="tw:!mb-3 tw:!flex tw:!items-start tw:!justify-between tw:!gap-4">
							{/* Breadcrumbs */}
							{breadcrumbs?.length ? (
								<nav
									className="tw:!text-xs tw:!text-gray-500"
									aria-label="Breadcrumb"
								>
									{breadcrumbs.map((c, i) => {
										const isLast = i === breadcrumbs.length - 1;
										return (
											<span key={`${c.label}-${i}`}>
												{c.href && !isLast ? (
													<Link
														href={c.href}
														className="hover:tw:!text-sky-600"
													>
														{c.label}
													</Link>
												) : (
													<span className="tw:!text-gray-700 tw:!font-medium">
														{c.label}
													</span>
												)}
												{!isLast && <span className="tw:!mx-1.5">/</span>}
											</span>
										);
									})}
								</nav>
							) : (
								<span />
							)}

							{rightSlot ? (
								<div className="tw:!shrink-0">{rightSlot}</div>
							) : null}
						</div>

						{/* Status + Subtitle */}
						{(status || subtitle) && (
							<div className="tw:!mb-2 tw:!flex tw:!items-center tw:!gap-2">
								{status?.label && (
									<span
										className={`tw:!inline-flex tw:!items-center tw:!gap-1 tw:!rounded-full tw:!border ${s.pillBorder} ${s.pillBg} tw:!px-2.5 tw:!py-1 tw:!text-[11px] tw:!font-medium ${s.text}`}
									>
										<span
											className={`tw:!h-1.5 tw:!w-1.5 tw:!rounded-full ${s.dot} ${
												status?.type === "live" ? "tw:!animate-pulse" : ""
											}`}
										/>
										{status.label}
									</span>
								)}
								{subtitle && (
									<span className="tw:!text-[11px] tw:!text-gray-500">
										{subtitle}
									</span>
								)}
							</div>
						)}

						{/* Title */}
						<h1 className="tw:!text-2xl md:tw:!text-3xl tw:!font-bold tw:!tracking-tight">
							<span
								className={`${titleGradientClassName} tw:!bg-clip-text tw:!text-transparent`}
							>
								{title}
							</span>
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
