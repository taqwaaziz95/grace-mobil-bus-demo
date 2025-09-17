"use client";
import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import MobileMenu from "./MobileMenu";
import Offcanvas from "./Offcanvas";
import Footer1 from "./footer/Footer1";
import Footer2 from "./footer/Footer2";
import Header1 from "./header/Header1";
import Header2 from "./header/Header2";
import Header3 from "./header/Header3";
import Marquee from "react-fast-marquee";
import { ArrowRight, Video } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import CustomHeroBanner from "./CustomHeroBanner";
import Layanan from "../sections/Layanan";
import VideoTestimonial from "../elements/VideoTestimonial";

interface LayoutProps {
	headerStyle?: Number;
	footerStyle?: Number;
	children?: React.ReactNode;
	breadcrumbTitle?: string;
}

function Footer() {
	return (
		<footer className="tw:!bg-[#f9fafb] tw:!text-gray-800 tw:!py-10 tw:!px-4 tw:!border-t tw:!border-gray-200">
			<div className="tw:!max-w-7xl tw:!mx-auto tw:!flex tw:!flex-wrap tw:!justify-between tw:!gap-6">
				{/* 1. Logo & Mission */}
				<div className="tw:!basis-72 tw:!flex-shrink-0">
					<img
						src={withBasePath("/assets/imgs/template/grace-logo.png")}
						alt="Grace Trans Logo"
						className="tw:!h-16 tw:!mb-4"
					/>
					<p className="tw:!text-sm tw:!text-gray-600 tw:!mb-4">
						Menjadi perusahaan jasa transportasi dan travel terdepan dan
						terbesar di Indonesia dengan kualitas pelayanan terbaik dengan
						prioritas utama adalah keselamatan, kenyamanan, dan keamanan dari
						konsumen
					</p>
					<a href="#" target="_blank" rel="noopener noreferrer">
						<img
							src={withBasePath("/assets/imgs/download_android.png")}
							alt="Google Play"
							className="tw:!w-48"
						/>
					</a>
				</div>

				{/* 2. Informasi Links */}
				<div className="tw:!basis-44 tw:!flex-shrink-0">
					<h4 className="tw:!text-lg md:tw:!text-xl tw:!font-semibold tw:!mb-4">
						Informasi
					</h4>
					<ul className="tw:!space-y-2 tw:!text-base tw:!text-gray-600">
						{[
							"Tentang Kami",
							"Cara Pemesanan",
							"Harga & Layanan",
							"Kebijakan Privasi",
							"Syarat & Ketentuan",
							"Hubungi Kami",
						].map((item, i) => (
							<li key={i}>
								<a
									href="#"
									className="tw:hover:!text-red-500 tw:!transition-colors"
								>
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* 3. Informasi Kontak */}
				<div className="tw:!basis-72 tw:!flex-shrink-0">
					<h4 className="tw:!text-base tw:!font-semibold tw:!mb-3">
						Informasi Kontak
					</h4>
					<ul className="tw:!text-sm tw:!space-y-2 tw:!text-gray-600">
						<li>
							<span className="tw:!font-semibold">Office 1:</span>
							<br />
							Rukan City Walk Blok B3 No.5, Pondok Cabe Udik, Pamulang,
							Tangerang Selatan, Banten 15418
						</li>
						<li>
							<span className="tw:!font-semibold">Office 2:</span>
							<br />
							Ruko Terrace 8 Blok C No.77, Suvarna Sutera, Sindang Jaya, Kab.
							Tangerang 15560
						</li>
						<li>📞 (021) 22740870</li>
						<li>
							✉️{" "}
							<a
								href="mailto:cs@gracetrans.co.id"
								className="tw:!text-gray-600 tw:hover:!text-red-500"
							>
								cs@gracetrans.co.id
							</a>
						</li>
						<li>🕐 Mon - Sat : 9:00 - 18:00</li>
					</ul>
				</div>

				{/* 4. Google Maps */}

				<div className="tw:!basis-64 tw:!flex-shrink-0">
					<h4 className="tw:!text-lg md:tw:!text-xl tw:!font-semibold tw:!mb-4">
						Lokasi Kantor
					</h4>
					<div className="tw:!rounded-lg tw:!overflow-hidden tw:!shadow-md tw:!w-full tw:!h-48 md:tw:!h-60">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.3008479759165!2d106.73667428730595!3d-6.3473108621934525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef85b8592c9b%3A0xd48132a4902b4e6!2sGRACE%20TRANS%20(PT%20MATARI%20JELAJAH%20INDONESIA)!5e0!3m2!1sen!2sid!4v1711234567890!5m2!1sen!2sid"
							className="tw:!w-full tw:!h-full"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="tw:!mt-8 tw:!pt-4 tw:!text-center tw:!text-xs tw:!text-gray-400">
				Copyright © PT Matari Jelajah Indonesia. {new Date().getFullYear()}.
			</div>
		</footer>
	);
}

function Clients() {
	return (
		<div className="background-100 pt-55 pb-55 mt-100">
			<div className="container">
				<Marquee
					direction="left"
					pauseOnHover={true}
					className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center  wow fadeIn"
				>
					<ul className="carouselTicker__list">
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/lexus.png")}
									alt="Gracetransx"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/lexus-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/mer.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/mer-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/bugatti.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath(
										"/assets/imgs/page/homepage2/bugatti-w.png"
									)}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/jaguar.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/jaguar-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/honda.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/honda-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath(
										"/assets/imgs/page/homepage2/chevrolet.png"
									)}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath(
										"/assets/imgs/page/homepage2/chevrolet-w.png"
									)}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/acura.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/acura-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/bmw.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/bmw-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/toyota.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/toyota-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/lexus.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/lexus-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/mer.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath("/assets/imgs/page/homepage2/mer-w.png")}
									alt="Gracetrans"
								/>
							</div>
						</li>
						<li className="carouselTicker__item">
							<div className="item-brand">
								<img
									className="light-mode"
									src={withBasePath("/assets/imgs/page/homepage2/bugatti.png")}
									alt="Gracetrans"
								/>
								<img
									className="dark-mode"
									src={withBasePath(
										"/assets/imgs/page/homepage2/bugatti-w.png"
									)}
									alt="Gracetrans"
								/>
							</div>
						</li>
					</ul>
				</Marquee>
			</div>
		</div>
	);
}

