"use client";

import { Alert } from "@/components/alert";
import { LinkButton } from "@/components/button";
import Card from "@/components/card";
import { Input, MultiTextInput } from "@/components/inputs";
import { Star, PhoneCall, Car, Shield, FileText } from "lucide-react";
import {
	Blockquote,
	Caption,
	Code,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	LI,
	OL,
	P,
	Pre,
	UL,
} from "@/components/typography";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { swiperGroupAnimate } from "@/util/swiperOptions";
import Accordion, { AccordionItem } from "@/components/accordion";
import Link from "next/link";
import RadioButton from "@/components/radio-button";
import { Checkbox } from "@/components/checkbox";
import { size } from "lodash";
import CustomGridImage from "@/components/custom-grid-image";
import Breadcrumbs from "@/components/breadcrumbs";
import { on } from "events";
import CustomDatePicker from "@/components/date-picker";
import SelectInput from "@/components/select-input";
import BookingCards from "@/components/booking-cards";
import HeroSearch from "@/components/elements/HeroSearch";
import CategoryButton from "../HeroSearch/CategoryButton";
import CustomFooter from "@/components/layout/CustomFooter";
import CustomMarquee from "@/components/layout/CustomMarquee";
import { withBasePath } from "@/lib/basePath";
import CustomHeroBanner from "@/components/layout/CustomHeroBanner";
import VideoTestimonial from "@/components/video-testimonial";
import LeftIconGridCard from "@/components/left-icon-grid-card";
import StatsSection from "@/components/stats-section";
import JumbotronHeader from "@/components/jumbotron-header";
import DetailsCard, { DetailsCardList } from "@/components/details-card";
import CarCard, { CarCardList } from "@/components/car-card";
import BookingModal from "@/components/modal/BookingModal";
import CheckOutList from "@/components/check-out-list";
import {
	CheckoutPaymentSection,
	CountdownTimer,
	PaymentMethodSelector,
	PaymentSummary,
} from "@/components/payment-components";

// Define the RadioButtonColor type if not imported from the component
type RadioButtonColor =
	| "primary"
	| "secondary"
	| "white"
	| "black"
	| "gray"
	| "accent"
	| "warning"
	| "danger"
	| "info"
	| "disabled";

// Define the RadioButtonSize type if not imported from the component
type RadioButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Sidebar items
const sidebarItems = [
	{ key: "button", label: "Button" },
	{ key: "input", label: "Input" },
	{ key: "select-input", label: "Select Input" },
	{ key: "datePicker", label: "Date Picker" },
	{ key: "alert", label: "Alert" },
	{ key: "typography", label: "Typography" },
	{ key: "card", label: "Card" },
	{ key: "accordion", label: "Accordion" },
	{ key: "radio", label: "Radio Button" },
	{ key: "checklist", label: "Checklist Button" },
	{ key: "breadcrumbs", label: "Breadcrumbs" },
	{ key: "custom-grid-components", label: "Custom Image Grid Section" },
	{ key: "custom-components", label: "All Custom Reusable" },
];

const teamMembers = [
	{
		type: "team-card" as const,
		imageSrc: "/assets/imgs/team/team-1/portrait-1.png",
		name: "Aldo RP",
		role: "CTO (Chief Tech Officer)",
		profileLink: "#",
		onClick: () => alert("Aldo's profile clicked!"),
		socialIcons: [
			{
				iconSrc: "/assets/imgs/team/team-1/icon-1.svg",
				iconAlt: "icon1",
				iconLink: "#",
				onClick: () => alert("Icon 1 clicked!"),
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-2.svg",
				iconAlt: "icon2",
				iconLink: "#",
				onClick: () => alert("Icon 2 clicked!"),
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-3.svg",
				iconAlt: "icon3",
				iconLink: "#",
				onClick: () => alert("Icon 3 clicked!"),
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-4.svg",
				iconAlt: "icon4",
				iconLink: "#",
				onClick: () => alert("Icon 4 clicked!"),
			},
		],
		arrowIconSrc: "/assets/imgs/team/team-1/arrow-up-right.svg",
	},
	{
		type: "team-card" as const,
		imageSrc: "/assets/imgs/team/team-1/portrait-2.png",
		name: "Willy Andika",
		role: "CFO (Chief Financial Officer)",
		profileLink: "#",
		onClick: () => alert("Willy's profile clicked!"),
		socialIcons: [
			{
				iconSrc: "/assets/imgs/team/team-1/icon-1.svg",
				iconAlt: "icon1",
				iconLink: "#",
				onClick: () => alert("Icon 1 clicked!"),
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-2.svg",
				iconAlt: "icon2",
				iconLink: "#",
				onClick: () => alert("Icon 2 clicked!"),
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-3.svg",
				iconAlt: "icon3",
				iconLink: "#",
				onClick: () => alert("Icon 3 clicked!"),
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-4.svg",
				iconAlt: "icon4",
				iconLink: "#",
				onClick: () => alert("Icon 4 clicked!"),
			},
		],
		arrowIconSrc: "/assets/imgs/team/team-1/arrow-up-right.svg",
	},
	// ...add more team members here
];

// set alert here

// data/testimonialData.ts

