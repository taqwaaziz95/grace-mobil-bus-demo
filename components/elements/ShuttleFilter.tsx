"use client";
import { useEffect, useState } from "react";
import HeroSearch from "./HeroSearch";
import Button from "../button";
import { withBasePath } from "@/lib/basePath";

type Residence = { id: string; name: string; image?: string };

const RESIDENCES: Residence[] = [
	{
		id: "RES-01",
		name: "Alam Sutera",
		image: withBasePath("/assets/imgs/places/alam-sutera.png"),
	},
	{
		id: "RES-02",
		name: "Suvvana Sutera",
		image: withBasePath("/assets/imgs/places/suvvana.jpg"),
	},
	{
		id: "RES-03",
		name: "BSD City",
		image: withBasePath("/assets/imgs/places/bsd_city.webp"),
	},
	{
		id: "RES-04",
		name: "Gading Serpong",
		image: withBasePath("/assets/imgs/places/gading-serpong.webp"),
	},
	{
		id: "RES-05",
		name: "Karawaci",
		image: withBasePath("/assets/imgs/places/karawaci.jpg"),
	},
];

export default function ShuttleFilter({ category = "resident" }) {
	const [user, setUser] = useState<string | null>(null);
	const [isUserChecked, setIsUserChecked] = useState(false);

	useEffect(() => {
		const loggedInUser = localStorage.getItem("username");
		if (loggedInUser) setUser(loggedInUser);
		setIsUserChecked(true);
	}, []);

	const [selectedCategory, setSelectedCategory] = useState<string>(category);

	// Residence step for "resident" tab
	const [pickedResidence, setPickedResidence] = useState<Residence | null>(
		null
	);
	const [pendingChoice, setPendingChoice] = useState<string | null>(null);

	useEffect(() => {
		if (selectedCategory !== "resident") {
			setPendingChoice(null);
			// keep pickedResidence for nice UX when returning
		}
	}, [selectedCategory]);

	if (!isUserChecked) return null;

	return (
		<div className="box-search-advance background-card tw:!top-0">
			<div className="box-top-search">
				<div className="left-top-search tw:!flex tw:!gap-2 tw:!flex-wrap">
					<Button
						variant={selectedCategory === "resident" ? "primary" : "secondary"}
						size="small"
						onClick={() => setSelectedCategory("resident")}
						className={`${selectedCategory === "resident" ? "active" : ""}`}
					>
						Resident
					</Button>
					<Button
						variant={selectedCategory === "korporat" ? "primary" : "secondary"}
						size="small"
						onClick={() => setSelectedCategory("korporat")}
						className={`${selectedCategory === "korporat" ? "active" : ""}`}
					>
						Korporat
					</Button>
					<Button
						variant={
							selectedCategory === "antar-kota" ? "primary" : "secondary"
						}
						size="small"
						onClick={() => setSelectedCategory("antar-kota")}
						className={`${selectedCategory === "antar-kota" ? "active" : ""}`}
					>
						Antar Kota
					</Button>
					<Button
						variant={selectedCategory === "mall" ? "primary" : "secondary"}
						size="small"
						onClick={() => setSelectedCategory("mall")}
						className={`${selectedCategory === "mall" ? "active" : ""}`}
					>
						Shopping Mall
					</Button>
				</div>
			</div>

			{selectedCategory === "resident" && !pickedResidence ? (
				<div className="tw:!p-3 md:tw:!p-5 tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!bg-white tw:!shadow-sm tw:!mt-2">
					<div className="tw:!mb-3 tw:!flex tw:!flex-col md:tw:!flex-row tw:!items-start md:tw:!items-center tw:!justify-between">
						<div className="tw:!font-semibold">Pilih Kompleks / Residence</div>
					</div>

					{/* Responsive grid: 3 cols on mobile, 6 on desktop */}
					<div className="tw:!grid tw:!grid-cols-3 md:tw:!grid-cols-6 tw:!gap-2">
						{RESIDENCES.map((r) => {
							const checked = pendingChoice === r.id;
							return (
								<Button
									key={r.id}
									variant={checked ? "primary" : "secondary"}
									size="small"
									onClick={() => setPendingChoice(checked ? null : r.id)}
									aria-pressed={checked}
									className={`
                    tw:!relative tw:!overflow-hidden tw:!rounded-lg tw:!p-0
                    tw:!h-20 tw:!w-full tw:!border tw:!border-gray-200
                    tw:!transition tw:!duration-150 tw:!ease-out hover:tw:!scale-[1.005]
                    ${checked ? "tw:!ring-2 tw:!ring-primary-400 tw:!border-transparent" : ""}
                  `}
								>
									{/* background image layer */}
									<span
										className={`
            tw:!absolute tw:!inset-0 tw:!bg-center tw:!bg-cover tw:!bg-no-repeat
            ${r.image ? "" : "tw:!bg-gray-200"}
          `}
										style={
											r.image
												? { backgroundImage: `url(${r.image})` }
												: undefined
										}
										aria-hidden="true"
									/>

									{/* gradient overlay for legible text */}
									<span
										className="tw:!absolute tw:!inset-0 tw:!bg-gradient-to-t tw:!from-black/55 tw:!via-black/10 tw:!to-transparent"
										aria-hidden="true"
									/>

									{/* title */}
									<span className="tw:!relative tw:!z-[1] tw:!text-white tw:!text-[13px] tw:!font-medium tw:!px-2.5 tw:!py-2 tw:!w-full tw:!text-left tw:!flex tw:!items-end tw:!h-full">
										{r.name}
									</span>

									{/* check badge when selected (smaller) */}
									{checked && (
										<span className="tw:!absolute tw:!top-1.5 tw:!right-1.5 tw:!grid tw:!place-items-center tw:!w-5 tw:!h-5 tw:!rounded-full tw:!bg-white/90 tw:!text-gray-900 tw:!text-[12px] tw:!font-semibold">
											✓
										</span>
									)}
								</Button>
							);
						})}
					</div>

					<div className="tw:!mt-4 tw:!flex tw:!flex-col sm:tw:!flex-row tw:!justify-end tw:!gap-2">
						<Button
							variant="secondary"
							size="small"
							onClick={() => setPendingChoice(null)}
						>
							Reset
						</Button>
						<Button
							variant="primary"
							size="small"
							disabled={!pendingChoice}
							onClick={() => {
								const res =
									RESIDENCES.find((x) => x.id === pendingChoice) || null;
								setPickedResidence(res);
							}}
						>
							Pilih
						</Button>
					</div>
				</div>
			) : (
				<div>
					{selectedCategory === "resident" && pickedResidence && (
						<div className="tw:!mb-2 tw:!flex tw:!flex-row tw:!items-center tw:!justify-between tw:!mt-2">
							<div className="tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-3 tw:!py-1.5 tw:!rounded-full tw:!bg-blue-50 tw:!text-blue-700">
								<span className="tw:!text-sm">Kompleks:</span>
								<strong className="tw:!text-sm">{pickedResidence.name}</strong>
							</div>
							<button
								className="tw:!text-sm tw:!px-2.5 tw:!py-1.5 tw:!rounded-lg tw:!bg-white tw:!border tw:!border-gray-300 hover:tw:!bg-gray-50"
								onClick={() => {
									setPendingChoice(pickedResidence.id);
									setPickedResidence(null);
								}}
							>
								Ganti Kompleks
							</button>
						</div>
					)}

					<HeroSearch
						category={selectedCategory}
						initialPickUp={
							selectedCategory === "resident"
								? (pickedResidence?.name ?? undefined)
								: undefined
						}
						lockedResidence={
							selectedCategory === "resident"
								? (pickedResidence?.name ?? undefined)
								: undefined
						}
					/>
				</div>
			)}
		</div>
	);
}