function HeroBanner() {
	return (
		<CustomHeroBanner
			title="Rencanakan Perjalanan"
			subtitle="Tanpa Ribet, Pesan Sekarang!"
			backgroundImage={withBasePath("/assets/imgs/cta/cta-2/background-2.png")}
			kontakHref="/contact"
			kontakLabel="Contact Us"
			shuttleHref="/shuttle"
			shuttleLabel="Book Shuttle"
			rentHref="/rent"
			rentLabel="Rent a Car"
			disableKontak
			disableShuttle
			disableRent
		/>
	);
}

export default function Layout({
	headerStyle,
	footerStyle,
	breadcrumbTitle,
	children,
}: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false);
	// MobileMenu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu);
		!isMobileMenu
			? document.body.classList.add("mobile-menu-active")
			: document.body.classList.remove("mobile-menu-active");
	};
	// Offcanvas
	const [isOffcanvas, setOffcanvas] = useState<boolean>(false);
	const handleOffcanvas = (): void => {
		setOffcanvas(!isOffcanvas);
		!isOffcanvas
			? document.body.classList.add("canvas-menu-active")
			: document.body.classList.remove("canvas-menu-active");
	};

	useEffect(() => {
		const WOW: any = require("wowjs");
		(window as any).wow = new WOW.WOW({
			live: false,
		});

		// Initialize WOW.js
		(window as any).wow.init();

		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100;
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck);
			}
		};

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [scroll]);
	return (
		<>
			<div id="top" />
			{/* {!headerStyle && (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffcanvas={isOffcanvas}
          handleOffcanvas={handleOffcanvas}
        />
      )}
      {headerStyle == 1 ? (
        <Header1
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffcanvas={isOffcanvas}
          handleOffcanvas={handleOffcanvas}
        />
      ) : null}
      {headerStyle == 2 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffcanvas={isOffcanvas}
          handleOffcanvas={handleOffcanvas}
        />
      ) : null}
      {headerStyle == 3 ? ( */}
			<Header3
				scroll={scroll}
				isMobileMenu={isMobileMenu}
				handleMobileMenu={handleMobileMenu}
				isOffcanvas={isOffcanvas}
				handleOffcanvas={handleOffcanvas}
			/>
			{/* ) : null} */}
			<MobileMenu
				isMobileMenu={isMobileMenu}
				handleMobileMenu={handleMobileMenu}
			/>
			<Offcanvas isOffcanvas={isOffcanvas} handleOffcanvas={handleOffcanvas} />

			<main className="main">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			{/* {!footerStyle && <Footer1 />}
      {footerStyle == 1 ? <Footer1 /> : null}
      {footerStyle == 2 ? <Footer2 /> : null} */}
			{/* <Clients /> */}
			{/* <Layanan /> */}
			{/* <VideoTestimonial
				className="tw:!mt-0 tw:md:!mt-24"
				title1="Ulasan Nyata"
				title2="Pelanggan Kami"
				isVideoPosition="left"
				src="/videos/jirayut.mp4"
				name="Jirayut Afisan Jehdueramae"
				role="Penyanyi, Presenter, dan Aktor"
				testimonial="Orang nya keren, mobil nya bersih, bisa nyanyi ada karaoke juga. Pokoknya keren, terima kasih Grace Trans udah menemani dan libur bareng Jirayut. Kalau nanti ada waktu lagi kita jalan bareng lagi ya, terima kasih."
			/> */}
			<HeroBanner />
			<Footer />

			<BackToTop target="#top" />
		</>
	);
}
