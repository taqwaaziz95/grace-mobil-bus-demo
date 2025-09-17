"use client";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../button";

interface MobileMenuProps {
	isMobileMenu: boolean;
	handleMobileMenu: () => void;
}

export default function MobileMenu({
	isMobileMenu,
	handleMobileMenu,
}: MobileMenuProps) {
	const [user, setUser] = useState<string | null>(null);
	const [balance, setBalance] = useState<number>(0);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	useEffect(() => {
		const loggedInUser = localStorage.getItem("username");
		const userBalance = localStorage.getItem("balance");
		if (loggedInUser) {
			setUser(loggedInUser);
			setBalance(userBalance ? parseInt(userBalance) : 0);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("balance");
		setUser(null);
		setBalance(0);
		setDropdownVisible(false);
		window.location.reload();
	};

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const menuItems = [
		{ name: "Daftar Pesanan", link: "/cart" },
		{ name: "Riwayat Pembayaran", link: "/riwayat-pembayaran" },
		{ name: "Riwayat Pembelian", link: "/riwayat-pembelian" },
		{ name: "Cek Posisi Mobil", link: "/track-position" },
		{
			name: "Driver Assistant Management",
			link: "/driver-assistant-management",
		},
		{ name: "Profil", link: "/profile" },
	];

	return (
		<>
			{/* Overlay */}
			{isMobileMenu && (
				<div
					onClick={handleMobileMenu}
					className="tw:!fixed tw:!inset-0 tw:!bg-black/40 tw:!z-40 tw:!transition-opacity"
				/>
			)}

			{/* Sidebar Menu */}
			<div
				className={`tw:!fixed tw:!top-[64px] tw:!right-0 tw:!h-full tw:!w-80 tw:!bg-white tw:!shadow-lg tw:!z-50 tw:!transition-transform tw:!duration-300 tw:!flex tw:!flex-col ${
					isMobileMenu ? "tw:!translate-x-0" : "tw:!translate-x-full"
				}`}
			>
				{/* Profile Section */}
				{user && (
					<div className="tw:!flex tw:!flex-col tw:!gap-3 tw:!p-4 tw:!border-b tw:!border-gray-100">
						<>
							<div className="tw:!flex tw:!flex-row tw:!items-center tw:!justify-between">
								<div className="tw:!flex tw:!items-center tw:!gap-3">
									<img
										src={withBasePath(
											"/assets/imgs/team/team-1/portrait-1.png"
										)}
										alt="Profile"
										className="tw:!w-12 tw:!h-12 tw:!rounded-full tw:!border"
									/>
									<div>
										<p className="tw:!font-semibold tw:!text-gray-900">
											Hi, {user}
										</p>
										<p className="tw:!text-sm tw:!text-gray-500">
											Wallet:{" "}
											<span className="tw:!font-bold tw:!text-[#2A9FD6]">
												Rp {balance.toLocaleString("id-ID")}
											</span>
										</p>
									</div>
								</div>

								{/* Close Button on the Right */}
								<button
									onClick={handleMobileMenu}
									aria-label="Close Menu"
									className="tw:!p-2 tw:!rounded-full hover:tw:!bg-gray-100"
								>
									<X className="tw:!w-6 tw:!h-6 tw:!text-gray-700" />
								</button>
							</div>

							{/* Top-Up Button */}
							<button className="tw:!bg-[#2A9FD6] tw:!text-white tw:!py-2 tw:!rounded-lg tw:!font-semibold hover:tw:!bg-[#238bb8]">
								Top Up
							</button>
						</>
					</div>
				)}

				{/* Menu Links */}
				<nav className="tw:!flex-1 tw:!overflow-y-auto tw:!p-4">
					<ul className="tw:!space-y-4 tw:!font-medium">
						{menuItems.map((item, idx) => (
							<li key={idx}>
								<Link
									href={item.link}
									className="tw:!block tw:!py-2 tw:!rounded-md tw:!transition tw:hover:!text-[#2A9FD6]"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Logout */}
				{user && (
					<div className="tw:!p-4 tw:!border-t tw:!border-gray-200">
						<button
							onClick={handleLogout}
							className="tw:!w-full tw:!bg-red-500 tw:!text-white tw:!py-2 tw:!rounded-lg tw:!font-semibold hover:tw:!bg-red-600"
						>
							Logout
						</button>
					</div>
				)}
			</div>
		</>
	);
}