export const testimonialData = [
	{
		title: "No Hidden Fees",
		content:
			"The attention to detail in the booking process made our trip stress-free, allowing us to focus on creating lasting memories together.",
		authorName: "Sophia Moore",
		authorLocation: "New York",
		authorImage: "/assets/imgs/testimonials/testimonials-1/author-1.png",
		rating: 5,
	},
	{
		title: "Excellent Service",
		content:
			"Superb customer support and seamless booking experience. We felt taken care of every step of the way.",
		authorName: "Michael Johnson",
		authorLocation: "California",
		authorImage: "/assets/imgs/testimonials/testimonials-1/author-2.png",
		rating: 5,
	},
	{
		title: "Highly Recommended",
		content:
			"I was impressed by the transparency and clarity of the entire process. No surprises, just quality service.",
		authorName: "Emily Smith",
		authorLocation: "Texas",
		authorImage: "/assets/imgs/testimonials/testimonials-1/author-3.png",
		rating: 5,
	},
	{
		title: "Stress-Free Rental",
		content:
			"Booking was fast and easy. The team was available for support at any time. Will book again for sure!",
		authorName: "James Williams",
		authorLocation: "Florida",
		authorImage: "/assets/imgs/testimonials/testimonials-1/author-4.png",
		rating: 5,
	},
];

// data/whyData.tsx

export const whyData = [
	{
		icon: (
			<svg width={62} height={62} viewBox="0 0 62 62" fill="none">
				<circle cx="31" cy="31" r="30" fill="#E0F2FE" />
				<rect x="18" y="26" width="26" height="18" rx="4" fill="#38BDF8" />
				<rect x="23" y="31" width="16" height="8" rx="2" fill="#fff" />
				<circle cx="31" cy="35" r="2" fill="#38BDF8" />
				<rect x="27" y="20" width="8" height="8" rx="4" fill="#38BDF8" />
				<rect x="29" y="22" width="4" height="4" rx="2" fill="#fff" />
			</svg>
		),
		title: "Choose a Location",
		description:
			"Select the ideal destination to begin your journey with ease.",
	},
	{
		icon: (
			<svg width={62} height={62} viewBox="0 0 62 62" fill="none">
				<circle cx="31" cy="31" r="30" fill="#FEF9C3" />
				<rect x="16" y="26" width="30" height="18" rx="4" fill="#FACC15" />
				<rect x="21" y="31" width="20" height="8" rx="2" fill="#fff" />
				<rect x="21" y="36" width="20" height="2" rx="1" fill="#FACC15" />
				<rect x="25" y="28" width="12" height="4" rx="2" fill="#fff" />
				<rect x="29" y="33" width="4" height="4" rx="2" fill="#FACC15" />
			</svg>
		),
		title: "Transparent Pricing",
		description: "Enjoy clear and upfront pricing with no surprises.",
	},
	{
		icon: (
			<svg width={62} height={62} viewBox="0 0 62 62" fill="none">
				<circle cx="31" cy="31" r="30" fill="#DCFCE7" />
				<rect x="18" y="24" width="26" height="14" rx="4" fill="#22C55E" />
				<rect x="23" y="29" width="16" height="4" rx="2" fill="#fff" />
				<rect x="27" y="36" width="8" height="4" rx="2" fill="#22C55E" />
				<rect x="29" y="38" width="4" height="2" rx="1" fill="#fff" />
				<rect x="31" y="18" width="2" height="8" rx="1" fill="#22C55E" />
				<rect x="29" y="16" width="6" height="4" rx="2" fill="#22C55E" />
			</svg>
		),
		title: "Convenient Booking",
		description:
			"Benefit from a variety of rental options, including weekend specials.",
	},
	{
		icon: (
			<svg width={62} height={62} viewBox="0 0 62 62" fill="none">
				<circle cx="31" cy="31" r="30" fill="#F3E8FF" />
				<rect x="18" y="22" width="26" height="18" rx="4" fill="#A21CAF" />
				<rect x="23" y="27" width="16" height="8" rx="2" fill="#fff" />
				<rect x="27" y="35" width="8" height="4" rx="2" fill="#A21CAF" />
				<rect x="29" y="37" width="4" height="2" rx="1" fill="#fff" />
				<circle cx="31" cy="31" r="3" fill="#A21CAF" />
				<rect x="31" y="18" width="2" height="6" rx="1" fill="#A21CAF" />
				<rect x="31" y="38" width="2" height="6" rx="1" fill="#A21CAF" />
			</svg>
		),
		title: "24/7 Customer Support",
		description:
			"Get assistance whenever you need it with our dedicated support team.",
	},
];

const faqs: AccordionItem[] = [
	{
		id: 1,
		question: "How do I make a reservation on your website?",
		answer:
			"Provide a step-by-step guide on how users can browse and book travel services on your platform. Simply select your destination, choose your dates, and follow the prompts to complete your booking.",
	},
	{
		id: 2,
		question: "What payment methods are accepted?",
		answer:
			"We accept major credit cards, debit cards, and online payment platforms such as PayPal and Stripe for your convenience.",
	},
	{
		id: 3,
		question: "Can I modify or cancel my booking?",
		answer:
			"Yes, you can modify or cancel your booking by logging into your account and visiting the 'My Bookings' section. Please note that cancellation policies may apply.",
	},
	{
		id: 4,
		question: "Is customer support available 24/7?",
		answer:
			"Absolutely! Our customer support team is available 24/7 to assist you with any inquiries or issues you may have before, during, or after your trip.",
	},
	{
		id: 5,
		question: "Are there any hidden fees in the booking process?",
		answer:
			"No, we believe in transparent pricing. All fees and charges are clearly displayed before you confirm your booking.",
	},
];

