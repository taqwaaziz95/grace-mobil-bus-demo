"use client";
import Link from "next/link";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import MyDatePicker from "./MyDatePicker";

export default function HeroSearch() {
	return (
		<>
			<div className="box-bottom-search background-card">
				<div className="item-search">
					<label className="text-sm-bold neutral-500">Pick Up Location</label>
					<Dropdown className="dropdown">
						<Dropdown.Toggle
							as="div"
							className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
							aria-expanded="false"
						>
							Central Park, Jakarta
						</Dropdown.Toggle>
						<Dropdown.Menu as="ul" className="dropdown-menu">
							<li>
								<Link className="dropdown-item" href="#">
									Jakarta Barat, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Central Park, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Jakarta Selatan, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Pondok Indah, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Kemang, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Menteng, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Kebayoran Baru, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Tebet, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Kelapa Gading, Jakarta
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Sudirman, Jakarta
								</Link>
							</li>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="item-search item-search-2">
					<label className="text-sm-bold neutral-500">Drop Off Location</label>
					<Dropdown className="dropdown">
						<Dropdown.Toggle
							as="div"
							className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
						>
							Bandung, Indonesia
						</Dropdown.Toggle>
						<Dropdown.Menu as="ul" className="dropdown-menu">
							<li>
								<Link className="dropdown-item" href="#">
									Jakarta, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Bali, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Surabaya, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Bandung, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Medan, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Yogyakarta, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Semarang, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Makassar, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Palembang, Indonesia
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Batam, Indonesia
								</Link>
							</li>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="item-search item-search-3">
					<label className="text-sm-bold neutral-500">
						Tanggal Keberangkatan
					</label>
					<div className="box-calendar-date">
						<MyDatePicker />
					</div>
				</div>
				<div className="item-people-used">
					<label className="text-sm-bold neutral-500">Tipe Penumpang</label>
					<Dropdown className="dropdown">
						<Dropdown.Toggle
							as="div"
							className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
						>
							Warga
						</Dropdown.Toggle>
						<Dropdown.Menu as="ul" className="dropdown-menu">
							<li>
								<Link className="dropdown-item" href="#">
									Warga
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Non Warga
								</Link>
							</li>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="item-search bd-none d-flex justify-content-end">
					<Link href="/cars-list-1">
						<button className="btn btn-brand-2 text-nowrap">
							<svg
								className="me-2"
								width={20}
								height={20}
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z"
									stroke="#000000"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className="text-white">Find a Bus</span>
						</button>
					</Link>
				</div>
			</div>
		</>
	);
}
