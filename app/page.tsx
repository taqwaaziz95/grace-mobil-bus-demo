"use client";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import VideoTestimonial from "@/components/elements/VideoTestimonial";
import LeftIconGridCard from "@/components/left-icon-grid-card";
import { H2, P, Span } from "@/components/typography";
import BlogCard from "@/components/blog-card";
import type { BlogCardProps } from "@/components/blog-card";
import Layanan from "../components/sections/Layanan";
import Hero3 from "../components/sections/Hero3";
import { Star, PhoneCall, Car, Shield, FileText } from "lucide-react";
import { withBasePath } from "@/lib/basePath";

/* -------------------- small utils -------------------- */
function useIsMobile(breakpointPx = 768) {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const mql = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
		const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
			setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches);
		// init
		setIsMobile(mql.matches);
		// listeners
		if ("addEventListener" in mql)
			mql.addEventListener("change", onChange as any);
		else mql.addListener(onChange as any);
		return () => {
			if ("removeEventListener" in mql)
				mql.removeEventListener("change", onChange as any);
			else mql.removeListener(onChange as any);
		};
	}, [breakpointPx]);
	return isMobile;
}

const features = [
	{
		icon: <Star size={24} />,
		title: "Jaminan Kenyamanan",
		description:
			"Grace Trans memberikan jaminan kenyamanan bagi para pengguna jasa transportasi dan mendukung penuh program pemerintah sesuai standar yang berlaku.",
	},
	{
		icon: <PhoneCall size={24} />,
		title: "Customer Service 24/7",
		description:
			"Demi memuaskan pelanggan kami menyediakan sarana pemesanan unit selama 24 jam, konsumen dilayani dengan baik dan ramah.",
	},
	{
		icon: <Car size={24} />,
		title: "Unit Pengganti",
		description:
			"Jika unit pertama mengalami kendala di jalan, kami menyiapkan unit pengganti yang setara sesuai pesanan awal.",
	},
	{
		icon: <Shield size={24} />,
		title: "Asuransi",
		description:
			"Penanganan saat terjadi kecelakaan lalu lintas—dengan keselamatan sebagai prioritas utama.",
	},
	{
		icon: <FileText size={24} />,
		title: "Kelengkapan Surat Kendaraan",
		description:
			"Seluruh unit memiliki identitas kendaraan yang sah dan tertib pajak sesuai peraturan pemerintah.",
	},
	{
		icon: <FileText size={24} />,
		title: "Kelengkapan Surat Kendaraan",
		description:
			"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
	},
	{
		icon: <FileText size={24} />,
		title: "Kelengkapan Surat Kendaraan",
		description:
			"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
	},
	{
		icon: <FileText size={24} />,
		title: "Kelengkapan Surat Kendaraan",
		description:
			"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
	},
];

