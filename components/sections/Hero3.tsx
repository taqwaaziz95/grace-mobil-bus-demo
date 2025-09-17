"use client";
import { useEffect, useState } from "react";

import { swiperGroup1 } from "../../util/swiperOptions";
import RentFilter from "../elements/RentFilter";
import ShuttleFilter from "../elements/ShuttleFilter";
import ReusableSwiper from "../elements/ReusableSwiper";
import { H1 } from "../typography";
import Contact from "@/app/contact/page";
import ContactUsBannerCard from "../contact-us-banner-card";
import Layanan from "./Layanan";

export default function Hero3() {
	const [user, setUser] = useState<string | null>(null);
	const [isUserChecked, setIsUserChecked] = useState(false);

	useEffect(() => {
		// Check if user is logged in
		const loggedInUser = localStorage.getItem("username");
		if (loggedInUser) {
			setUser(loggedInUser);
		}
		setIsUserChecked(true);
	}, []);

	if (!isUserChecked) {
		return null; // or a loading spinner
	}

	const slides = [
		{
			key: "shuttle",
			content: (
				<div className="item-banner-slide banner-2 tw:!h-[1000px] tw:md:!h-[700px] tw:!relative">
					<div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center tw:!relative">
						<h1 className="color-white tw:!mb-12">Book Shuttle</h1>
						<ShuttleFilter />
					</div>
				</div>
			),
		},
		{
			key: "rental",
			content: (
				<div className="item-banner-slide banner-2 tw:!h-[1000px] tw:md:!h-[700px] tw:!relative">
					<div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center tw:!relative">
						<h1 className="color-white tw:!mb-12">Book Rental Mobil</h1>
						<RentFilter />
					</div>
				</div>
			),
		},
	];

	return (
		<section className="box-section block-banner-home3 position-relative tw:!px-0 tw:!py-0">
			<div className="container-banner-home3 position-relative tw:!px-0">
				<div className="box-swiper tw:!relative tw:!w-full tw:!px-0">
					<ReusableSwiper
						slides={slides}
						swiperProps={swiperGroup1}
						className="swiper-container swiper-group-1"
						showNavButtons
					/>
					{/* Responsive ContactUsBannerCard (uncomment if needed)
					<div
						className="tw:!absolute tw:!left-1/2 tw:!bottom-0 tw:!-translate-x-1/2 tw:!translate-y-1/2 tw:!z-30 tw:!w-full tw:!flex tw:!justify-center tw:!px-2 md:tw:!px-0"
						style={{ pointerEvents: "none" }}
					>
						<div style={{ pointerEvents: "auto", width: "100%", maxWidth: 700 }}>
							<ContactUsBannerCard />
						</div>
					</div>
					*/}
				</div>
			</div>
		</section>
	);
}
