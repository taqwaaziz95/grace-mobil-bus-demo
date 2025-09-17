"use client";
import React, { useMemo, useState } from "react";

export type Column<T> = {
	key: string;
	header: string;
	sortable?: boolean;
	align?: "left" | "center" | "right";
	widthClass?: string; // e.g. "tw:!w-24"
	render?: (row: T, globalIndex: number) => React.ReactNode;
	sortAccessor?: (row: T) => string | number | Date;
};

export type CustomTableProps<T> = {
	columns: Column<T>[];
	data: T[];
	pageSize?: number;
	initialSort?: { key: string; direction: "asc" | "desc" };
	searchable?: boolean;
	searchPlaceholder?: string;
	emptyState?: React.ReactNode;

	/** Row interactivity/expansion */
	rowKey?: (row: T, globalIndex: number) => string | number;
	renderExpanded?: (row: T, globalIndex: number) => React.ReactNode; // details area
	expandable?: boolean; // if true, whole row is clickable to toggle expansion
};

function defaultAccessor(v: any): string | number {
	if (v === null || v === undefined) return "";
	if (typeof v === "number") return v;
	if (v instanceof Date) return v.getTime();
	return String(v);
}

export default function CustomTable<T>({
	columns,
	data,
	pageSize = 10,
	initialSort,
	searchable = true,
	searchPlaceholder = "Cari…",
	emptyState,
	rowKey,
	renderExpanded,
	expandable = false,
}: CustomTableProps<T>) {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState<{
		key: string;
		direction: "asc" | "desc";
	} | null>(initialSort ?? null);
	const [expanded, setExpanded] = useState<Record<string | number, boolean>>(
		{}
	);

	const filtered = useMemo(() => {
		if (!search.trim()) return data;
		const q = search.toLowerCase();
		return data.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
	}, [data, search]);

	const sorted = useMemo(() => {
		if (!sort) return filtered;
		const col = columns.find((c) => c.key === sort.key);
		if (!col || !col.sortable) return filtered;
		const dir = sort.direction === "asc" ? 1 : -1;

		return [...filtered].sort((a, b) => {
			const av = col.sortAccessor
				? col.sortAccessor(a)
				: defaultAccessor((a as any)[col.key]);
			const bv = col.sortAccessor
				? col.sortAccessor(b)
				: defaultAccessor((b as any)[col.key]);

			const an = typeof av === "string" ? av.toString().toLowerCase() : av;
			const bn = typeof bv === "string" ? bv.toString().toLowerCase() : bv;

			if (an < (bn as any)) return -1 * dir;
			if (an > (bn as any)) return 1 * dir;
			return 0;
		});
	}, [filtered, sort, columns]);

	const total = sorted.length;
	const pageCount = Math.max(1, Math.ceil(total / pageSize));
	const safePage = Math.min(page, pageCount);
	const startIndex = (safePage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, total);
	const pageData = sorted.slice(startIndex, endIndex);

	const toggleSort = (key: string, enabled?: boolean) => {
		if (!enabled) return;
		setPage(1);
		setSort((prev) => {
			if (!prev || prev.key !== key) return { key, direction: "asc" };
			return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
		});
	};

	const onRowClick = (row: T, globalIndex: number) => {
		if (!expandable || !renderExpanded) return;
		const k = rowKey ? rowKey(row, globalIndex) : globalIndex;
		setExpanded((prev) => ({ ...prev, [k]: !prev[k] }));
	};

	return (
		<div className="tw:!bg-white ">
			{/* Top bar */}
			{searchable && (
				<div className="tw:!p-3 tw:!border-b tw:!border-gray-100">
					<div className="tw:!relative">
						<input
							value={search}
							onChange={(e) => {
								setPage(1);
								setSearch(e.target.value);
							}}
							placeholder={searchPlaceholder}
							className="tw:!w-full tw:!pl-10 tw:!pr-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
						/>
						<svg
							className="tw:!absolute tw:!left-3 tw:!top-1/2 tw:!-translate-y-1/2 tw:!text-gray-400"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								cx="11"
								cy="11"
								r="8"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path
								d="M21 21L16.65 16.65"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>
			)}

			{/* Table */}
			<div className="tw:!overflow-x-auto">
				<table className="tw:!min-w-full tw:!text-sm">
					<thead className="tw:!bg-gray-50">
						<tr>
							{columns.map((c) => {
								const isSorted = sort?.key === c.key;
								const dir = isSorted ? sort?.direction : undefined;
								return (
									<th
										key={c.key}
										scope="col"
										className={[
											"tw:!px-4 tw:!py-3 tw:!text-left tw:!font-semibold tw:!text-gray-700",
											c.align === "center" ? "tw:!text-center" : "",
											c.align === "right" ? "tw:!text-right" : "",
											c.widthClass ?? "",
											c.sortable
												? "tw:!cursor-pointer hover:tw:!bg-gray-100"
												: "",
										].join(" ")}
										onClick={() => toggleSort(c.key, c.sortable)}
										aria-sort={
											isSorted
												? dir === "asc"
													? "ascending"
													: "descending"
												: "none"
										}
									>
										<div className="tw:!inline-flex tw:!items-center tw:!gap-1">
											{c.header}
											{c.sortable && (
												<span className="tw:!text-gray-400 tw:!text-xs">
													{isSorted ? (dir === "asc" ? "▲" : "▼") : "↕"}
												</span>
											)}
										</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{pageData.length === 0 ? (
							<tr>
								<td colSpan={columns.length} className="tw:!px-4 tw:!py-8">
									{emptyState ?? (
										<div className="tw:!text-center tw:!text-gray-500">
											Tidak ada data
										</div>
									)}
								</td>
							</tr>
						) : (
							pageData.map((row, i) => {
								const globalIndex = startIndex + i;
								const k = rowKey ? rowKey(row, globalIndex) : globalIndex;
								const isOpen = !!expanded[k];
								return (
									<React.Fragment key={String(k)}>
										<tr
											onClick={() => onRowClick(row, globalIndex)}
											className={[
												"tw:!border-t tw:!border-gray-100",
												expandable
													? "tw:!cursor-pointer hover:tw:!bg-gray-50/60"
													: "",
												isOpen ? "tw:!bg-gray-50/70" : "",
											].join(" ")}
											title={expandable ? "Klik untuk lihat detail" : undefined}
											role={expandable ? "button" : undefined}
											aria-expanded={expandable ? isOpen : undefined}
										>
											{columns.map((c, cIdx) => (
												<td
													key={c.key + String(cIdx)}
													className={[
														"tw:!px-4 tw:!py-3 tw:!align-middle tw:!text-gray-800",
														c.align === "center" ? "tw:!text-center" : "",
														c.align === "right" ? "tw:!text-right" : "",
														c.widthClass ?? "",
													].join(" ")}
												>
													{c.render
														? c.render(row, globalIndex)
														: (row as any)[c.key]}
												</td>
											))}
										</tr>

										{expandable && renderExpanded && isOpen && (
											<tr className="tw:!border-t tw:!border-gray-100">
												<td colSpan={columns.length} className="tw:!p-0">
													<div className="tw:!px-4 tw:!py-4 tw:!bg-white">
														{renderExpanded(row, globalIndex)}
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{/* Footer */}
			<div className="tw:!flex tw:!items-center tw:!justify-between tw:!px-4 tw:!py-3 tw:!border-t tw:!border-gray-100">
				<div className="tw:!text-sm tw:!text-gray-600">
					{total === 0
						? "0 to 0 of 0 Entries"
						: `${startIndex + 1} to ${endIndex} of ${total} Entries`}
				</div>

				<div className="tw:!flex tw:!items-center tw:!gap-1">
					<button
						className="tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!text-gray-700 disabled:tw:!opacity-40 hover:tw:!bg-gray-50"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={safePage === 1}
					>
						Prev
					</button>
					{Array.from({ length: pageCount }).map((_, idx) => {
						const p = idx + 1;
						const active = p === safePage;
						return (
							<button
								key={p}
								onClick={() => setPage(p)}
								className={`tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!text-sm ${
									active
										? "tw:!bg-primary-600 tw:!text-black"
										: "tw:!border tw:!border-gray-300 tw:!text-gray-700 hover:tw:!bg-gray-50"
								}`}
							>
								{p}
							</button>
						);
					})}
					<button
						className="tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!text-gray-700 disabled:tw:!opacity-40 hover:tw:!bg-gray-50"
						onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
						disabled={safePage === pageCount}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
