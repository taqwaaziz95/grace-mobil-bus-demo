import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function Offcanvas({ isOffcanvas, handleOffcanvas }: any) {
	const [isUserChecked, setIsUserChecked] = useState(false);
	const [user, setUser] = useState<string | null>(null);
	useEffect(() => {
		// Check if user is logged in
		const loggedInUser = localStorage.getItem("username");
		if (loggedInUser) {
			setUser(loggedInUser);
		}
		setIsUserChecked(true);
	}, []);

	console.log("user", user);
	return (
		<>
			<div
				className={`sidebar-canvas-wrapper perfect-scrollbar button-bg-2 ${
					isOffcanvas ? "sidebar-canvas-visible" : ""
				}`}
			>
				<div className="sidebar-canvas-container">
					<div className="sidebar-canvas-head">
						{/* <div className="sidebar-canvas-logo">
              <Link className="d-flex" href="/">
                <img
                  className="light-mode"
                  alt="Gracetrans"
                  src="/assets/imgs/template/grace-logo.png"
                />
                <img
                  className="dark-mode"
                  alt="Gracetrans"
                  src="/assets/imgs/template/grace-logo.png"
                />
              </Link>
            </div> */}
						<div className="sidebar-canvas-lang">
							{/* <div className="d-inline-block box-dropdown-cart align-middle mr-15">
                <span className="text-14-medium icon-list icon-account icon-lang">
                  <span className="text-14-medium arrow-down text-dark">
                    EN
                  </span>
                </span>
                <div className="dropdown-account">
                  <ul>
                    <li>
                      <Link className="text-sm-medium" href="#">
                        English
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm-medium" href="#">
                        French
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm-medium" href="#">
                        Chinese
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
							{/* <div className="d-inline-block box-dropdown-cart align-middle mr-15">
                <span className="text-14-medium icon-list icon-cart">
                  <span className="text-14-medium arrow-down text-dark">
                    USD
                  </span>
                </span>
                <div className="dropdown-cart">
                  <ul>
                    <li>
                      <Link className="text-sm-medium" href="#">
                        USD
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm-medium" href="#">
                        EUR
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm-medium" href="#">
                        SGP
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
							<a className="close-canvas" onClick={handleOffcanvas}>
								{" "}
								<img
									alt="Gracetrans"
									src="/assets/imgs/template/icons/close.png"
								/>
							</a>
						</div>
					</div>
					<div className="sidebar-canvas-content">
						{user ? (
							<div className="box-author-profile">
								<div className="card-author">
									<div className="card-image">
										<img
											src="/assets/imgs/page/homepage1/author2.png"
											alt="Gracetrans"
										/>
									</div>
									<div className="card-info">
										<p className="text-md-bold neutral-1000">Halo, Steven</p>
										<p className="text-xs neutral-1000">Saldo: Rp200.000</p>
									</div>
								</div>
								<Link className="btn btn-black" href="#">
									Keluar
								</Link>
							</div>
						) : (
							<div className="tw:!flex-row tw:!justify-center tw:!items-center tw:!flex tw:!mb-10">
								<div className="tw:!mr-4">Anda belum Login</div>
								<Link className="btn btn-black" href="/login">
									Login
								</Link>
							</div>
						)}

						<div className="sidebar-banner">
							<div className="position-relative">
								<p className="text-xl-bold neutral-1000 mb-4">Daftar Tiket</p>
								<ul className="space-y-3">
									{/* Example Booking List */}
									{[
										{
											route: "Foresta → Melati Mas",
											date: "25/03/2025",
											time: "05:00",
											seat: "1C",
											price: 90000,
										},
										{
											route: "Foresta → Melati Mas",
											date: "26/03/2025",
											time: "05:00",
											seat: "2A",
											price: 120000,
										},
									].map((ticket, idx) => (
										<li key={idx} className="border-b pb-2">
											<p className="text-md-bold">{ticket.route}</p>
											<p className="text-sm text-gray-700">
												{ticket.date} {ticket.time} - Kursi: {ticket.seat}
											</p>
											<p className="text-md-bold">
												Rp{ticket.price.toFixed(0)}
											</p>
										</li>
									))}
								</ul>
							</div>
						</div>

						<Link href="/booking">
							<button className="btn btn-clear text-xs-medium">
								Pembayaran
							</button>
						</Link>

						{/* <div className="box-contactus">
              <h6 className="title-contactus neutral-1000">Contact Us</h6>
              <div className="contact-info">
                <p className="address-2 text-md-medium neutral-1000">
                  4517 Washington Ave. <br />
                  Manchester, Kentucky 39495
                </p>
                <p className="hour-work-2 text-md-medium neutral-1000">
                  Hours: 8:00 - 17:00, Mon - Sat
                </p>
                <p className="email-2 text-md-medium neutral-1000">
                  support@carento.com
                </p>
              </div>
            </div> */}
					</div>
				</div>
			</div>
			{isOffcanvas && (
				<div className="body-overlay-1" onClick={handleOffcanvas} />
			)}
		</>
	);
}
