import React, {
	ButtonHTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	SelectHTMLAttributes,
	ReactNode,
} from "react";
import Link from "next/link";

// Button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger" | "outline";
	children: ReactNode;
}
export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	className = "",
	children,
	...props
}) => {
	const base =
		"tw:px-4 tw:py-2 tw:rounded tw:font-medium tw:transition tw:duration-150 tw:focus:tw:outline-none";
	const variants = {
		primary: "tw:bg-blue-600 tw:text-white hover:tw:bg-blue-700",
		secondary: "tw:bg-gray-200 tw:text-gray-800 hover:tw:bg-gray-300",
		danger: "tw:bg-red-600 tw:text-white hover:tw:bg-red-700",
		outline:
			"tw:bg-transparent tw:border tw:border-blue-600 tw:text-blue-600 hover:tw:bg-blue-50",
	};
	return (
		<button className={`${base} ${variants[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
};

// Input
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}
export const Input: React.FC<InputProps> = ({
	label,
	className = "",
	...props
}) => (
	<div className="tw:mb-4">
		{label && (
			<label className="tw:block tw:mb-1 tw:text-sm tw:font-medium">
				{label}
			</label>
		)}
		<input
			className={`tw:w-full tw:px-3 tw:py-2 tw:border tw:rounded tw:focus:tw:outline-none tw:focus:tw:ring-2 tw:focus:tw:ring-blue-500 ${className}`}
			{...props}
		/>
	</div>
);

// TextArea
export interface TextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}
export const TextArea: React.FC<TextAreaProps> = ({
	label,
	className = "",
	...props
}) => (
	<div className="tw:mb-4">
		{label && (
			<label className="tw:block tw:mb-1 tw:text-sm tw:font-medium">
				{label}
			</label>
		)}
		<textarea
			className={`tw:w-full tw:px-3 tw:py-2 tw:border tw:rounded tw:focus:tw:outline-none tw:focus:tw:ring-2 tw:focus:tw:ring-blue-500 ${className}`}
			{...props}
		/>
	</div>
);

// Checkbox
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}
export const Checkbox: React.FC<CheckboxProps> = ({
	label,
	className = "",
	...props
}) => (
	<label className="tw:inline-flex tw:items-center tw:space-x-2">
		<input
			type="checkbox"
			className={`tw:form-checkbox tw:h-4 tw:w-4 ${className}`}
			{...props}
		/>
		{label && <span className="tw:text-sm">{label}</span>}
	</label>
);

// RadioButton
export interface RadioButtonProps
	extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}
export const RadioButton: React.FC<RadioButtonProps> = ({
	label,
	className = "",
	...props
}) => (
	<label className="tw:inline-flex tw:items-center tw:space-x-2">
		<input
			type="radio"
			className={`tw:form-radio tw:h-4 tw:w-4 ${className}`}
			{...props}
		/>
		{label && <span className="tw:text-sm">{label}</span>}
	</label>
);

// Select
export interface SelectOption {
	value: string | number;
	label: string;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options: SelectOption[];
}
export const Select: React.FC<SelectProps> = ({
	label,
	options,
	className = "",
	...props
}) => (
	<div className="tw:mb-4">
		{label && (
			<label className="tw:block tw:mb-1 tw:text-sm tw:font-medium">
				{label}
			</label>
		)}
		<select
			className={`tw:w-full tw:px-3 tw:py-2 tw:border tw:rounded tw:focus:tw:outline-none tw:focus:tw:ring-2 tw:focus:tw:ring-blue-500 ${className}`}
			{...props}
		>
			{options.map((opt) => (
				<option key={opt.value} value={opt.value}>
					{opt.label}
				</option>
			))}
		</select>
	</div>
);

// Typography
export interface TypographyProps {
	children: ReactNode;
	className?: string;
}
export const Heading: React.FC<
	TypographyProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }
> = ({ level = 1, children, className = "" }) => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	const sizes = [
		"tw:text-4xl tw:font-bold",
		"tw:text-3xl tw:font-bold",
		"tw:text-2xl tw:font-semibold",
		"tw:text-xl tw:font-semibold",
		"tw:text-lg tw:font-medium",
		"tw:text-base tw:font-medium",
	];
	return <Tag className={`${sizes[level - 1]} ${className}`}>{children}</Tag>;
};

export const Paragraph: React.FC<TypographyProps> = ({
	children,
	className = "",
}) => (
	<p className={`tw:text-base tw:text-gray-700 ${className}`}>{children}</p>
);

export const Label: React.FC<TypographyProps> = ({
	children,
	className = "",
}) => (
	<label className={`tw:text-sm tw:font-medium ${className}`}>{children}</label>
);

// Card
export interface CardProps {
	children: ReactNode;
	className?: string;
	header?: ReactNode;
	footer?: ReactNode;
	type?: "default" | "news" | "profile";
	imageSrc?: string;
	title?: string;
	description?: string;
}
export const Card: React.FC<CardProps> = ({
	children,
	className = "",
	header,
	footer,
	type = "default",
	imageSrc,
	title,
	description,
}) => (
	<div className={`tw:bg-white tw:rounded tw:shadow tw:p-6 ${className}`}>
		{type === "news" && imageSrc && (
			<img
				src={imageSrc}
				alt={title}
				className="tw:w-full tw:h-40 tw:object-cover tw:rounded tw:mb-4"
			/>
		)}
		{header && <div className="tw:mb-4">{header}</div>}
		{title && (
			<div className="tw:text-lg tw:font-semibold tw:mb-2">{title}</div>
		)}
		{description && (
			<div className="tw:text-gray-600 tw:mb-2">{description}</div>
		)}
		<div>{children}</div>
		{footer && <div className="tw:mt-4">{footer}</div>}
	</div>
);

// Grid
export interface GridProps {
	children: ReactNode;
	cols?: number;
	gap?: string;
	className?: string;
}
export const Grid: React.FC<GridProps> = ({
	children,
	cols = 3,
	gap = "tw:gap-4",
	className = "",
}) => (
	<div className={`tw:grid tw:grid-cols-${cols} ${gap} ${className}`}>
		{children}
	</div>
);

// Avatar
export interface AvatarProps {
	name?: string;
	src?: string;
	size?: number;
	className?: string;
}
export const Avatar: React.FC<AvatarProps> = ({
	name = "User",
	src = "",
	size = 40,
	className = "",
}) => {
	return src ? (
		<img
			src={src}
			alt={name}
			width={size}
			height={size}
			className={`tw:rounded-full tw:object-cover tw:inline-block ${className}`}
		/>
	) : (
		<div
			className={`tw:rounded-full tw:bg-gray-200 tw:flex tw:items-center tw:justify-center tw:font-bold tw:text-gray-600 tw:inline-block ${className}`}
			style={{ width: size, height: size }}
		>
			{name.charAt(0).toUpperCase()}
		</div>
	);
};

// Alert
export interface AlertProps {
	children: ReactNode;
	variant?: "info" | "success" | "warning" | "error";
	className?: string;
}
export const Alert: React.FC<AlertProps> = ({
	children,
	variant = "info",
	className = "",
}) => {
	const variants = {
		info: "tw:bg-blue-50 tw:text-blue-800 tw:border-blue-200",
		success: "tw:bg-green-50 tw:text-green-800 tw:border-green-200",
		warning: "tw:bg-yellow-50 tw:text-yellow-800 tw:border-yellow-200",
		error: "tw:bg-red-50 tw:text-red-800 tw:border-red-200",
	};
	return (
		<div
			className={`tw:border-l-4 tw:p-4 tw:rounded tw:mb-4 ${variants[variant]} ${className}`}
		>
			{children}
		</div>
	);
};

// Spinner
export interface SpinnerProps {
	size?: number;
	className?: string;
}
export const Spinner: React.FC<SpinnerProps> = ({
	size = 24,
	className = "",
}) => (
	<svg
		className={`tw:animate-spin tw:text-blue-600 ${className}`}
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="4"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle
			className="tw-opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
		/>
		<path
			className="tw-opacity-75"
			d="M4 12a8 8 0 018-8"
			stroke="currentColor"
		/>
	</svg>
);

// Navbar
export interface NavbarMenuItem {
	label: string;
	href?: string;
	children?: NavbarMenuItem[];
}

export interface NavbarProps {
	logoSrc?: string;
	logoAlt?: string;
	menu: NavbarMenuItem[];
	rightContent?: React.ReactNode;
	onBurgerClick?: () => void;
	onMobileMenuClick?: () => void;
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
	logoSrc = "/assets/imgs/template/grace-logo.png",
	logoAlt = "Gracetrans",
	menu,
	rightContent,
	onBurgerClick,
	onMobileMenuClick,
	className = "",
}) => (
	<header className={`header sticky-bar header-home-2 border-0 ${className}`}>
		<div className="container-fluid background-body">
			<div className="main-header">
				<div className="header-left">
					<div className="header-logo">
						<Link className="d-flex" href="/">
							<img className="tw:!max-h-[40px]" alt={logoAlt} src={logoSrc} />
						</Link>
					</div>
					<div className="header-nav">
						<nav className="nav-main-menu">
							<ul className="main-menu">
								{menu.map((item, idx) => (
									<NavbarMenuItemComponent key={idx} item={item} />
								))}
							</ul>
						</nav>
					</div>
				</div>
				<div className="header-right">
					{rightContent}
					{/* <div
						className="burger-icon-2 burger-icon-white"
						onClick={onBurgerClick}
					>
						<img src="/assets/imgs/template/icons/menu.svg" alt="Menu" />
					</div>
					<div
						className="burger-icon burger-icon-white"
						onClick={onMobileMenuClick}
					>
						<span className="burger-icon-top" />
						<span className="burger-icon-mid"> </span>
						<span className="burger-icon-bottom"> </span>
					</div> */}
				</div>
			</div>
		</div>
	</header>
);

const NavbarMenuItemComponent: React.FC<{ item: NavbarMenuItem }> = ({
	item,
}) => {
	if (item.children && item.children.length > 0) {
		return (
			<li className="has-children">
				<Link href={item.href || "#"}>{item.label}</Link>
				<ul className="sub-menu">
					{item.children.map((child, idx) => (
						<li key={idx}>
							<Link href={child.href || "#"}>{child.label}</Link>
						</li>
					))}
				</ul>
			</li>
		);
	}
	return (
		<li>
			<Link href={item.href || "#"}>{item.label}</Link>
		</li>
	);
};

// Modal
export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	className?: string;
}
export const Modal: React.FC<ModalProps> = ({
	open,
	onClose,
	title,
	children,
	className = "",
}) => {
	if (!open) return null;
	return (
		<div className="tw:fixed tw:inset-0 tw:bg-black/40 tw:flex tw:items-center tw:justify-center tw:z-50">
			<div
				className={`tw:bg-white tw:rounded tw:p-6 tw:shadow-lg tw:min-w-[300px] ${className}`}
			>
				{title && (
					<div className="tw:text-lg tw:font-bold tw:mb-4">{title}</div>
				)}
				<button
					onClick={onClose}
					className="tw:absolute tw:top-2 tw:right-2 tw:text-gray-400 hover:tw:text-gray-700"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};

// Accordion
export interface AccordionItem {
	title: string;
	content: ReactNode;
}
export interface AccordionProps {
	items: AccordionItem[];
	className?: string;
}
export const Accordion: React.FC<AccordionProps> = ({
	items,
	className = "",
}) => {
	const [openIndex, setOpenIndex] = React.useState<number | null>(null);
	return (
		<div className={className}>
			{items.map((item, idx) => (
				<div key={idx} className="tw:mb-2 tw:border tw:rounded">
					<button
						className="tw:w-full tw:text-left tw:px-4 tw:py-2 tw:bg-gray-100 tw:font-semibold"
						onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
					>
						{item.title}
					</button>
					{openIndex === idx && (
						<div className="tw:px-4 tw:py-2">{item.content}</div>
					)}
				</div>
			))}
		</div>
	);
};

// Dropdown
export interface DropdownProps {
	label: string;
	options: { label: string; value: string | number }[];
	onSelect: (value: string | number) => void;
	className?: string;
}
export const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,
	onSelect,
	className = "",
}) => {
	const [open, setOpen] = React.useState(false);
	return (
		<div className={`tw:relative ${className}`}>
			<button
				onClick={() => setOpen((v) => !v)}
				className="tw:px-4 tw:py-2 tw:bg-gray-100 tw:rounded tw:w-full tw:text-left"
			>
				{label}
			</button>
			{open && (
				<div className="tw:absolute tw:left-0 tw:mt-1 tw:bg-white tw:shadow tw:rounded tw:z-10 tw:min-w-full">
					{options.map((opt) => (
						<div
							key={opt.value}
							className="tw:px-4 tw:py-2 hover:tw:bg-blue-50 tw-cursor-pointer"
							onClick={() => {
								setOpen(false);
								onSelect(opt.value);
							}}
						>
							{opt.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

// List
export interface ListProps {
	items: ReactNode[];
	className?: string;
}
export const List: React.FC<ListProps> = ({ items, className = "" }) => (
	<ul className={`tw:list-disc tw:pl-6 ${className}`}>
		{items.map((item, i) => (
			<li key={i}>{item}</li>
		))}
	</ul>
);

// ListGroup
export interface ListGroupProps {
	items: { label: string; active?: boolean }[];
	className?: string;
}
export const ListGroup: React.FC<ListGroupProps> = ({
	items,
	className = "",
}) => (
	<ul className={`tw:rounded tw:border tw:divide-y tw:bg-white ${className}`}>
		{items.map((item, i) => (
			<li
				key={i}
				className={`tw:px-4 tw:py-2 ${
					item.active ? "tw:bg-blue-50 tw:font-semibold" : ""
				}`}
			>
				{item.label}
			</li>
		))}
	</ul>
);

// NANTI AKAN SAYA PISAH , saolnya Tailwind Kemaren ga bekerja , ga taunya ada prefix "tw:"
