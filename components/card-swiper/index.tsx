// components/CardSwiper.tsx

"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type SlideData = {
	image: string;
	date: string;
	time: string;
	comments: string;
	tag: string;
	title: string;
	authorName: string;
	authorAvatar: string;
	link: string;
};

type CardSwiperProps = {
	title: string;
	description: string;
	slides: SlideData[];
	swiperProps?: any;
};

const CardSwiper = ({
	title,
	description,
	slides,
	swiperProps,
}: CardSwiperProps) => {
	return (
		<div className="tw:!container">
			<div className="tw:!flex tw:!flex-row md:tw:!flex-row  tw:!justify-between tw:!mb-2">
				<div>
					<h3 className="tw:!text-3xl tw:!font-bold tw:!mb-2 ">{title}</h3>
					<p className="tw:!text-lg tw:!text-neutral-500">{description}</p>
				</div>
				<div>
					<div className="tw:!flex tw:!gap-2">
						<div className="swiper-button-prev-custom tw:!cursor-pointer tw:!p-2 tw:!border tw:!rounded-full">
							<svg width="16" height="16" fill="none" viewBox="0 0 16 16">
								<path
									d="M8 3.3 3.3 8M3.3 8 8 12.7M3.3 8H12.7"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div className="swiper-button-next-custom tw:!cursor-pointer tw:!p-2 tw:!border tw:!rounded-full">
							<svg width="16" height="16" fill="none" viewBox="0 0 16 16">
								<path
									d="M8 12.7 12.7 8 8 3.3M12.7 8H3.3"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<Swiper
				modules={[Navigation]}
				navigation={{
					nextEl: ".swiper-button-next-custom",
					prevEl: ".swiper-button-prev-custom",
				}}
				spaceBetween={24}
				slidesPerView={3}
				{...swiperProps}
			>
				{slides.map((slide, idx) => (
					<SwiperSlide key={idx} className="tw:!pt-2">
						<div className="tw:!bg-white tw:!rounded tw:!shadow-md hover:tw:!shadow-lg tw:!overflow-hidden">
							<div className="tw:!relative">
								<Link href={slide.link}>
									<img
										src={slide.image}
										alt={slide.title}
										className="tw:!w-full tw:!h-auto"
									/>
								</Link>
								<Link
									href="#"
									className="tw:!absolute tw:!top-2 tw:!right-2 tw:!bg-blue-600 tw:!text-white tw:!text-xs tw:!px-2 tw:!py-1 tw:!rounded-full"
								>
									{slide.tag}
								</Link>
							</div>
							<div className="tw:!p-4">
								<div className="tw:!flex tw:!gap-4 tw:!text-sm tw:!text-neutral-600 tw:!mb-2">
									<span>{slide.date}</span>
									<span>{slide.time}</span>
									<span>{slide.comments} comments</span>
								</div>
								<h4 className="tw:!text-xl tw:!font-bold tw:!mb-4">
									<Link
										href={slide.link}
										className="tw:!text-neutral-900 hover:tw:!underline"
									>
										{slide.title}
									</Link>
								</h4>
								<div className="tw:!flex tw:!items-center tw:!justify-between">
									<div className="tw:!flex tw:!items-center tw:!gap-2">
										<img
											src={slide.authorAvatar}
											alt={slide.authorName}
											className="tw:!w-8 tw:!h-8 tw:!rounded-full"
										/>
										<p className="tw:!text-sm tw:!font-semibold">
											{slide.authorName}
										</p>
									</div>
									<Link
										href={slide.link}
										className="tw:!text-sm tw:!text-blue-600 tw:!font-medium hover:tw:!underline"
									>
										Keep Reading
									</Link>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default CardSwiper;
