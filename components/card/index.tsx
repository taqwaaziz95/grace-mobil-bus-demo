// components/Card.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

export interface SocialIcon {
	iconSrc: string;
	iconAlt: string;
	iconLink: string;
	onClick?: () => void; // Optional click handler for social icons
}

export interface CardProps {
	type: "team-card" | "why-card" | "testimonial-card";

	// TEAM CARD
	imageSrc?: string;
	name?: string;
	role?: string;
	profileLink?: string;
	socialIcons?: SocialIcon[];
	arrowIconSrc?: string;
	onClick?: () => void;

	// WHY CARD
	icon?: React.ReactNode;
	title?: string;
	description?: string;

	// TESTIMONIAL CARD
	testimonialTitle?: string;
	testimonialContent?: string;
	authorName?: string;
	authorLocation?: string;
	authorImage?: string;
	rating?: number;

	className?: string;
}

const Card: React.FC<CardProps> = ({
	type,
	imageSrc,
	name,
	role,
	profileLink = "#",
	socialIcons = [],
	arrowIconSrc,
	icon,
	title,
	description,
	testimonialTitle,
	testimonialContent,
	authorName,
	authorLocation,
	authorImage,
	rating = 5,
	className = "",
	onClick = () => {},
}) => {
	if (type === "team-card") {
		return (
			<div className={`col-lg-3 col-md-6 col-12 ${className}`}>
				<div className="card-news background-card hover-up shadow-2 mb-4 mb-lg-0">
					<div className="card-image">
						<Link href={profileLink} onClick={onClick}>
							<Image
								src={withBasePath(imageSrc || "")}
								alt={name || ""}
								width={300}
								height={300}
								style={{ width: "100%", height: "auto" }}
							/>
						</Link>
					</div>
					<div className="card-info p-4">
						<div className="card-title">
							<Link
								className="text-xl-bold neutral-1000"
								href={profileLink}
								onClick={onClick}
							>
								<h6>{name}</h6>
							</Link>
							<span className="text-sm-medium neutral-500">{role}</span>
						</div>
						<div className="card-program">
							<div className="endtime">
								<div className="card-author d-flex align-items-center gap-2">
									{socialIcons.map((icon, idx) => (
										<Link
											key={idx}
											href={icon.iconLink}
											className="rounded-circle background-100 icon-shape icon icon-sm hover-up"
											onClick={onClick}
										>
											<Image
												className="m-0"
												src={withBasePath(icon.iconSrc || "")}
												alt={icon.iconAlt || ""}
												width={24}
												height={24}
												// style={{ width: "100%", height: "auto" }}
											/>
										</Link>
									))}
								</div>
								<Link
									href={profileLink}
									className="rounded-circle background-100 icon-shape icon icon-sm hover-up border icon-shape-arrow"
								>
									{arrowIconSrc && (
										<Image
											className="m-0"
											src={withBasePath(arrowIconSrc || "")}
											alt="arrow"
											width={24}
											height={24}
											onClick={onClick}
										/>
									)}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (type === "why-card") {
		return (
			<div className={`col-lg-3 col-sm-6 ${className}`}>
				<div className="card-why text-start wow">
					<div className="card-image">{icon}</div>
					<div className="card-info">
						<h6 className="text-xl-bold neutral-1000 text-start">{title}</h6>
						<p className="text-md-medium neutral-500">{description}</p>
					</div>
				</div>
			</div>
		);
	}

	if (type === "testimonial-card") {
		return (
			<div className={`col-lg-12 col-md-6 col-12 ${className}`}>
				<div className="card-testimonial background-card">
					<div className="card-info">
						<p className="text-xl-bold card-title neutral-1000">
							{testimonialTitle}
						</p>
						<p className="text-md-regular neutral-500">{testimonialContent}</p>
					</div>
					<div className="card-top pt-40 border-0 mb-0">
						<div className="card-author">
							<div className="card-image">
								{authorImage && (
									<Image
										src={withBasePath(authorImage || "")}
										alt={authorName || ""}
										width={48}
										height={48}
										style={{ borderRadius: "50%" }}
									/>
								)}
							</div>
							<div className="card-info">
								<p className="text-lg-bold neutral-1000">{authorName}</p>
								<p className="text-md-regular neutral-1000">{authorLocation}</p>
							</div>
						</div>
						<div className="card-rate">
							{Array(rating)
								.fill(0)
								.map((_, idx) => (
									<Image
										key={idx}
										className="background-brand-2 p-1"
										src={
											withBasePath(
												"/assets/imgs/template/icons/star-black.svg"
											) || ""
										}
										alt="Star"
										width={20}
										height={20}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
};

export default Card;
