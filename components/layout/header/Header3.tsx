"use client";
import { withBasePath } from "@/lib/basePath";
import dynamic from "next/dynamic";
import Image from "next/image";
const ThemeSwitch = dynamic(
	() => import("../../../components/elements/ThemeSwitch"),
	{
		ssr: false,
	}
);
import Link from "next/link";

export default function Header3({
	scroll,
	isMobileMenu,
	handleMobileMenu,
	handleOffcanvas,
	isOffcanvas,
}: any) {
	return (
		<>
			<header
				className={`header sticky-bar header-home-2 border-0 ${
					scroll ? "stick" : ""
				}`}
			>
				<div className="container-fluid background-body">
					<div className="main-header">
						<div className="header-left">
							<div className="header-logo">
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
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu">
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
											<Link href="#">Shuttle</Link>
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
											<Link href="/blog-list">Blog</Link>
										</li>
										<li>
											<Link href="/contact">Kontak Kami</Link>
										</li>

										{/* <li className="has-children">
                      <Link href="#">Home</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/">Home page v1</Link>
                        </li>
                        <li>
                          <Link href="/index-2">Home page v2</Link>
                        </li>
                        <li>
                          <Link href="/index-3">Home page v3</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="mega-li-small has-children">
                      <Link href="#">Vehicles</Link>
                      <div className="mega-menu">
                        <div className="mega-menu-inner mega-menu-inner-small">
                          <div className="row">
                            <div className="col-lg-6">
                              <h6 className="text-lg-bold neutral-1000">
                                Cars List
                              </h6>
                              <ul className="sub-menu">
                                <li>
                                  <Link href="/cars-list-1">Cars List v1</Link>
                                </li>
                                <li>
                                  <Link href="/cars-list-2">Cars List v2</Link>
                                </li>
                                <li>
                                  <Link href="/cars-list-3">Cars List v3</Link>
                                </li>
                                <li>
                                  <Link href="/cars-list-4">Cars List v4</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-6">
                              <h6 className="text-lg-bold neutral-1000">
                                Car Details
                              </h6>
                              <ul className="sub-menu">
                                <li>
                                  <Link href="/cars-details-1">
                                    Car Details v1
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/cars-details-2">
                                    Car Details v2
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/cars-details-3">
                                    Car Details v3
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/cars-details-4">
                                    Car Details v4
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="mega-li-small has-children">
                      <Link href="#">Dealers</Link>
                      <div className="mega-menu">
                        <div className="mega-menu-inner mega-menu-inner-small mega-menu-inner-destinations">
                          <ul className="sub-menu">
                            <li>
                              <Link href="/dealer-listing">
                                Dealers Listing
                              </Link>
                            </li>
                            <li>
                              <Link href="/dealer-details">Dealer Details</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="has-children">
                      <Link href="#">Shop</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/shop-list">Shop Grid</Link>
                        </li>
                        <li>
                          <Link href="/shop-details">Product Details</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-children">
                      <Link href="#">Pages</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/about-us">About Us</Link>
                        </li>
                        <li>
                          <Link href="/services">Our Services</Link>
                        </li>
                        <li>
                          <Link href="/pricing">Pricing</Link>
                        </li>
                        <li>
                          <Link href="/calculator">Loan Calculator</Link>
                        </li>
                        <li>
                          <Link href="/faqs">FAQs</Link>
                        </li>
                        <li>
                          <Link href="/term">Term</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contact</Link>
                        </li>
                        <li>
                          <Link href="/login">Login</Link>
                        </li>
                        <li>
                          <Link href="/register">Register</Link>
                        </li>
                        <li>
                          <Link href="/404">Error 404</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-children">
                      <Link href="#">News</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/blog-grid">News Grid</Link>
                        </li>
                        <li>
                          <Link href="/blog-list">News List</Link>
                        </li>
                        <li>
                          <Link href="/blog-details">News Details</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li> */}
									</ul>
								</nav>
							</div>
							<div className="header-right">
								<div className="d-none d-xxl-inline-block align-middle mr-15">
									<Link className="btn btn-signin neutral-1000 " href="/login">
										Sign in
									</Link>
									<div className="d-none d-xxl-inline-block align-middle mr-15">
										<ThemeSwitch />
									</div>
									<Link
										className="btn btn-signin background-brand-2 text-dark"
										href="#"
									>
										Add Listing
									</Link>
								</div>
								<div
									className="burger-icon-2 burger-icon-white"
									onClick={handleOffcanvas}
								>
									<img
										src={withBasePath("/assets/imgs/template/icons/menu.svg")}
										alt="Gracetrans"
									/>
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