// Button Component Example
const ButtonDemo = () => {
	const [alertMsg, setAlertMsg] = useState<string | null>(null);
	const handleClick = (msg: string) => {
		setAlertMsg(msg);
		setTimeout(() => setAlertMsg(null), 2000);
	};
	return (
		<div className="tw:!space-y-4">
			<H3>Button</H3>
			<P>
				Berikut adalah contoh penggunaan <code>Button</code>. Anda dapat
				menyesuaikan tampilan, varian, ukuran, dan status tombol sesuai
				kebutuhan aplikasi Anda.
			</P>
			<div
				style={{
					position: "fixed",
					top: 24,
					right: 24,
					zIndex: 9999,
					transition: "transform 0.3s, opacity 0.3s",
					transform: alertMsg ? "translateY(0)" : "translateY(-40px)",
					opacity: alertMsg ? 1 : 0,
					pointerEvents: alertMsg ? "auto" : "none",
				}}
			>
				{alertMsg && (
					<Alert type="success" title="Success!">
						Button {alertMsg}
					</Alert>
				)}
			</div>
			<div className="tw:!flex tw:!gap-4 tw:!flex-wrap">
				<LinkButton
					href="#"
					variant="white"
					onClick={() => handleClick("Kontak Kami clicked!")}
				>
					Kontak Kami
				</LinkButton>
				<LinkButton
					href="#"
					variant="sky"
					onClick={() => handleClick("Pesan Shuttle clicked!")}
				>
					Pesan Shuttle
				</LinkButton>
				<LinkButton
					href="#"
					variant="yellow"
					onClick={() => handleClick("Sewa Mobil clicked!")}
				>
					Sewa Mobil
				</LinkButton>
			</div>
		</div>
	);
};

// Input Component Example
const InputDemo = () => (
	<div className="tw:!space-y-4">
		<h2 className="tw:!text-xl tw:!font-semibold">Input</h2>
		<Input placeholder="Type here..." />
		<Input placeholder="Small input" inputSize="sm" />
		<Input placeholder="Large input" inputSize="lg" />
		<h2 className="tw:!text-xl tw:!font-semibold">Input (Disabled)</h2>
		<Input placeholder="Disabled input" disabled />
		<h2 className="tw:!text-xl tw:!font-semibold">MultiTextInput</h2>
		<MultiTextInput placeholder="Type multiple lines..." rows={4} />

		<h2 className="tw:!text-xl tw:!font-semibold">MultiTextInput (Disabled)</h2>
		<MultiTextInput placeholder="Disabled textarea" rows={4} disabled />
	</div>
);

// Select Input Component Example
const SelectInputDemo = () => {
	const [dropOffLocation, setDropOffLocation] =
		useState<string>("Stasiun Gambir");

	const dropOffLocations = [
		"Bandara Soekarno-Hatta",
		"Stasiun Gambir",
		"Terminal Kampung Rambutan",
		"Pelabuhan Tanjung Priok",
	];

	return (
		<div className="tw:!space-y-4">
			<H2 className="tw:!text-xl tw:!font-semibold">Select Input</H2>
			<P>
				Select input adalah komponen yang memungkinkan pengguna memilih satu
				opsi dari daftar dropdown. Komponen ini berguna untuk memilih kategori,
				status, atau data lain yang memiliki pilihan terbatas.
			</P>

			<SelectInput
				label="Contoh Select Input"
				labelClassName="text-sm-bold neutral-500"
				value={dropOffLocation}
				options={dropOffLocations}
				onChange={setDropOffLocation}
				className="tw:!w-72 tw:!p-2 tw:!rounded-xl tw:!border-2 tw:!border-blue-200 tw:!shadow-lg tw:!bg-blue-50 tw:!transition-all tw:!duration-300 hover:tw:!border-blue-400 hover:tw:!shadow-xl"
			/>
		</div>
	);
};

// Date Select Input Component Example
const DatePickerDemo = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

	return (
		<div className="tw:!space-y-4">
			<H3>Custom Date Picker</H3>
			<P>
				Berikut adalah contoh penggunaan <code>Date Picker</code>. Komponen ini
				memungkinkan pengguna untuk memilih tanggal (atau rentang tanggal)
				dengan mudah melalui antarmuka kalender yang interaktif. Anda dapat
				menyesuaikan tampilan, format, serta batas tanggal sesuai kebutuhan
				aplikasi Anda.
			</P>
			<CustomDatePicker
				selected={selectedDate}
				onChange={(date) =>
					setSelectedDate(
						date instanceof Date ? date : Array.isArray(date) ? date[0] : null
					)
				}
				minDate={new Date()}
				startDate={startDate ?? undefined}
				endDate={endDate ?? undefined}
				selectsStart
			/>
			<P>
				Anda dapat menggunakan <code>Date Picker</code> untuk memilih satu
				tanggal, atau <code>Date Range Picker</code> untuk memilih rentang
				tanggal (daterange). Pilihan <strong>daterange</strong> memungkinkan
				pengguna memilih tanggal mulai dan tanggal akhir sekaligus melalui
				antarmuka kalender yang interaktif.
			</P>
			<CustomDatePicker
				type="date-range-picker"
				selected={range[0]}
				rangeValue={range}
				onChange={(update) => setRange(update as [Date | null, Date | null])}
			/>
		</div>
	);
};

