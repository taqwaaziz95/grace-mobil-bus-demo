"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { swiperGroup1 } from "@/util/swiperOptions";
import HeroSearch from "../elements/HeroSearch";
import { useEffect, useState } from "react";

export default function Hero2() {
	const [user, setUser] = useState<string | null>(null);
	useEffect(() => {
		// Check if user is logged in
		const loggedInUser = localStorage.getItem("username");
		if (loggedInUser) {
			setUser(loggedInUser);
		}
	}, []);
	return (
		<>
			<section className="section-box box-banner-home7 background-body">
				<div className="container-banner-home7 position-relative">
					<div className="box-swiper">
						<Swiper
							{...swiperGroup1}
							className="swiper-container swiper-group-1"
						>
							<div className="swiper-wrapper">
								<SwiperSlide>
									<div className="item-banner-slide banner-1">
										<div className="container">
											<span className="btn background-brand-2 px-3 py-3 rounded-12 text-sm-bold text-white">
												+120 Premium Bus for you
											</span>
											<h1 className="mt-20 mb-20 color-white">
												Find your next journey today
											</h1>
											<h6 className="color-white heading-6-medium pb-lg-0 pb-4">
												Browse our diverse inventory and enjoy a seamless buying
												experience <br />
												with expert support every step of the way
											</h6>
											<span className="text-lg-medium color-white d-lg-none">
												Get 5% discount when{" "}
												<Link className="text-primary" href="#install-app">
													Ordering via APP
												</Link>
											</span>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className="item-banner-slide banner-2">
										<div className="container">
											<span className="btn background-brand-2 px-3 py-3 rounded-12 text-sm-bold text-white">
												Best Shuttle Bus Booking System
											</span>
											<h1 className="mt-20 mb-20 color-white">
												Discover your next ride today
											</h1>
											<h6 className="color-white heading-6-medium">
												Explore our wide selection and enjoy a smooth ride
												journey, <br />
												with expert assistance at every turn
											</h6>
										</div>
									</div>
								</SwiperSlide>
							</div>
						</Swiper>
					</div>
				</div>
				<div className="container-search-advance">
					<div className="container">
						<div className="box-search-advance background-card wow fadeInUp mb-5">
							<div className="box-top-search">
								<div className="left-top-search">
									<Link
										className="category-link text-sm-bold btn-click active text-white"
										href="#"
									>
										All Buses
									</Link>
								</div>
								{/* <div className="right-top-search d-none d-md-flex">
									<Link
										className="text-sm-medium need-some-help"
										href="/contact"
									>
										Need help?
									</Link>
								</div> */}
							</div>
							{user ? (
								<>
									<HeroSearch />
									<label>Saya dah login</label>
								</>
							) : (
								<HeroSearch />
							)}
						</div>
						<div className="align-items-center justify-content-between pt-40 d-none d-lg-flex">
							<span className="text-lg-medium color-white">
								Get 5% discount when{" "}
								<Link className="text-primary" href="#install-app">
									Ordering via APP
								</Link>
							</span>
							<div className="box-button-slider box-button-slider-team justify-content-end">
								<div
									className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2"
									tabIndex={0}
									role="button"
									aria-label="Previous slide"
									aria-controls="swiper-wrapper-9c1b729b91027a37b"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div
									className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2"
									tabIndex={0}
									role="button"
									aria-label="Next slide"
									aria-controls="swiper-wrapper-9c1b729b91027a37b"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
