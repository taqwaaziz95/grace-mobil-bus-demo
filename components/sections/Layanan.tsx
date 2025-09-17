import { swiperGroup3 } from "@/util/swiperOptions";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../blog-card";
import { withBasePath } from "@/lib/basePath";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { H2, H3, P } from "../typography";

// Define BlogCardProps type if not already imported
type BlogCardProps = {
	image: string;
	avatar: string;
	title: string;
	author: string;
	date: string;
	comments: string;
	readTime: string;
	category: string;
	href: string;
	tagLink: string;
};

const cards: BlogCardProps[] = [
	{
		image: withBasePath("/assets/imgs/gracetrans/penawaran/img1.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-1.png"),
		title: "Sewa mobil Jangka Panjang / Long Term Rental",
		author: "Jimmy Dave",
		date: "18 Sep 2024",
		comments: "38",
		readTime: "6 mins",
		category: "Car",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
	{
		image: withBasePath("/assets/imgs/gracetrans/penawaran/img4.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-2.png"),
		title: "Sewa mobil jangka pendek / Short Term Rental",
		author: "Steven Job",
		date: "18 Sep 2024",
		comments: "21",
		readTime: "4 mins",
		category: "Car",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
	{
		image: withBasePath("/assets/imgs//gracetrans/penawaran/img2.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-3.png"),
		title: "Sewa mobil Antar Jemput / Shuttle Service",
		author: "David Jame",
		date: "18 Sep 2024",
		comments: "12",
		readTime: "5 mins",
		category: "Shuttle",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
	{
		image: withBasePath("/assets/imgs//gracetrans/penawaran/img3.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-3.png"),
		title: "Manajenmen Armada / Fleet Management",
		author: "Unknown",
		date: "18 Sep 2024",
		comments: "12",
		readTime: "5 mins",
		category: "Management",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
];

const Layanan: React.FC = () => {
	return (
		<section className="section-box box-news tw:!bg-[#0095e1] tw:!rounded-es-4xl tw:!rounded-ee-4xl">
			<div className="container">
				<div className="row align-items-end">
					<div className="col-md-9 mb-30 wow fadeInUp">
						<H2 className="title-svg mb-15 tw:!text-white">
							Layanan yang{" "}
							<span className="tw:!text-[#ffff21]">Kami Berikan</span>
						</H2>
						<P className="text-lg-medium tw:!text-white ">
							Menawarkan solusi transportasi dan travel yang aman, nyaman, dan
							terpercaya.
						</P>
					</div>
					<div className="col-md-3 position-relative mb-30 wow fadeInUp d-flex align-items-center justify-content-center">
						<div
							className="box-button-slider box-button-slider-team w-100 d-flex justify-content-center align-items-center"
							style={{ height: "100%", minHeight: 48 }}
						>
							<div
								className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2 d-flex justify-content-center align-items-center"
								tabIndex={0}
								role="button"
								aria-label="Previous slide"
								aria-controls="swiper-wrapper-f147def6ba09c37a"
								style={{ width: 40, height: 40, borderRadius: "50%" }}
							>
								<ArrowLeft className="text-neutral-1000" />
							</div>
							{/* <div style={{ width: 16 }} /> */}
							<div
								className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2 d-flex justify-content-center align-items-center"
								tabIndex={0}
								role="button"
								aria-label="Next slide"
								aria-controls="swiper-wrapper-f147def6ba09c37a"
								style={{ width: 40, height: 40, borderRadius: "50%" }}
							>
								<ArrowRight className="text-neutral-1000" />
							</div>
						</div>
					</div>
				</div>
				<div className="box-list-news wow fadeInUp mt-5">
					<div className="box-swiper">
						<Swiper
							{...swiperGroup3}
							className="swiper-container swiper-group-3"
						>
							<div className="swiper-wrapper">
								{cards.map((card, idx) => (
									<SwiperSlide className="swiper-slide pt-2" key={idx}>
										<BlogCard
											{...card}
											showAuthor={false}
											showDate={false}
											showComments={false}
											showReadTime={false}
											showAvatar={false}
										/>
									</SwiperSlide>
								))}
							</div>
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Layanan;