// Alert Component Example
const AlertDemo = () => {
	const [show, setShow] = useState(false);
	const [alertType, setAlertType] = useState<
		"success" | "warning" | "error" | "info"
	>("success");
	const [alertTitle, setAlertTitle] = useState("Success!");
	const [alertMsg, setAlertMsg] = useState(
		"This alert will disappear after 3 seconds."
	);
	const timer = React.useRef<NodeJS.Timeout | null>(null);

	const handleShowAlert = (
		type: "success" | "warning" | "error" | "info",
		title: string,
		msg: string
	) => {
		setAlertType(type);
		setAlertTitle(title);
		setAlertMsg(msg);
		setShow(true);
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => setShow(false), 3000);
	};

	React.useEffect(() => {
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, []);

	return (
		<div className="tw:!space-y-4">
			<h2 className="tw:!text-xl tw:!font-semibold">Alert</h2>
			<div className="tw:!flex tw:!gap-4 tw:!items-center">
				<Alert
					type="success"
					title="Sukses Alert"
					className="tw:!mb-4 tw:!flex-1"
				>
					This is a Sukses alert.
				</Alert>
				<button
					className="tw:!bg-green-500 tw:!text-white tw:!px-4 tw:!py-2 tw:!rounded"
					onClick={() =>
						handleShowAlert(
							"success",
							"Sukses Alert",
							"This is a Sukses alert."
						)
					}
				>
					Show
				</button>
			</div>
			<div className="tw:!flex tw:!gap-4 tw:!items-center">
				<Alert
					type="warning"
					title="Warning Alert"
					className="tw:!mb-4 tw:!flex-1"
				>
					This is a warning alert.
				</Alert>
				<button
					className="tw:!bg-yellow-500 tw:!text-white tw:!px-4 tw:!py-2 tw:!rounded"
					onClick={() =>
						handleShowAlert(
							"warning",
							"Warning Alert",
							"This is a warning alert."
						)
					}
				>
					Show
				</button>
			</div>
			<div className="tw:!flex tw:!gap-4 tw:!items-center">
				<Alert type="error" title="Error Alert" className="tw:!mb-4 tw:!flex-1">
					This is a error alert.
				</Alert>
				<button
					className="tw:!bg-red-500 tw:!text-white tw:!px-4 tw:!py-2 tw:!rounded"
					onClick={() =>
						handleShowAlert("error", "Error Alert", "This is a error alert.")
					}
				>
					Show
				</button>
			</div>
			<div className="tw:!flex tw:!gap-4 tw:!items-center">
				<Alert type="info" title="Info Alert" className="tw:!mb-4 tw:!flex-1">
					This is a info alert.
				</Alert>
				<button
					className="tw:!bg-blue-500 tw:!text-white tw:!px-4 tw:!py-2 tw:!rounded"
					onClick={() =>
						handleShowAlert("info", "Info Alert", "This is a info alert.")
					}
				>
					Show
				</button>
			</div>
			<div
				style={{
					position: "fixed",
					top: 24,
					right: 24,
					zIndex: 9999,
					transition: "transform 0.3s, opacity 0.3s",
					transform: show ? "translateY(0)" : "translateY(-40px)",
					opacity: show ? 1 : 0,
					pointerEvents: show ? "auto" : "none",
				}}
			>
				{show && (
					<Alert type={alertType} title={alertTitle}>
						{alertMsg}
					</Alert>
				)}
			</div>
		</div>
	);
};

// Typography Component Example
const Typography = () => (
	<div className="tw:!space-y-6">
		<H3>Typography (Tipografi)</H3>
		<P>
			Tipografi adalah seni dan teknik mengatur huruf agar tulisan mudah dibaca,
			menarik, dan nyaman dilihat. Fungsi utama tipografi adalah untuk
			meningkatkan keterbacaan, memperkuat pesan, serta menciptakan tampilan
			visual yang konsisten dan estetis pada sebuah antarmuka atau dokumen.
		</P>
		<div className="tw:!space-y-6">
			<H1>Heading 1 (H1)</H1>
			<H2>Heading 2 (H2)</H2>
			<H3>Heading 3 (H3)</H3>
			<H4>Heading 4 (H4)</H4>
			<H5>Heading 5 (H5)</H5>
			<H6>Heading 6 (H6)</H6>

			<P>
				This is a <span className="tw:!font-semibold">paragraph</span> of text.
				You can use <span className="tw:!italic">italic</span>,{" "}
				<span className="tw:!underline">underline</span>,{" "}
				<span className="tw:!line-through">strikethrough</span>, and{" "}
				<span className="tw:!font-bold">bold</span> styles.
			</P>

			<P className="tw:!text-sm tw:!text-gray-500">
				This is a secondary text (small, muted).
			</P>

			<Blockquote>
				"Typography is the craft of endowing human language with a durable
				visual form."
			</Blockquote>

			<Code>const hello = "world";</Code>

			<Pre>
				{`function greet(name: string) {
  return "Hello, " + name + "!";
}`}
			</Pre>

			<UL>
				<LI>Unordered list item one</LI>
				<LI>Unordered list item two</LI>
			</UL>

			<OL>
				<LI>Ordered list item one</LI>
				<LI>Ordered list item two</LI>
			</OL>

			<Caption>Caption or helper text</Caption>
		</div>
	</div>
);

// Cards Component Example
const CardDemo = () => (
	<>
		<div className="container">
			<div className="row align-items-center justify-content-center">
				<div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
					<div className="text-center mb-5">
						<span className="text-xl-medium neutral-500">Cards</span>
						<H4>Team Cards Example</H4>
					</div>
				</div>
			</div>
			<div className="row mt-50">
				{teamMembers.slice(0, 16).map((member, idx) => (
					<Card key={idx} {...member} type="team-card" />
				))}
			</div>
		</div>

		<div className="container tw:!mt-12">
			<div className="row align-items-center justify-content-center">
				<div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
					<div className="text-center">
						<H4>Why Cards Example</H4>
					</div>
				</div>
			</div>
			<div className="row mt-30">
				{whyData.slice(0, 16).map((item, idx) => (
					<Card
						key={idx}
						type="why-card"
						icon={item.icon}
						title={item.title}
						description={item.description}
					/>
				))}
			</div>
		</div>

		<div className="container tw:!mt-12">
			<div className="row align-items-center justify-content-center">
				<div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
					<div className="text-center">
						<H4>Testimonial Cards Example</H4>
					</div>
				</div>
			</div>
			<div className="block-testimonials wow fadeIn ps-0 mask-image">
				<div className="container-testimonials">
					<div className="container-slider ps-0">
						<div className="box-swiper mt-30">
							<Swiper
								{...swiperGroupAnimate}
								className="swiper-container swiper-group-animate swiper-group-journey"
							>
								<div className="swiper-wrapper">
									{testimonialData.map((item, idx) => (
										<SwiperSlide className="swiper-slide" key={idx}>
											<Card
												type="testimonial-card"
												testimonialTitle={item.title}
												testimonialContent={item.content}
												authorName={item.authorName}
												authorLocation={item.authorLocation}
												authorImage={item.authorImage}
												rating={item.rating}
											/>
										</SwiperSlide>
									))}
								</div>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
);

