"use client";
import Button from "@/components/button";
import { withBasePath } from "@/lib/basePath";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ThemeSwitch = dynamic(
	() => import("../../../components/elements/ThemeSwitch"),
	{ ssr: false }
);

export default function Header3({
	scroll,
	handleMobileMenu,
}: {
	scroll: boolean;
	handleMobileMenu: () => void;
}) {
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const loggedInUser = localStorage.getItem("username");
		if (loggedInUser) {
			setUser(loggedInUser);
		}
	}, []);

	return (
		<header
			className={`header sticky-bar header-home-2 border-0 ${
				scroll ? "stick" : ""
			}`}
		>
			{/* disini header nya  */}
			<div className="container-fluid background-body">
				<div className="main-header tw:!flex tw:!flex-col md:tw:!flex-row tw:!items-center tw:!justify-between tw:!py-2 tw:!px-2 md:tw:!px-6">
					<div className="header-left tw:!flex tw:!flex-row tw:!items-center tw:!justify-between tw:!w-full md:tw:!w-auto">
						{/* Logo */}
						<div className="header-logo tw:!flex-shrink-0">
							<Link className="d-flex" href="/">
								<Image
									width={125}
									height={75}
									className="tw:!max-h-[40px]"
									alt="Gracetrans"
									src={withBasePath("/assets/imgs/template/grace-logo.png")}
								/>
							</Link>
						</div>

						{/* Burger Icon always inline with logo, justify-between */}
						{user && (
							<div
								className="burger-icon-2 burger-icon-white tw:!ml-4 md:tw:!hidden"
								onClick={handleMobileMenu}
							>
								<img
									src={withBasePath("/assets/imgs/template/icons/menu.svg")}
									alt="Menu"
								/>
							</div>
						)}
					</div>

					{/* Navigation */}
					<div className="header-nav tw:!hidden md:tw:!block tw:!ml-4">
						<nav className="nav-main-menu">
							<ul className="main-menu tw:!flex tw:!flex-col md:tw:!flex-row tw:!gap-2 md:tw:!gap-4">
								<li>
									<Link href="/">Beranda</Link>
								</li>
								<li>
									<Link href="/about-us">Tentang</Link>
								</li>
								<li className="has-children">
									<Link href="#">Sewa Kendaraan</Link>
									<ul className="sub-menu">
										<li>
											<Link href="/about-us">Antar Jemput Bandara</Link>
										</li>
										<li>
											<Link href="/services">Harian</Link>
										</li>
										<li>
											<Link href="/pricing">Bulanan</Link>
										</li>
									</ul>
								</li>
								<li className="has-children">
									<Link href="#">Shuttle Bus</Link>
									<ul className="sub-menu">
										<li>
											<Link href="/about-us">Resident</Link>
										</li>
										<li>
											<Link href="/services">Korporat</Link>
										</li>
										<li>
											<Link href="/pricing">Antar Kota</Link>
										</li>
										<li>
											<Link href="/calculator">Shopping Mall</Link>
										</li>
									</ul>
								</li>
								<li>
									<Link href="/faq">FAQ</Link>
								</li>
								<li>
									<Link href="/contact">Kontak Kami</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				{/* Mobile nav overlay (show/hide with state, not implemented here) */}
				{/*
      <div className="tw:!block md:tw:!hidden tw:!bg-white tw:!absolute tw:!top-full tw:!left-0 tw:!w-full tw:!z-50">
        <nav className="nav-main-menu">
          <ul className="main-menu tw:!flex tw:!flex-col tw:!gap-2 tw:!p-4">
            ...same menu as above...
          </ul>
        </nav>
      </div>
      */}
			</div>
		</header>
	);
}
