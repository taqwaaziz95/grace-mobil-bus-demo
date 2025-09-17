"use client";
import { withBasePath } from "@/lib/basePath";
import CounterUp from "../../components/elements/CounterUp";
import Layout from "../../components/layout/Layout";
import { swiperGroup3, swiperGroupAnimate } from "../../util/swiperOptions";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Swiper, SwiperSlide } from "swiper/react";
import { H1, Span } from "@/components/typography";
import Image from "next/image";
import CustomGridImage from "@/components/custom-grid-image";
import JumbotronHeader from "@/components/jumbotron-header";
import StatsSection from "@/components/stats-section";
import VisionMissionCard from "@/components/vision-mission-card";

export default function AboutUs() {
	const [isOpen, setOpen] = useState(false);
	const [isAccordion, setIsAccordion] = useState(1);

	const handleAccordion = (key: any) => {
		setIsAccordion((prevState) => (prevState === key ? null : key));
	};
	const statsData = [
		{
			count: 45,
			suffix: "+",
			lines: ["Global", "Branches"],
		},
		{
			count: 29,
			suffix: "K",
			lines: ["Destinations", "Collaboration"],
		},
		{
			count: 20,
			suffix: "+",
			lines: ["Years", "Experience"],
		},
		{
			count: 168,
			suffix: "K",
			lines: ["Happy", "Customers"],
		},
		{
			count: 15,
			suffix: "M",
			lines: ["User", "Account"],
		},
	];
	return (
		<>
			<Layout footerStyle={1}>
				<div>
					<JumbotronHeader
						title="About Us"
						subtitle="Get the latest news, updates and tips"
						bannerImg={"/assets/imgs/page-header/banner.png"}
						breadcrumbs={[
							{ label: "Home", href: "/", isActive: false },
							{ label: "About Us", href: "/about-us", isActive: true },
						]}
					/>
					{/* section-1 */}
					<div className="section-1 py-96 background-body">
						<CustomGridImage
							heading="GRACE TRANS"
							highlighted="Car Rental"
							description="Grace Trans adalah sebuah usaha Transportasi yang mengawali usahanya dengan pelayanan antar jemput anak Sekolah (School Shuttle). Memulai operasional nya pada tahun 2015 dan Resmi berdiri sebagai Perusahaan yang berbadan hukum pada tahun 2017.
							Awalnya, Grace Trans hanya menyediakan layanan jemput antar untuk anak sekolah, tetapi sekarang telah menambahkan variasi produk. Produk tersebut meliputi transportasi korporat, layanan Shuttle Bus (shuttle antar jemput karyawan, shuttle airport, shuttle shopping mall dan shuttle Residence), sewa Bus Pariwisata, dan sewa Bus untuk pulang pergi, serta penyewaan bus untuk acara, dan mobil pengantin harian, mingguan, dan bulanan sehingga Grace Trans menjadi bisnis Transportasi dan Pariwisata dengan Layanan One-Stop."
							tagOne={{ number: "100", title: "Jumlah", subtitle: "Pegawai" }}
							tagTwo={{
								number: "10",
								title: "Tahun Dalam",
								subtitle: "Usaha Rental",
							}}
						/>
					</div>

					{/* Static 1 */}
					<section className="section-static-1 background-body background-2">
						<StatsSection data={statsData} />
					</section>
					{/* cta 9*/}
					<VisionMissionCard
						leftImg1="/assets/imgs/cta/cta-9/img-1.png"
						leftImg2="/assets/imgs/cta/cta-9/img-2.png"
						leftImg1Alt="Gracetrans"
						leftImg2Alt="Gracetrans"
						playButton={true}
						onPlayClick={() => setOpen(true)}
						rightBtnText="Our Vision & Mission"
						rightTitle="Visi Kami"
						rightDesc="Menjadi perusahaan layanan transportasi dan pariwisata terdepan serta terbesar di Indonesia dengan kualitas layanan terbaik, serta mengutamakan keselamatan, kenyamanan, dan keamanan konsumen."
						rightList={[
							"Menjadi perusahaan penyedia layanan transportasi yang memprioritaskan keamanan, kenyamanan, dan keselamatan penumpang yang akan bepergian.",
							"Menjadi perusahaan yang selalu menghargai karyawan, lingkungan, dan masyarakat.",
							"Menjadi perusahaan layanan transportasi yang selalu hadir untuk semua kebutuhan transportasi Anda.",
							"Menjadi perusahaan layanan transportasi dan pariwisata dengan kualitas layanan yang unggul.",
						]}
						rightCtaText="Get Started Now"
						rightCtaHref="#"
					/>
					{/* testimonials */}
					<section className="section-box py-96 background-body">
						<div className="container">
							<div className="row">
								<div className="col-auto mx-auto wow  text-center d-flex flex-column align-items-center justify-content-center">
									<H1 className="mt-8 neutral-1000">
										Struktur <Span color="primary"> Organisasi Perusahaan</Span>
									</H1>

									<Image
										src={withBasePath(
											"/assets/imgs/gracetrans/struktur/struktur.jpg"
										)}
										alt="Gracetrans"
										width={900}
										height={540}
										className="img-fluid tw:!mt-24"
									/>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		</>
	);
}
