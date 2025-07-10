// components/GridCards.tsx

"use client";

import React from "react";

export type GridItem = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

type GridCardsProps = {
	items: GridItem[];
	cols?: number; // 1,2,3,4
	gap?: number; // Tailwind gap-x-?
};

export default function GridCards({
	items,
	cols = 3,
	gap = 8,
}: GridCardsProps) {
	const colClasses: Record<number, string> = {
		1: "tw:grid-cols-1",
		2: "tw:grid-cols-1 tw:flex  sm:tw:grid-cols-2 ",
		3: "tw:grid-cols-1 tw:flex  sm:tw:grid-cols-2 md:tw:grid-cols-3",
		4: "tw:grid-cols-1 tw:flex  sm:tw:grid-cols-2 md:tw:grid-cols-4",
	};

	return (
		<div className={`tw:grid tw:!flex ${colClasses[cols]} tw:gap-${gap}`}>
			{items.map((item, index) => (
				<div
					key={index}
					className="tw:!bg-white tw:!shadow-lg tw:!py-8 tw:!px-6 tw:!rounded-3xl tw:!text-left tw:!flex tw:!items-center tw:!gap-6 tw:!transition-all tw:!duration-300 hover:tw:!shadow-2xl hover:tw:!scale-105 tw:!basis-full sm:tw:!basis-[45%] md:tw:!basis-[30%] tw:!max-w-[360px]"
				>
					<div className="tw:bg-blue-500 tw:text-white tw:p-4 tw:rounded-2xl tw:flex tw:items-center tw:justify-center tw:w-14 tw:h-14">
						{item.icon}
					</div>
					<div>
						<h3 className="tw:font-semibold tw:text-xl tw:mb-2 tw:text-gray-800">
							{item.title}
						</h3>
						<p className="tw:text-gray-600 tw:text-base">{item.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