// Accordion Component Example
const AccordionDemo = () => (
	<div className="tw:!space-y-4">
		<section className="section-box box-faqs background-body pt-0">
			<div className="box-faqs-inner">
				<div className="container">
					<div className="text-center">
						<span className="text-sm-bold bg-2 p-3 rounded-12">
							Accordion Example
						</span>
						<h3 className="mt-4 neutral-1000">Frequently Asked Questions</h3>
					</div>
					<div className="block-faqs">
						<Accordion items={faqs} />
					</div>
				</div>
			</div>
		</section>
	</div>
);

const CustomComponentsDemo = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("resident");

	const defaultBrands = [
		{
			lightMode: "/assets/imgs/page/homepage2/lexus.png",
			darkMode: withBasePath("/assets/imgs/page/homepage2/lexus-w.png"),
			alt: "Gracetransx",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/mer.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/mer-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/bugatti.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/bugatti-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/jaguar.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/jaguar-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/honda.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/honda-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/chevrolet.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/chevrolet-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/acura.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/acura-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/bmw.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/bmw-w.png"),
			alt: "Gracetrans",
		},
		{
			lightMode: withBasePath("/assets/imgs/page/homepage2/toyota.png"),
			darkMode: withBasePath("/assets/imgs/page/homepage2/toyota-w.png"),
			alt: "Gracetrans",
		},
	];

	const customFeaturesArray = [
		{
			icon: <Star size={24} />, // Use Lucide React icons
			title: "Jaminan Kenyamanan",
			description:
				"Kami memberikan kenyamanan terbaik bagi pengguna layanan transportasi sesuai standar pemerintah.",
		},
		{
			icon: <PhoneCall size={24} />,
			title: "Customer Service 24/7",
			description:
				"Pelayanan pelanggan 24 jam dengan layanan ramah dan responsif.",
		},
		{
			icon: <Car size={24} />,
			title: "Unit Pengganti",
			description:
				"Jika unit mengalami kendala, kami menyediakan unit pengganti sesuai pesanan awal.",
		},
		{
			icon: <Shield size={24} />,
			title: "Asuransi",
			description:
				"Kami menjamin keamanan dengan perlindungan asuransi jika terjadi kecelakaan.",
		},
		{
			icon: <FileText size={24} />,
			title: "Kelengkapan Surat Kendaraan",
			description:
				"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
		},
		{
			icon: <FileText size={24} />,
			title: "Kelengkapan Surat Kendaraan",
			description:
				"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
		},
		{
			icon: <FileText size={24} />,
			title: "Kelengkapan Surat Kendaraan",
			description:
				"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
		},
		{
			icon: <FileText size={24} />,
			title: "Kelengkapan Surat Kendaraan",
			description:
				"Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
		},
	];

	const statsData = [
		{ count: 45, suffix: "+", lines: ["Global", "Branches"] },
		{ count: 29, suffix: "K", lines: ["Destinations", "Collaboration"] },
		{ count: 20, suffix: "+", lines: ["Years", "Experience"] },
		{ count: 168, suffix: "K", lines: ["Happy", "Customers"] },
		{ count: 15, suffix: "M", lines: ["User", "Account"] },
	];

	const cardsDataDetails = [
		{
			imageSrc: "/assets/imgs/services/services-list-1/img-1.png",
			linkSrc: "/blog-details",
			title: "Daily and Weekly Car Rentals",
			description:
				"Flexible rental options available for both short-term and weekly needs, ideal for vacations or business trips.",
			buttonLabel: "View Details",
			buttonLink: "/blog-details",
			withBasePath,
		},

		{
			imageSrc: "/assets/imgs/services/services-list-1/img-1.png",
			linkSrc: "/blog-details",
			title: "Daily and Weekly Car Rentals",
			description:
				"Flexible rental options available for both short-term and weekly needs, ideal for vacations or business trips.",
			buttonLabel: "View Details",
			buttonLink: "/blog-details",
			withBasePath,
		},
		// ...more card objects
	];
	const [modalCar, setModalCar] = useState<any>(false);

	// Add paymentMethod state
	const [paymentMethod, setPaymentMethod] = useState<string>("");

	// Add countdown state for CountdownTimer
	const [countdown, setCountdown] = useState<number>(180);

	function handleBooking(car: any): void {
		setModalCar(car);
	}

	function handleCloseModal() {
		setModalCar(false);
	}

	const [selected, setSelected] = useState<number[]>([]);
	const bookings = [
		{
			bookingCode: "STL-2211",
			busName: "Medium Bus",
			busPlate: "B 2951 XYA",
			from: "Suvana Sutera",
			to: "Menteng",
			dateTime: "2023-10-15 08:00 AM",
			price: 120000,
		},
		{
			bookingCode: "RNT-2591",
			busName: "Innova Reborn",
			busPlate: "B 4582 ABC",
			from: "1 Bulan",
			to: "Mobil + Supir + Tol",
			dateTime: "2023-10-16 09:00 AM",
			price: 14000000,
		},
	];

	const handleSelect = (idx: number) => {
		setSelected((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	const total = selected.reduce((sum, idx) => sum + bookings[idx].price, 0);

	const handleCheckout = () => {
		// Your checkout logic here
	};

	function handlePayment(): void {
		// Example: Show a success alert and reset payment state
		alert("Payment successful! Thank you for your booking.");
		setPaymentMethod("");
		setCountdown(180); // Reset countdown timer
		// Optionally, you could clear selected bookings or trigger a modal, etc.
	}

	return (
		<div className="tw:!space-y-4">
			<H3>Custom Cards Components</H3>
			<div className="box-search-advance background-card tw:!top-0">
				<div className="box-top-search">
					<div className="left-top-search">
						<CategoryButton
							label="Resident"
							value="resident"
							selectedValue={selectedCategory}
							onSelect={setSelectedCategory}
						/>
						<CategoryButton
							label="Korporat"
							value="korporat"
							selectedValue={selectedCategory}
							onSelect={setSelectedCategory}
						/>
						<CategoryButton
							label="Antar Kota"
							value="antar-kota"
							selectedValue={selectedCategory}
							onSelect={setSelectedCategory}
						/>
						<CategoryButton
							label="Shopping Mall"
							value="mall"
							selectedValue={selectedCategory}
							onSelect={setSelectedCategory}
						/>
					</div>
					<div className="right-top-search d-none d-md-flex">
						<Link className="text-sm-medium need-some-help" href="/contact">
							Need help?
						</Link>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<BookingCards category={selectedCategory} />
				</div>
			</div>

			<H3>Custom Left Icon Grid Card with Header Title</H3>

			<LeftIconGridCard data={customFeaturesArray} />

			<H3>Custom Testimonial Video</H3>

			<VideoTestimonial
				src="/videos/jirayut.mp4"
				name="Jirayut Afsan Jehdueramaes"
				role="Penyanyi, Presenter, dan Aktor"
				testimonial="Orang nya keren, mobil nya bersih, bisa nyanyi ada karaoke juga. Pokoknya keren, terima kasih Grace Trans udah menemani dan libur bareng Jirayut. Kalau nanti ada waktu lagi kita jalan bareng lagi ya, terima kasih."
			/>

			<H3>Custom Marquee</H3>

			<CustomMarquee
				brands={defaultBrands}
				direction="right"
				pauseOnHover={false}
			/>

			<H3>Custom Stats Sections</H3>

			<StatsSection data={statsData} />

			<H3>Custom Jumbotron Header</H3>

			<JumbotronHeader
				bannerImg="/assets/imgs/page-header/banner1.png"
				title="Our Services (Custom Jumbotron Header)"
				subtitle="Perfect service, top experts"
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Services", href: "#", isActive: true },
				]}
				isBreadCrumbs={false}
			/>

			<H3>Custom Detail Card</H3>

			<DetailsCardList cards={cardsDataDetails} />

			<CarCardList
				cars={[
					{
						id: 1,
						name: "Toyota Avanza",
						location: "Jakarta",
						seats: 7,

						isSupir: false,
						carType: "MPV",
						image: "car-1.png",
						price: "Rp 350.000/hari",
						description: "Mobil keluarga irit dan nyaman.",
					},
					{
						id: 2,
						name: "Honda Brio",
						carType: "Sedan",
						location: "Tangerang",
						image: "car-2.png",
						price: "Rp 300.000/hari",
						description: "Mobil city car lincah dan ekonomis.",
					},
					{
						id: 3,
						name: "Suzuki Ertiga",
						carType: "MPV",
						location: "Cilegon",
						image: "car-3.png",
						price: "Rp 370.000/hari",
						description: "MPV modern untuk perjalanan jauh.",
					},
				]}
				handleBooking={handleBooking}
				category={selectedCategory}
			/>

			<H3>Custom Checkout List</H3>

			<CheckOutList
				bookings={bookings}
				selected={selected}
				onSelect={handleSelect}
				total={total}
				onCheckout={handleCheckout}
			/>

			<H3>Custom Pembayaran List</H3>

			<CheckoutPaymentSection
				paymentMethod={paymentMethod}
				setPaymentMethod={setPaymentMethod}
				onTopup={handleCloseModal}
				bookings={bookings}
				totalPrice={total}
				countdown={countdown}
				onPayment={handlePayment}
			/>

			<H3>Custom Banner / Banner Divider</H3>

			<CustomHeroBanner
				title="Come and Use Gracetrans"
				subtitle="Your trusted partner for seamless transportation solutions."
				backgroundImage={withBasePath(
					"/assets/imgs/cta/cta-2/background-2.png"
				)}
				kontakHref="/contact"
				kontakLabel="Contact Us"
				shuttleHref="/shuttle"
				shuttleLabel="Book Shuttle"
				rentHref="/rent"
				rentLabel="Rent a Car"
			/>

			<H3>Custom Footer</H3>
			<CustomFooter
				logoSrc={withBasePath("/assets/imgs/template/grace-logo.png")}
				mission="Anda bisa membuat custom visi dan misi anda di sini. agar lebih
				menarik dan sesuai dengan brand Anda."
				informasiLinks={["About Us", "Pricing", "Contact"]}
				kontak={{
					office1: "Your Office 1 Address",
					office2: "Your Office 2 Address",
					phone: "123-456-7890",
					email: "info@yourdomain.com",
					hours: "Mon-Fri: 8am-5pm",
				}}
				mapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15861.50048671!2d106.73755140892877!3d-6.345444646766658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef0b29e78801%3A0xefd715749f1392c9!2sGRACE%20TRANS%20(PT%20MATARI%20JELAJAH%20INDONESIA)!5e0!3m2!1sen!2sid!4v1752575930426!5m2!1sen!2sid"
				lokasiKantorTitle="Your Office Location"
				copyright="© 2025 Gracetrans. All rights reserved."
			/>

			{modalCar && (
				<BookingModal
					car={modalCar}
					onClose={handleCloseModal}
					handleBooking={() => handleBooking(modalCar)}
				/>
			)}
		</div>
	);
};

