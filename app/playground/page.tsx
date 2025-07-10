"use client";
import React, { useState } from "react";
import {
	Input,
	TextArea,
	RadioButton,
	Select,
	Heading,
	Paragraph,
	Label,
	Card,
	Grid,
	Avatar,
	Alert,
	Spinner,
	Navbar,
	Modal,
	Accordion,
	Dropdown,
	List,
	ListGroup,
	Button,
} from "@/components/all-reusables";

import Alertx from "react-bootstrap/Alert";

import ThemeSwitch from "@/components/elements/ThemeSwitch";
import ReusableSwiper from "@/components/elements/ReusableSwiper";
import ShuttleFilter from "@/components/elements/ShuttleFilter";
import RentFilter from "@/components/elements/RentFilter";
import { swiperGroup1 } from "@/util/swiperOptions";
import VideoTestimonial from "@/components/video-testimonial";
import Cardx from "@/components/card";
import Buttons from "@/components/button";

import Link from "next/link";
import CardSwiper from "@/components/card-swiper";
import ContactLocation from "@/components/contact";

const PlaygroundPage: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [dropdownValue, setDropdownValue] = useState<string | number>("");
	const [accordionIndex, setAccordionIndex] = useState<number | null>(null);
	const menu = [
		{ label: "Tentang", href: "/tentang" },
		{
			label: "Sewa Kendaraan",
			children: [
				{ label: "Antar Jemput Bandara", href: "/about-us" },
				{ label: "Harian", href: "/services" },
				{ label: "Bulanan", href: "/pricing" },
			],
		},
		{
			label: "Shuttle",
			children: [
				{ label: "Resident", href: "/about-us" },
				{ label: "Korporat", href: "/services" },
				{ label: "Antar Kota", href: "/pricing" },
				{ label: "Shopping Mall", href: "/calculator" },
			],
		},
		{ label: "Blog", href: "/blog-list" },
		{ label: "Kontak Kami", href: "/contact" },
	];

	const slides = [
		{
			key: "shuttle",
			content: (
				<div className="item-banner-slide banner-2 tw:!h-[600px]">
					<div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center">
						<h1 className="color-white tw:!mb-12 tw:!z-1">Contoh Swiper 1</h1>
						{/* <ShuttleFilter /> */}
					</div>
				</div>
			),
		},
		{
			key: "rental",
			content: (
				<div className="item-banner-slide banner-2 tw:!h-[600px]">
					<div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center">
						<h1 className="color-white tw:!mb-12 tw:!z-1">Contoh Swiper 2</h1>
						{/* <RentFilter /> */}
					</div>
				</div>
			),
		},
	];

	const slideCard = [
		{
			image: "/assets/imgs/blog/blog-1/img-2.png",
			date: "18 Sep 2024",
			time: "6 mins",
			comments: "38",
			tag: "Trend",
			title: "2025 BMW 5 Series Review: A balanced luxury sedan",
			authorName: "Steven Job",
			authorAvatar: "/assets/imgs/blog/blog-1/avatar-2.png",
			link: "/blog-details",
		},

		{
			image: "/assets/imgs/blog/blog-1/img-2.png",
			date: "18 Sep 2024",
			time: "6 mins",
			comments: "38",
			tag: "Trend",
			title: "2025 BMW 5 Series Review: A balanced luxury sedan",
			authorName: "Steven Job",
			authorAvatar: "/assets/imgs/blog/blog-1/avatar-2.png",
			link: "/blog-details",
		},
		{
			image: "/assets/imgs/blog/blog-1/img-2.png",
			date: "18 Sep 2024",
			time: "6 mins",
			comments: "38",
			tag: "Trend",
			title: "2025 BMW 5 Series Review: A balanced luxury sedan",
			authorName: "Steven Job",
			authorAvatar: "/assets/imgs/blog/blog-1/avatar-2.png",
			link: "/blog-details",
		},
		{
			image: "/assets/imgs/blog/blog-1/img-2.png",
			date: "18 Sep 2024",
			time: "6 mins",
			comments: "38",
			tag: "Trend",
			title: "2025 BMW 5 Series Review: A balanced luxury sedan",
			authorName: "Steven Job",
			authorAvatar: "/assets/imgs/blog/blog-1/avatar-2.png",
			link: "/blog-details",
		},
		{
			image: "/assets/imgs/blog/blog-1/img-2.png",
			date: "18 Sep 2024",
			time: "6 mins",
			comments: "38",
			tag: "Trend",
			title: "2025 BMW 5 Series Review: A balanced luxury sedan",
			authorName: "Steven Job",
			authorAvatar: "/assets/imgs/blog/blog-1/avatar-2.png",
			link: "/blog-details",
		},
		// Add more slides here...
	];

	const rightContent = (
		<>
			<button className="tw:!mr-4" aria-label="Switch to Indonesian">
				<span role="img" aria-label="Indonesia Flag" style={{ fontSize: 24 }}>
					<img
						src="/assets/imgs/icons/id.svg"
						alt="ID Flag"
						style={{ width: 24, height: 24, display: "inline-block" }}
					/>
				</span>
			</button>
			<button aria-label="Switch to English (UK)">
				<span role="img" aria-label="UK Flag" style={{ fontSize: 24 }}>
					<img
						src="/assets/imgs/icons/en-us.svg"
						alt="ID Flag"
						style={{ width: 24, height: 24, display: "inline-block" }}
					/>
				</span>
			</button>
		</>
	);
	return (
		<div className="tw:p-8 tw:space-y-12">
			<Heading level={3} className="tw:mb-6">
				Contoh Header Reusables
			</Heading>
			<Navbar
				menu={menu}
				rightContent={rightContent}
				onBurgerClick={() => console.log("Burger menu clicked")}
				onMobileMenuClick={() => console.log("Mobile menu clicked")}
			/>
			<Heading level={5} className="tw:mb-6">
				All Reusables Documentation
			</Heading>

			<>
				{[
					"primary",
					"secondary",
					"success",
					"danger",
					"warning",
					"info",
					"light",
					"dark",
				].map((variant) => (
					<Alertx key={variant} variant={variant}>
						This is a {variant} alert—check it out!
					</Alertx>
				))}
			</>
			<Card header={<Heading level={4}>Contoh Button</Heading>}>
				<div className="tw:flex tw:gap-4 tw:mb-4">
					<Buttons variant="primary" size="small" className="tw:mb-4">
						Pelajari Tentang Kami
					</Buttons>
					<Buttons variant="danger" size="small" className="tw:mb-4">
						Pelajari Tentang Kami
					</Buttons>
				</div>
				<Paragraph>
					Use{" "}
					<code>{`<Button variant="primary" size="small">Text</Button>`}</code>
				</Paragraph>
			</Card>

			<Card header={<Heading level={4}>Contoh Swiper</Heading>}>
				<CardSwiper
					title="Aku Adalah Swiper"
					description="Stay ahead with the latest car releases and upcoming events"
					slides={slideCard}
					swiperProps={{
						breakpoints: {
							640: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						},
					}}
				/>
			</Card>

			<Card header={<Heading level={4}>Contoh Contact Map</Heading>}>
				<ContactLocation
					title="Kantor Kami"
					address="Rukan City Walk Blok B3 No.5, Jl. Pd. Cabe Raya No.Kel, Pondok Cabe Udik, Pamulang, South Tangerang City, Banten 15418"
					phone="+62 812 3456 7890"
					email="halo@contoh.co.id"
					hours="Senin–Jumat: 09.00–18.00"
					mapUrl="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d283661.3575233618!2d2.2296777857951824!3d47.16509219592609!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1712486491620!5m2!1svi!2s"
				/>
			</Card>

			<div className="tw:!max-w-sm tw:!bg-white tw:!border tw:!border-gray-200 tw:!rounded-lg tw:!shadow-sm dark:tw:!bg-gray-800 dark:tw:!border-gray-700">
				<a href="#">
					<img
						className="tw:!rounded-t-lg"
						src="/docs/images/blog/image-1.jpg"
						alt=""
					/>
				</a>
				<div className="tw:p-5">
					<a href="#">
						<h5 className="tw:mb-2 tw:text-2xl tw:font-bold tw:tracking-tight tw:text-gray-900 dark:tw:text-white">
							Noteworthy technology acquisitions 2021
						</h5>
					</a>
					<p className="tw:mb-3 tw:font-normal tw:text-gray-700 dark:tw:text-gray-400">
						Here are the biggest enterprise technology acquisitions of 2021 so
						far, in reverse chronological order.
					</p>
					<a
						href="#"
						className="tw:inline-flex tw:items-center tw:px-3 tw:py-2 tw:text-sm tw:font-medium tw:text-center tw:text-white tw:bg-blue-700 tw:rounded-lg hover:tw:bg-blue-800 focus:tw:ring-4 focus:tw:outline-none focus:tw:ring-blue-300 dark:tw:bg-blue-600 dark:hover:tw:bg-blue-700 dark:focus:tw:ring-blue-800"
					>
						Read more
						<svg
							className="rtl:tw:rotate-180 tw:w-3.5 tw:h-3.5 tw:ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</a>
				</div>
			</div>

			{/* Select */}
			<Card header={<Heading level={2}>Select</Heading>}>
				<div className="tw:flex tw:gap-4 tw:mb-4">
					<Select
						label="Pilih Mobil"
						options={[
							{ label: "One", value: 1 },
							{ label: "Two", value: 2 },
						]}
					/>
					<Select
						label="Pilih Motor"
						options={[
							{ label: "One", value: 1 },
							{ label: "Two", value: 2 },
						]}
					/>
				</div>

				<Paragraph>
					Use{" "}
					<code>{`<Select label="Choose" options={[{ label: 'One', value: 1 }]} />`}</code>
				</Paragraph>
			</Card>
			{/* Typography */}
			<Card header={<Heading level={2}>Typography</Heading>}>
				<Heading level={3}>Heading 3</Heading>
				<Paragraph>Paragraph text</Paragraph>
				<Label>Label text</Label>
				<Paragraph>
					Use <code>{`<Heading level={3}>Text</Heading>`}</code>,{" "}
					<code>{`<Paragraph>Text</Paragraph>`}</code>,{" "}
					<code>{`<Label>Text</Label>`}</code>
				</Paragraph>
			</Card>
			{/* Avatar */}
			<Card header={<Heading level={2}>Avatar</Heading>}>
				<div className="tw:flex tw:gap-4 tw:mb-2">
					<Avatar name="Alice" />
					<Avatar name="Bob" src="/avatar.png" />
				</div>
				<Paragraph>
					Use <code>{`<Avatar name="Alice" />`}</code>
				</Paragraph>
			</Card>
			{/* Alert */}
			<Card header={<Heading level={2}>Alert</Heading>}>
				<Alert variant="info">This is an info alert.</Alert>
				<Alert variant="success">Success alert!</Alert>
				<Alert variant="warning">Warning alert!</Alert>
				<Alert variant="error">Error alert!</Alert>
				<Paragraph>
					Use <code>{`<Alert variant="info">Text</Alert>`}</code>
				</Paragraph>
			</Card>
			{/* Spinner */}
			<Card header={<Heading level={2}>Spinner</Heading>}>
				<Spinner />
				<Paragraph>
					Use <code>{`<Spinner />`}</code>
				</Paragraph>
			</Card>
			{/* Navbar */}
			{/* Modal */}
			<Card header={<Heading level={2}>Modal</Heading>}>
				<Button onClick={() => setModalOpen(true)}>Open Modal</Button>
				<Modal
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					title="Modal Title"
				>
					<Paragraph>This is a modal content.</Paragraph>
				</Modal>
				<Paragraph>
					Use <code>{`<Modal open={true} onClose={fn}>...</Modal>`}</code>
				</Paragraph>
			</Card>
			{/* Accordion */}
			<Card header={<Heading level={2}>Accordion</Heading>}>
				<Accordion
					items={[
						{ title: "Section 1", content: "Content 1" },
						{ title: "Section 2", content: "Content 2" },
					]}
				/>
				<Paragraph>
					Use <code>{`<Accordion items={[...]} />`}</code>
				</Paragraph>
			</Card>
			{/* Dropdown */}
			<Card header={<Heading level={2}>Dropdown</Heading>}>
				<Dropdown
					label={dropdownValue ? `Selected: ${dropdownValue}` : "Select option"}
					options={[
						{ label: "Option 1", value: 1 },
						{ label: "Option 2", value: 2 },
					]}
					onSelect={setDropdownValue}
				/>
				<Paragraph>
					Use{" "}
					<code>{`<Dropdown label="Select" options={[...]} onSelect={fn} />`}</code>
				</Paragraph>
			</Card>
			{/* List */}
			<Card header={<Heading level={2}>List</Heading>}>
				<List items={["Item 1", "Item 2", "Item 3"]} />
				<Paragraph>
					Use <code>{`<List items={[...]} />`}</code>
				</Paragraph>
			</Card>
			{/* ListGroup */}
			<Card header={<Heading level={2}>ListGroup</Heading>}>
				<ListGroup
					items={[
						{ label: "List 1", active: true },
						{ label: "List 2" },
						{ label: "List 3" },
					]}
				/>
				<Paragraph>
					Use <code>{`<ListGroup items={[...]} />`}</code>
				</Paragraph>
			</Card>
			<div>
				<section className="box-section block-banner-home3 position-relative">
					<div className="container-banner-home3 position-relative">
						<div className="box-swiper">
							<ReusableSwiper
								slides={slides}
								swiperProps={swiperGroup1}
								className="swiper-container swiper-group-1"
								showNavButtons
							/>
						</div>
					</div>
				</section>
			</div>
			<VideoTestimonial
				src="/videos/jirayut.mp4"
				name="KAKAKWAWA95"
				role="Programmer Cupu Ngga tau TW"
				testimonial="Saya sangat terkesan dengan fitur-fitur yang ada di aplikasi ini. UI-nya simpel, responsif, dan sangat mudah digunakan. Proses booking kendaraan jadi jauh lebih cepat dan efisien. Recomended banget buat yang butuh solusi transportasi modern!"
			/>
			<VideoTestimonial
				src="/videos/example.mp4"
				name="Customer Name"
				role="Customer Role"
				testimonial="Customer testimonial text."
				videoPosition="right"
			/>
			{/* <Cardx style={{ width: "18rem" }}>
				<Cardx.Img variant="top" src="/assets/imgs/dummy/cth-bis.jpg" />
				<Cardx.Body>
					<Cardx.Title>Cardx Title</Cardx.Title>
					<Cardx.Text>
						Some quick example text to build on the cardx title and make up the
						bulk of the cardx's content.
					</Cardx.Text>
					<Buttonx variant="primary">Go somewhere</Buttonx>
				</Cardx.Body>
			</Cardx> */}
			<Cardx
				imageSrc="/assets/imgs/dummy/cth-bis.jpg"
				title="Card Title"
				text="Some quick example text to build on the card title and make up the bulk of the card's content."
				buttonText="Go somewhere"
				onButtonClick={() => alert("Button clicked!")}
				style={{ width: "18rem", height: "24rem" }}
			/>
		</div>
	);
};

export default PlaygroundPage;
