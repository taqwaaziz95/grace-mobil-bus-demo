"use client";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import CustomHeaders from "@/components/custom-headers";

const TrackPositionMap = dynamic(() => import("@/components/live-fleet-map"), {
	ssr: false,
});

export default function TrackPositionPage() {
	return (
		<Layout footerStyle={1}>
			<CustomHeaders
				title="Track Position"
				subtitle="Pantau posisi Shuttle Bus yang sedang bertugas secara realtime."
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Track Position" },
				]}
				status={{ label: "Live", type: "live" }}
				// Optional overrides:
				// titleGradientClassName="tw:!bg-gradient-to-r tw:!from-sky-700 tw:!to-indigo-700"
				// rightSlot={<button className="tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!text-sm">Help</button>}
			/>

			<div className="tw:!bg-gray-50">
				<div className="tw:!container tw:!mx-auto tw:!px-4 tw:!pb-8">
					<div className="tw:!mx-auto tw:!w-full tw:!max-w-6xl">
						<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
							<TrackPositionMap />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