// Radio Component Example
const RadioButtonDemo = () => {
	const [selected, setSelected] = useState("option1");
	const radioOptions = [
		{ label: "Primary", value: "primary", color: "primary", size: "xl" },
		{ label: "Secondary", value: "secondary", color: "secondary", size: "sm" },
		// { label: "White", value: "white", color: "white" },
		// { label: "Black", value: "black", color: "black" },
		// { label: "Gray", value: "gray", color: "gray" },
		{ label: "Custom", value: "custom", color: "accent", size: "md" },
		{ label: "Warning", value: "warning", color: "warning", size: "lg" },
		{ label: "Danger", value: "danger", color: "danger", size: "xs" },
		// { label: "Info", value: "info", color: "info" },
		{ label: "Disabled", value: "disabled", color: "disabled", disabled: true },
	];
	return (
		<div className="tw:!space-y-4">
			<H3>Radio Button</H3>
			<P>
				Berikut adalah contoh penggunaan <code>RadioButton</code>. Anda dapat
				menyesuaikan label, nilai, dan grup radio sesuai kebutuhan aplikasi
				Anda.
			</P>
			<div className="tw:!flex tw:!gap-4">
				{radioOptions.map((option) => (
					<RadioButton
						key={option.value}
						label={option.label}
						name="demo-radio"
						color={option.color as RadioButtonColor}
						value={option.value}
						checked={selected === option.value}
						onChange={() => setSelected(option.value)}
						disabled={option.disabled}
						size={option.size as RadioButtonSize}
					/>
				))}
			</div>
			<div className="tw:!mt-2 tw:!text-gray-600">
				Selected: <span className="tw:!font-bold">{selected}</span>
			</div>

			<hr className="tw:!my-8" />

			<H6>Contoh: Persetujuan Syarat & Ketentuan</H6>
			<div className="tw:!flex tw:!gap-6 tw:!items-center">
				<RadioButton
					label="Setuju"
					name="agreement"
					color="primary"
					value="agree"
					checked={selected === "agree"}
					onChange={() => setSelected("agree")}
					size="md"
				/>
				<RadioButton
					label="Tidak Setuju"
					name="agreement"
					color="danger"
					value="decline"
					checked={selected === "decline"}
					onChange={() => setSelected("decline")}
					size="md"
				/>
			</div>
			<div className="tw:!mt-2 tw:!text-gray-600">
				{selected === "agree"
					? "You have agreed to the terms."
					: selected === "decline"
						? "You have declined the terms."
						: "Please select an option."}
			</div>
		</div>
	);
};

