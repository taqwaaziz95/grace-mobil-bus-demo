"use client";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import MyDatePicker from "./MyDatePicker";
import Link from "next/link";

export default function HeroSearch() {
	const [pickUpLocation, setPickUpLocation] = useState("Central Park, Jakarta");
	const [dropOffLocation, setDropOffLocation] = useState("Bandung, Indonesia");
	const [passengerType, setPassengerType] = useState("Warga");

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
							{pickUpLocation}
						</Dropdown.Toggle>
						<Dropdown.Menu as="ul" className="dropdown-menu">
							<Dropdown.Item
								onClick={() => setPickUpLocation("Jakarta Barat, Indonesia")}
							>
								Jakarta Barat, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Central Park, Jakarta")}
							>
								Central Park, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Jakarta Selatan, Indonesia")}
							>
								Jakarta Selatan, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Pondok Indah, Jakarta")}
							>
								Pondok Indah, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Kemang, Jakarta")}
							>
								Kemang, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Menteng, Jakarta")}
							>
								Menteng, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Kebayoran Baru, Jakarta")}
							>
								Kebayoran Baru, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Tebet, Jakarta")}
							>
								Tebet, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Kelapa Gading, Jakarta")}
							>
								Kelapa Gading, Jakarta
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setPickUpLocation("Sudirman, Jakarta")}
							>
								Sudirman, Jakarta
							</Dropdown.Item>
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
							{dropOffLocation}
						</Dropdown.Toggle>
						<Dropdown.Menu as="ul" className="dropdown-menu">
							<Dropdown.Item
								onClick={() => setDropOffLocation("Jakarta, Indonesia")}
							>
								Jakarta, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Bali, Indonesia")}
							>
								Bali, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Surabaya, Indonesia")}
							>
								Surabaya, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Bandung, Indonesia")}
							>
								Bandung, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Medan, Indonesia")}
							>
								Medan, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Yogyakarta, Indonesia")}
							>
								Yogyakarta, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Semarang, Indonesia")}
							>
								Semarang, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Makassar, Indonesia")}
							>
								Makassar, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Palembang, Indonesia")}
							>
								Palembang, Indonesia
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setDropOffLocation("Batam, Indonesia")}
							>
								Batam, Indonesia
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="item-search item-search-3">
					<label className="text-sm-bold neutral-500">Berangkat</label>
					<div className="box-calendar-date">
						<MyDatePicker />
					</div>
				</div>
				<div className="item-search item-search-3">
					<label className="text-sm-bold neutral-500">Kembali</label>
					<div className="box-calendar-date">
						<MyDatePicker />
					</div>
				</div>
				<div className="item-people-used">
					<label className="text-sm-bold neutral-500">Penumpang</label>
					<Dropdown className="dropdown">
						<Dropdown.Toggle
							as="div"
							className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
						>
							{passengerType}
						</Dropdown.Toggle>
						<Dropdown.Menu as="ul" className="dropdown-menu">
							<Dropdown.Item onClick={() => setPassengerType("Warga")}>
								Warga
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setPassengerType("Non Warga")}>
								Non Warga
							</Dropdown.Item>
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
