import React from "react";
import { withBasePath } from "@/lib/basePath";

export interface CustomFooterProps {
	logoSrc?: string;
	mission?: string;
	androidImgSrc?: string;
	informasiLinks?: string[];
	kontak?: {
		office1?: string;
		office2?: string;
		phone?: string;
		email?: string;
		hours?: string;
	};
	mapsEmbedUrl?: string;
	lokasiKantorTitle?: string;
	copyright?: string;
}

const defaultLinks = [
	"Tentang Kami",
	"Cara Pemesanan",
	"Harga & Layanan",
	"Kebijakan Privasi",
	"Syarat & Ketentuan",
	"Hubungi Kami",
];

const defaultKontak = {
	office1:
		"Rukan City Walk Blok B3 No.5, Pondok Cabe Udik, Pamulang, Tangerang Selatan, Banten 15418",
	office2:
		"Ruko Terrace 8 Blok C No.77, Suvarna Sutera, Sindang Jaya, Kab. Tangerang 15560",
	phone: "(021) 22740870",
	email: "cs@gracetrans.co.id",
	hours: "Mon - Sat : 9:00 - 18:00",
};

export default function CustomFooter({
	logoSrc = withBasePath("/assets/imgs/template/grace-logo.png"),
	mission = "Kami adalah perusahaan transportasi dan travel terkemuka di Indonesia yang mengutamakan pelayanan terbaik, keselamatan, kenyamanan, dan keamanan pelanggan.",
	androidImgSrc = withBasePath("/assets/imgs/download_android.png"),
	informasiLinks = defaultLinks,
	kontak = defaultKontak,
	mapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.3008479759165!2d106.73667428730595!3d-6.3473108621934525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef85b8592c9b%3A0xd48132a4902b4e6!2sGRACE%20TRANS%20(PT%20MATARI%20JELAJAH%20INDONESIA)!5e0!3m2!1sen!2sid!4v1711234567890!5m2!1sen!2sid",
	lokasiKantorTitle = "Lokasi Kantor",
	copyright = `© ${new Date().getFullYear()} Grace Trans. All rights reserved.`,
}: CustomFooterProps) {
	return (
		<footer className="tw:!bg-[#f9fafb] tw:!text-gray-800 tw:!py-10 tw:!px-4 tw:!border-t tw:!border-gray-200">
			<div className="tw:!max-w-7xl tw:!mx-auto tw:!flex tw:!flex-wrap tw:!justify-between tw:!gap-6">
				{/* 1. Logo & Mission */}
				<div className="tw:!basis-64 tw:!flex-shrink-0">
					<img
						src={logoSrc}
						alt="Grace Trans Logo"
						className="tw:!h-16 tw:!mb-4"
					/>
					<p className="tw:!text-sm tw:!text-gray-600 tw:!mb-4">{mission}</p>
					<a href="#" target="_blank" rel="noopener noreferrer">
						<img src={androidImgSrc} alt="Google Play" className="tw:!w-48" />
					</a>
				</div>

				{/* 2. Informasi Links */}
				<div className="tw:!basis-44 tw:!flex-shrink-0">
					<h4 className="tw:!text-lg md:tw:!text-xl tw:!font-semibold tw:!mb-4">
						Informasi
					</h4>
					<ul className="tw:!space-y-2 tw:!text-base tw:!text-gray-600">
						{informasiLinks.map((item, i) => (
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
							{kontak.office1}
						</li>
						<li>
							<span className="tw:!font-semibold">Office 2:</span>
							<br />
							{kontak.office2}
						</li>
						<li>📞 {kontak.phone}</li>
						<li>
							✉️{" "}
							<a
								href={`mailto:${kontak.email}`}
								className="tw:!text-gray-600 tw:hover:!text-red-500"
							>
								{kontak.email}
							</a>
						</li>
						<li>🕐 {kontak.hours}</li>
					</ul>
				</div>

				{/* 4. Google Maps */}
				<div className="tw:!basis-64 tw:!flex-shrink-0">
					<h4 className="tw:!text-lg md:tw:!text-xl tw:!font-semibold tw:!mb-4">
						{lokasiKantorTitle}
					</h4>
					<div className="tw:!rounded-lg tw:!overflow-hidden tw:!shadow-md tw:!w-full tw:!h-48 md:tw:!h-60">
						<iframe
							src={mapsEmbedUrl}
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
				{copyright}
			</div>
		</footer>
	);
}
