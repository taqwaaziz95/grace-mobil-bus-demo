"use client";
import { useEffect, useState } from "react";

import { swiperGroup1 } from "../../util/swiperOptions";
import RentFilter from "../elements/RentFilter";
import ShuttleFilter from "../elements/ShuttleFilter";
import ReusableSwiper from "../elements/ReusableSwiper";

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
				<div className="item-banner-slide banner-2 tw:!h-[600px]">
					<div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center">
						<h1 className="color-white tw:!mb-12 tw:!z-1">Book Shuttle</h1>
						<ShuttleFilter />
					</div>
				</div>
			),
		},
		{
			key: "rental",
			content: (
				<div className="item-banner-slide banner-2 tw:!h-[600px]">
					<div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center">
						<h1 className="color-white tw:!mb-12 tw:!z-1">Book Rental Mobil</h1>
						<RentFilter />
					</div>
				</div>
			),
		},
	];

	return (
		<section className="box-section block-banner-home3 position-relative">
			<div className="container-banner-home3 position-relative">
				<div className="box-swiper">
					<ReusableSwiper
						slides={slides}
						swiperProps={swiperGroup1}
						className="swiper-container swiper-group-1"
						showNavButtons
					/>
				</div>
			</div>
		</section>
	);
}