const newsCardDummy: BlogCardProps[] = [
	{
		image: withBasePath("/assets/imgs/gracetrans/berita/news1.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-1.png"),
		title: "Sewa mobil Jangka Panjang / Long Term Rental",
		author: "Admin 1",
		date: "18 Sep 2024",
		comments: "38",
		readTime: "6 mins",
		category: "Berita",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
	{
		image: withBasePath("/assets/imgs/gracetrans/berita/news2.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-2.png"),
		title: "Sewa mobil jangka pendek / Short Term Rental",
		author: "Admin 1",
		date: "18 Sep 2024",
		comments: "21",
		readTime: "4 mins",
		category: "Berita",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
	{
		// fixed double slash path
		image: withBasePath("/assets/imgs/gracetrans/berita/news3.jpg"),
		avatar: withBasePath("/assets/imgs/blog/blog-1/avatar-3.png"),
		title: "Sewa mobil Antar Jemput / Shuttle Service",
		author: "Admin 1",
		date: "18 Sep 2024",
		comments: "12",
		readTime: "5 mins",
		category: "Berita",
		href: "/blog-details",
		tagLink: "/blog-grid",
	},
];

/* -------------------- Section: Why Us -------------------- */
function MengapaKami() {
	return (
		<div className="tw:!container tw:!mx-auto tw:!px-4 tw:!py-14 md:tw:!py-20">
			<div className="tw:!text-center tw:!mb-8 md:tw:!mb-12">
				<H2 className="tw:!text-2xl md:tw:!text-4xl tw:!font-extrabold tw:!text-gray-800">
					Mengapa Kami Adalah <Span color="primary">Pilihan yang Tepat?</Span>
				</H2>
				<P className="tw:!mt-3 tw:!text-gray-600 tw:!max-w-2xl tw:!mx-auto">
					One-stop transport & travel partner untuk kebutuhan personal maupun
					korporat.
				</P>
			</div>
			<div
				className="
					tw:!grid tw:!gap-4 sm:tw:!gap-5 md:tw:!gap-6
					tw:!grid-cols-1 sm:tw:!grid-cols-2 lg:tw:!grid-cols-3
					tw:!items-stretch
				"
			>
				<LeftIconGridCard
					data={features}
					className="tw:!grid tw:!grid-cols-1 tw:!gap-4"
					// ensure Traveloka-ish soft card feel
					itemClassName="
						tw:!rounded-2xl tw:!border tw:!border-gray-100
						tw:!bg-white tw:!shadow-sm hover:tw:!shadow-md
						tw:!transition tw:!duration-200 tw:!p-5
					"
					iconWrapClassName="tw:!rounded-xl tw:!bg-blue-50 tw:!p-3"
					titleClassName="tw:!text-base tw:!font-semibold tw:!text-gray-800"
					descClassName="tw:!text-sm tw:!text-gray-600 tw:!leading-relaxed"
				/>
			</div>
		</div>
	);
}

/* -------------------- Mobile-first Video -------------------- */
function ResponsiveVideoBlock({
	src,
	title1,
	title2,
	testimonial,
}: {
	src: string;
	title1: string;
	title2: string;
	testimonial: string;
}) {
	const isMobile = useIsMobile(768);
	const videoSrc = useMemo(() => withBasePath(src), [src]);

	// On mobile: native <video> for instant, inline playback & clean UI
	if (isMobile) {
		return (
			<section className="tw:!w-full tw:!bg-white tw:!pt-2 tw:!pb-8">
				<div className="tw:!container tw:!mx-auto tw:!px-4">
					<div className="tw:!rounded-3xl tw:!overflow-hidden tw:!bg-white tw:!border tw:!border-gray-100 tw:!shadow-sm">
						<video
							src={videoSrc}
							autoPlay
							muted
							playsInline
							loop
							controls
							className="tw:!w-full tw:!h-[220px] tw:!object-cover md:tw:!h-[340px]"
							style={{ WebkitTouchCallout: "none" }}
						/>
						<div className="tw:!p-5">
							<h3 className="tw:!text-lg tw:!font-extrabold tw:!text-gray-900">
								{title1} <Span color="primary">{title2}</Span>
							</h3>
							<P className="tw:!mt-2 tw:!text-gray-600 tw:!text-sm">
								{testimonial}
							</P>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// On desktop/tablet: keep your existing component (content on left/right)
	return (
		<VideoTestimonial
			className="tw:!mt-0 md:tw:!mt-16 lg:tw:!mt-24"
			title1={title1}
			title2={title2}
			isVideoPosition="right"
			src={src}
			name=""
			role=""
			testimonial={testimonial}
		/>
	);
}

/* -------------------- Main Page -------------------- */
export default function Home() {
	return (
		<Layout headerStyle={3} footerStyle={1}>
			{/* HERO */}
			<section className="tw:!relative tw:!overflow-hidden">
				<div className="tw:!absolute tw:!inset-0 tw:!bg-[linear-gradient(180deg,rgba(0,149,225,0.06),transparent)] tw:!pointer-events-none" />
				<Hero3 />
			</section>

			{/* ABOUT + VIDEO (mobile inline autoplay, desktop via component) */}
			<ResponsiveVideoBlock
				src="/videos/jirayut.mp4"
				title1="Tentang"
				title2="Perusahaan"
				testimonial="Awalnya, Grace Trans hanya menyediakan layanan jemput-antar untuk anak sekolah, lalu berkembang menjadi transportasi korporat, Shuttle Bus, Bus Pariwisata, hingga penyewaan untuk berbagai acara. Layanan one-stop untuk kebutuhan harian, mingguan, dan bulanan."
			/>

			{/* CURVED BACKGROUND WRAP (Traveloka-ish) */}
			<section className="tw:!bg-[#0095e1] tw:!py-2">
				<div
					className="
						tw:!bg-white tw:!rounded-es-[2rem] tw:!rounded-ee-[2rem]
						tw:!shadow-[0_-10px_30px_rgba(0,0,0,0.03)]
					"
				>
					<MengapaKami />
				</div>
			</section>

			{/* LAYANAN */}
			<section className="tw:!container tw:!mx-auto tw:!px-4 tw:!py-12 md:tw:!py-16">
				<div className="tw:!rounded-3xl tw:!bg-white tw:!border tw:!border-gray-100 tw:!shadow-sm tw:!p-4 sm:tw:!p-6 md:tw:!p-8">
					<Layanan />
				</div>
			</section>

			{/* NEWS / BLOG CARDS */}
			<section className="tw:!py-10 md:tw:!py-16 tw:!bg-gradient-to-b tw:!from-white tw:!to-[#f9fbff]">
				<div className="tw:!container tw:!mx-auto tw:!px-4">
					<header className="tw:!mb-6 md:tw:!mb-8 lg:tw:!mb-10">
						<H2 className="tw:!text-2xl md:tw:!text-3xl tw:!font-extrabold tw:!text-gray-900">
							Temukan <Span color="primary">Berita & Informasi Terkini</Span>
						</H2>
						<P className="tw:!mt-2 tw:!text-gray-600 tw:!text-base">
							Menawarkan solusi transportasi dan travel yang aman, nyaman, dan
							terpercaya.
						</P>
					</header>

					<div
						className="
							tw:!grid tw:!gap-4 sm:tw:!gap-5 md:tw:!gap-6
							tw:!grid-cols-1 tw:sm:!grid-cols-3 tw:lg:!grid-cols-3
						"
					>
						{newsCardDummy.map((card, idx) => (
							<div
								key={idx}
								className="
									tw:!rounded-2xl tw:!bg-white tw:!border tw:!border-gray-100
									tw:!shadow-sm hover:tw:!shadow-md tw:!transition tw:!duration-200
								"
							>
								<BlogCard
									{...card}
									className="tw:!h-full tw:!flex tw:!flex-col"
									imageClassName="tw:!rounded-t-2xl tw:!h-48 md:tw:!h-56 tw:!object-cover"
									bodyClassName="tw:!p-5 tw:!flex tw:!flex-col tw:!gap-2"
									titleClassName="tw:!text-lg tw:!font-bold tw:!text-gray-900 tw:!line-clamp-2"
									descClassName="tw:!text-sm tw:!text-gray-600 tw:!line-clamp-3"
									metaWrapClassName="tw:!mt-auto tw:!pt-3 tw:!text-xs tw:!text-gray-500"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* (Optional) other sections kept commented for now to keep page focused & fast
				<Search1 />
				<Brand1 />
				<CarsListing1 />
				<Cta1 />
				<Categories1 />
				<WhyUs1 />
				<Cta2 />
				<CarsListing2 />
				<Cta3 />
				<Services1 />
				<Banners />
				<Testimonials />
				<CarReview1 />
				<Blog1 />
				<App />
			*/}
		</Layout>
	);
}
