// components/Header.tsx

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
	{ label: "Beranda", href: "/", active: true },
	{ label: "Tentang", href: "/tentang", dropdown: true },
	{ label: "Layanan", href: "/layanan", dropdown: true },
	{ label: "Harga", href: "/harga", dropdown: true },
	{ label: "Berita & Promo", href: "/berita-promo" },
	{ label: "Kontak", href: "/kontak" },
];

export type HeaderProps = {
	logoSrc?: string;
	tagline?: string;
	navItems?: typeof navItems;
	showFlags?: boolean;
};

const defaultLogo = "/logo.png";
const defaultTagline = "for your transportation need";

const Header: React.FC<HeaderProps> = ({
	logoSrc = defaultLogo,
	tagline = defaultTagline,
	navItems: nav = navItems,
	showFlags = true,
}) => {
	return (
		<header className="tw:flex tw:items-center tw:justify-between tw:px-8 tw:py-4 tw:bg-white tw:shadow tw-sticky tw-top-0 tw-z-50">
			{/* Logo + tagline */}
			<div className="tw:flex tw:items-center">
				<Image
					src={logoSrc}
					alt="GraceTrans"
					width={120}
					height={40}
					className="tw:mr-2"
				/>
				<span className="tw:text-xs tw:text-gray-500 tw-ml-2">{tagline}</span>
			</div>

			{/* Navigation */}
			<nav className="tw:flex tw:items-center tw:gap-6">
				{nav.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						className={`tw-text-sm tw-transition-colors tw-duration-200 tw-px-2 tw-py-1 tw-rounded-lg ${
							item.active
								? "tw-text-yellow-400 tw-font-semibold tw-bg-gray-100"
								: "tw-text-gray-500 hover:tw-text-yellow-400 hover:tw-bg-gray-50"
						}`}
					>
						{item.label}
						{item.dropdown && <span className="tw-ml-1">▼</span>}
					</Link>
				))}
				{showFlags && (
					<div className="tw:flex tw:items-center tw:gap-2 tw-ml-4">
						<Image src="/flags/us.png" alt="English" width={24} height={16} />
						<Image
							src="/flags/id.png"
							alt="Indonesian"
							width={24}
							height={16}
						/>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Header;
