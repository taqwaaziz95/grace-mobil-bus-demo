"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
	ssr: false,
});
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header2({
	scroll,
	isMobileMenu,
	handleMobileMenu,
	handleOffcanvas,
	isOffcanvas,
}: any) {
	const [user, setUser] = useState<string | null>(null);
	const [balance, setBalance] = useState<number>(0);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	useEffect(() => {
		// Check if user is logged in
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

	return (
		<>
			<header
				className={`header sticky-bar header-home-2 ${scroll ? "stick" : ""}`}
			>
				<div className="container-fluid background-body">
					<div className="main-header">
						<div className="header-left">
							<div className="header-logo p-2">
								<Link className="d-flex" href="/">
									<img
										className="light-mode"
										alt="Carento"
										src="/assets/imgs/template/grace-logo.png"
									/>
									<img
										className="dark-mode"
										alt="Carento"
										src="/assets/imgs/template/grace-logo.png"
									/>
								</Link>
							</div>
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu header-left p-4">
										<li className="has-children">
											<Link href="#">Home</Link>
											<ul className="sub-menu">
												<li>
													<Link href="/">Grace Mobil</Link>
												</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
							<div className="header-right">
								<div className="d-none d-xxl-inline-block align-middle mr-15">
									{user ? (
										<div className="dropdown">
											<span
												className="btn btn-signin neutral-1000"
												onClick={toggleDropdown}
											>
												{user} - Rp {balance}
											</span>
											{dropdownVisible && (
												<div className="dropdown-menu show">
													<button
														className="dropdown-item"
														onClick={handleLogout}
													>
														Logout
													</button>

													<Link className="dropdown-item" href="/topup">
														Topup
													</Link>
												</div>
											)}
										</div>
									) : (
										<Link className="btn btn-signin neutral-1000" href="/login">
											<svg
												className="mb-1"
												xmlns="http://www.w3.org/2000/svg"
												width={12}
												height={12}
												viewBox="0 0 12 12"
												fill="none"
											>
												<path
													d="M1 12C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11C12 12 11 12 11 12H1ZM6 6C6.79565 6 7.55871 5.68393 8.12132 5.12132C8.68393 4.55871 9 3.79565 9 3C9 2.20435 8.68393 1.44129 8.12132 0.87868C7.55871 0.316071 6.79565 0 6 0C5.20435 0 4.44129 0.316071 3.87868 0.87868C3.31607 1.44129 3 2.20435 3 3C3 3.79565 3.31607 4.55871 3.87868 5.12132C4.44129 5.68393 5.20435 6 6 6Z"
													fill="#101010"
												/>
											</svg>
											Sign in
										</Link>
									)}
								</div>
								<div
									className="burger-icon burger-icon-white"
									onClick={handleMobileMenu}
								>
									<span className="burger-icon-top" />
									<span className="burger-icon-mid"> </span>
									<span className="burger-icon-bottom"> </span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
