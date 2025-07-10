"use client";

import React, { useState } from "react";
import { Alert } from "@/components/alert";
import { LinkButton } from "@/components/button";
import Card from "@/components/card";
import { Input, MultiTextInput } from "@/components/inputs";
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

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { swiperGroupAnimate } from "@/util/swiperOptions";
import Accordion, { AccordionItem } from "@/components/accordion";
import RadioButton from "@/components/radio-button";
import { Checkbox } from "@/components/checkbox";
import CustomGridImage from "@/components/custom-grid-image";
import Breadcrumbs from "@/components/breadcrumbs";

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
	{ key: "alert", label: "Alert" },
	{ key: "typography", label: "Typography" },
	{ key: "card", label: "Card" },
	{ key: "accordion", label: "Accordion" },
	{ key: "radio", label: "Radio Button" },
	{ key: "checklist", label: "Checklist Button" },
	{ key: "breadcrumbs", label: "Breadcrumbs" },
	{ key: "custom-grid-components", label: "Custom Image Grid Section" },
];

const teamMembers = [
	{
		type: "team-card" as const,
		imageSrc: "/assets/imgs/team/team-1/portrait-1.png",
		name: "Aldo RP",
		role: "CTO (Chief Tech Officer)",
		profileLink: "/dealer-details",
		socialIcons: [
			{
				iconSrc: "/assets/imgs/team/team-1/icon-1.svg",
				iconAlt: "icon1",
				iconLink: "#",
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-2.svg",
				iconAlt: "icon2",
				iconLink: "#",
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-3.svg",
				iconAlt: "icon3",
				iconLink: "#",
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-4.svg",
				iconAlt: "icon4",
				iconLink: "#",
			},
		],
		arrowIconSrc: "/assets/imgs/team/team-1/arrow-up-right.svg",
	},
	{
		type: "team-card" as const,
		imageSrc: "/assets/imgs/team/team-1/portrait-2.png",
		name: "Willy Andika",
		role: "CFO (Chief Financial Officer)",
		profileLink: "/dealer-details",
		socialIcons: [
			{
				iconSrc: "/assets/imgs/team/team-1/icon-1.svg",
				iconAlt: "icon1",
				iconLink: "#",
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-2.svg",
				iconAlt: "icon2",
				iconLink: "#",
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-3.svg",
				iconAlt: "icon3",
				iconLink: "#",
			},
			{
				iconSrc: "/assets/imgs/team/team-1/icon-4.svg",
				iconAlt: "icon4",
				iconLink: "#",
			},
		],
		arrowIconSrc: "/assets/imgs/team/team-1/arrow-up-right.svg",
	},
	// ...add more team members here
];

const testimonialData = [
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

const whyData = [
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
const ButtonDemo = () => (
	<div className="tw:!space-y-4">
		<H3>Button</H3>
		<P>
			Berikut adalah contoh penggunaan <code>Button</code>. Anda dapat
			menyesuaikan tampilan, varian, ukuran, dan status tombol sesuai kebutuhan
			aplikasi Anda.
		</P>
		<div className="tw:!flex tw:!gap-4 tw:!flex-wrap">
			<LinkButton href="#" variant="white">
				Kontak Kami
			</LinkButton>
			<LinkButton href="/book-shuttle" variant="sky">
				Pesan Shuttle
			</LinkButton>
			<LinkButton href="/sewa-mobil" variant="yellow">
				Sewa Mobil
			</LinkButton>
		</div>
	</div>
);

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

// Alert Component Example
const AlertDemo = () => (
	<div className="tw:!space-y-4">
		<h2 className="tw:!text-xl tw:!font-semibold">Alert</h2>
		<Alert type="success" title="Sukses Alert" className="tw:!mb-4">
			This is a Sukses alert.
		</Alert>
		<Alert type="warning" title="Warning Alert" className="tw:!mb-4">
			This is a warning alert.
		</Alert>
		<Alert type="error" title="error Alert" className="tw:!mb-4">
			This is a error alert.
		</Alert>
		<Alert type="info" title="info Alert" className="tw:!mb-4">
			This is a info alert.
		</Alert>
	</div>
);

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
				{ label: "Home", href: "/" },
				{ label: "About Us", href: "/about-us" },
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
				{ label: "Home", href: "/" },
				{ label: "About Us", href: "/about-us" },
			]}
			className="tw:!bg-amber-500 tw:!p-4 tw:!rounded-lg tw:!border tw:!border-gray-200"
		/>
	</div>
);

// Main Documentation Page
const NewPlayground = () => {
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
			Content = <ButtonDemo />;
			break;
		case "input":
			Content = <InputDemo />;
			break;
		case "alert":
			Content = (
				<>
					<AlertDemo />
					<div>
						<button onClick={handleShowAlert}>Click To Show Alert</button>
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
					</div>
				</>
			);
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
		default:
			Content = null;
	}

	return (
		<div className="tw:!min-h-screen tw:!bg-white tw:!flex tw:!font-sans">
			{/* Sidebar */}
			<aside className="tw:!w-56 tw:!bg-gray-50 tw:!border-r tw:!border-gray-200 tw:!py-8 tw:!px-4">
				<h1 className="tw:!text-xl tw:!font-bold tw:!mb-8 tw:!text-blue-700">
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

export default NewPlayground;
