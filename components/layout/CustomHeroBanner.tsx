import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface CustomHeroBannerProps {
	title?: string;
	subtitle?: string;
	backgroundImage?: string;
	kontakHref?: string;
	kontakLabel?: string;
	shuttleHref?: string;
	shuttleLabel?: string;
	rentHref?: string;
	rentLabel?: string;
}

export default function CustomHeroBanner({
	title = "Rencanakan Perjalanan",
	subtitle = "Tanpa Ribet, Pesan Sekarang!",
	backgroundImage = "/assets/imgs/cta/cta-2/background-2.png",
	kontakHref = "#",
	kontakLabel = "Kontak Kami",
	shuttleHref = "/book-shuttle",
	shuttleLabel = "Pesan Shuttle",
	rentHref = "/sewa-mobil",
	rentLabel = "Sewa Mobil",
}: CustomHeroBannerProps) {
	return (
		<section
			className="tw:!relative tw:!bg-cover tw:!bg-center tw:!text-white tw:!py-20 tw:!px-6"
			style={{ backgroundImage: `url('${backgroundImage}')` }}
		>
			<div className="tw:!max-w-7xl tw:!mx-auto tw:!flex tw:!flex-col md:tw:!flex-row tw:!items-center tw:!justify-between">
				{/* Left content over image */}
				<div className="tw:!max-w-xl tw:!z-10">
					<h1 className="tw:!text-3xl md:tw:!text-4xl tw:!text-[#0e2972] tw:text-center tw:!font-bold tw:!leading-tight">
						{title}
						<br />
						<span className="tw:!text-[#0e2972]">{subtitle}</span>
					</h1>

					{/* CTA Buttons */}
				</div>
				<div className="tw:!mt-6 tw:!flex tw:!flex-wrap tw:!gap-3 tw:!text-center">
					{/* Kontak Kami */}
					<Link
						href={kontakHref}
						className="tw:!inline-flex tw:!items-center tw:!bg-white tw:!text-sky-600 tw:!border tw:!border-sky-500 tw:!rounded-full tw:!px-5 tw:!py-2 tw:!text-sm tw:!font-semibold tw:hover:!bg-sky-500 tw:hover:!text-white tw:!transition"
					>
						{kontakLabel}
						<ArrowRight className="tw:!ml-2 tw:!w-4 tw:!h-4" />
					</Link>

					{/* Book Shuttle */}
					<a
						href={shuttleHref}
						className="tw:!inline-flex tw:!items-center tw:!bg-sky-500 tw:!text-white tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold tw:hover:!bg-sky-600 tw:!transition"
					>
						{shuttleLabel}
						<ArrowRight className="tw:!ml-2 tw:!w-4 tw:!h-4" />
					</a>

					{/* Rent Car */}
					<a
						href={rentHref}
						className="tw:!inline-flex tw:!items-center tw:!bg-yellow-400 tw:!text-black tw:!px-5 tw:!py-2 tw:!rounded-full tw:!text-sm tw:!font-semibold tw:hover:!bg-yellow-300 tw:!transition"
					>
						{rentLabel}
						<ArrowRight className="tw:!ml-2 tw:!w-4 tw:!h-4" />
					</a>
				</div>
				{/* No right content; image is already the background */}
			</div>
		</section>
	);
}