// Checklist Component Example
const ChecklistButtonDemo = () => {
	const checkboxOptions: {
		label: string;
		value: string;
		size: "xs" | "sm" | "md" | "lg" | "xl";
	}[] = [
		{ label: "Option Xs", value: "A", size: "xs" },
		{ label: "Option Sm", value: "B", size: "sm" },
		{ label: "Option Md", value: "C", size: "md" },
		{ label: "Option Lg", value: "D", size: "lg" },
		{ label: "Option Xl", value: "E", size: "xl" },
	];
	const [selected, setSelected] = useState<string[]>([]);

	const handleChange = (value: string) => {
		setSelected((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
		);
	};

	return (
		<div className="tw:!space-y-4">
			<H3>Checkbox Button</H3>
			<P>
				Berikut adalah contoh penggunaan <code>Checkbox Button</code>. Anda
				dapat menyesuaikan label, nilai, dan grup checkbox sesuai kebutuhan
				aplikasi Anda.
			</P>

			<H6>Checkbox Sizes</H6>
			<div className="tw:!flex tw:!gap-4">
				{checkboxOptions.map((opt) => (
					<Checkbox
						key={opt.value}
						label={opt.label}
						checked={selected.includes(opt.value)}
						onChange={() => handleChange(opt.value)}
						size={opt.size} // Use the size from the option
					/>
				))}
			</div>
			<div className="tw:!mt-2 tw:!text-gray-600">
				{/* Selected: <span className="tw:!font-bold">{selected}</span> */}
			</div>

			<hr className="tw:!my-8" />

			<H6>Contoh Penerapan: Pilih Fasilitas Mobil</H6>
			<P>
				Simulasi aplikasi: Pilih fasilitas tambahan yang Anda inginkan saat
				menyewa mobil.
			</P>
			<div className="tw:!flex tw:!gap-4">
				<Checkbox
					label="GPS"
					checked={selected.includes("gps")}
					onChange={() => handleChange("gps")}
					size="md"
				/>
				<Checkbox
					label="Child Seat"
					checked={selected.includes("child-seat")}
					onChange={() => handleChange("child-seat")}
					size="md"
				/>
				<Checkbox
					label="Asuransi"
					checked={selected.includes("insurance")}
					onChange={() => handleChange("insurance")}
					size="md"
				/>
			</div>
			<div className="tw:!mt-2 tw:!text-gray-600">
				Fasilitas dipilih:{" "}
				<span className="tw:!font-bold">
					{["gps", "child-seat", "insurance"]
						.filter((v) => selected.includes(v))
						.map((v) =>
							v === "gps"
								? "GPS"
								: v === "child-seat"
									? "Child Seat"
									: v === "insurance"
										? "Asuransi"
										: v
						)
						.join(", ") || "Tidak ada"}
				</span>
			</div>
		</div>
	);
};

const CustomGridImageDemo = () => (
	<div className="tw:!space-y-4">
		<h2 className="tw:!text-xl tw:!font-semibold">
			Custom Image Grid (Example 1)
		</h2>
		<CustomGridImage
			heading="The Future of Car Rental is Here"
			highlighted="Car Rental"
			description="Welcome to GraceTrans, your trusted partner in car rentals. Since our founding, we have been committed to providing our customers with a seamless and reliable car rental experience. Whether you're planning a business trip, a family vacation, or just need a vehicle for everyday use, we offer a wide range of vehicles to meet your needs."
			tagOne={{ number: "86", title: "Industry", subtitle: "Experts" }}
			tagTwo={{ number: "25", title: "Years in", subtitle: "Business" }}
		/>
		<div className="tw:!mt-8 tw:!p-4 tw:!bg-blue-50 tw:!rounded-lg tw:!border tw:!border-blue-100">
			<strong>Tips:</strong> You may customize the <strong>heading</strong>,{" "}
			<strong>highlighted</strong> text, <strong>description</strong>,{" "}
			<strong>image</strong>, and other properties of the{" "}
			<code>CustomGridImage</code> component to better suit your application's
			requirements.
		</div>
	</div>
);

// Breadcrumbs Component Example
const BreadcrumbsDemo = () => (
	<div className="tw:!space-y-4">
		<H2 className="tw:!text-xl tw:!font-semibold">Breadcrumbs</H2>
		<P>
			Breadcrumbs adalah navigasi berbasis jalur yang membantu pengguna memahami
			posisi mereka di dalam struktur situs atau aplikasi.
		</P>
		<Breadcrumbs
			routes={[
				{ label: "Home", href: "#", onClick: () => alert("Home clicked") },
				{ label: "About Us", href: "#", onClick: () => alert("About Us") },
			]}
			className="tw:!bg-blue-50 tw:!p-4 tw:!rounded-lg tw:!border tw:!border-gray-200"
		/>
		<br />

		<P className="tw:!mt-12 tw:!text-lg">
			Breadcrumbs berikut menggunakan latar belakang dan gaya khusus untuk
			menyesuaikan tampilan sesuai kebutuhan aplikasi Anda.
		</P>
		<Breadcrumbs
			routes={[
				{ label: "Home", href: "#", onClick: () => alert("Home clicked") },
				{ label: "About Us", href: "#", onClick: () => alert("About Us") },
			]}
			className="tw:!bg-amber-500 tw:!p-4 tw:!rounded-lg tw:!border tw:!border-gray-200"
		/>
	</div>
);

// Main Documentation Page
const ComponentDocs = () => {
	const [selected, setSelected] = useState("button");
	const [show, setShow] = React.useState(false);
	const timer = React.useRef<NodeJS.Timeout | null>(null);
	const handleShowAlert = () => {
		setShow(true);
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => setShow(false), 3000);
	};

	React.useEffect(() => {
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, []);

	let Content;
	switch (selected) {
		case "button":
			Content = (
				<>
					<ButtonDemo />
					<div
						style={{
							position: "fixed",
							top: 24,
							right: 24,
							zIndex: 9999,
							transition: "transform 0.3s, opacity 0.3s",
							transform: show ? "translateY(0)" : "translateY(-40px)",
							opacity: show ? 1 : 0,
							pointerEvents: show ? "auto" : "none",
						}}
					>
						{show && (
							<Alert type="success" title="Success!">
								This alert will disappear after 3 seconds.
							</Alert>
						)}
					</div>
				</>
			);
			break;
		case "input":
			Content = <InputDemo />;
			break;

		case "select-input":
			Content = <SelectInputDemo />;
			break;
		case "alert":
			Content = <AlertDemo />;
			break;
		case "typography":
			Content = <Typography />;
			break;
		case "card":
			Content = <CardDemo />;
			break;

		case "accordion":
			Content = <AccordionDemo />;
			break;

		case "radio":
			Content = <RadioButtonDemo />;
			break;

		case "checklist":
			Content = <ChecklistButtonDemo />;
			break;
		case "custom-grid-components":
			Content = <CustomGridImageDemo />;
			break;
		case "breadcrumbs":
			Content = <BreadcrumbsDemo />;
			break;
		case "datePicker":
			Content = <DatePickerDemo />;
			break;
		case "custom-components":
			Content = <CustomComponentsDemo />;
			break;
		default:
			Content = null;
	}

	return (
		<div className="tw:!min-h-screen tw:!bg-white tw:!flex tw:!font-sans">
			{/* Sidebar */}
			<aside
				className="tw:!w-56 tw:!bg-gray-50 tw:!border-r tw:!border-gray-200 tw:!py-8 tw:!px-4 tw:!h-screen tw:!overflow-y-auto tw:!sticky tw:!top-0 tw:!self-start"
				style={{ flexShrink: 0 }}
			>
				<h1 className="tw:!text-xl tw:!font-bold tw:!mb-8 tw:!text-blue-700 tw:!sticky tw:!top-0 tw:!bg-gray-50 tw:!z-10 tw:!py-1">
					GraceTrans Components
				</h1>
				<nav className="tw:!space-y-2">
					{sidebarItems.map((item) => (
						<button
							key={item.key}
							className={`tw:!block tw:!w-full tw:!text-left tw:!py-2 tw:!px-3 tw:!rounded tw:!transition tw:!duration-150 ${
								selected === item.key
									? "tw:!bg-blue-100 tw:!text-blue-700 tw:!font-semibold"
									: "tw:!text-gray-700 hover:tw:!bg-gray-200"
							}`}
							onClick={() => setSelected(item.key)}
						>
							{item.label}
						</button>
					))}
				</nav>
			</aside>
			{/* Main Content */}
			<main className="tw:!flex-1 tw:!p-10 tw:!overflow-y-auto">{Content}</main>
		</div>
	);
};

export default ComponentDocs;
