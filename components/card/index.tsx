// components/Card.tsx

import React from "react";
import Link from "next/link";

export interface SocialIcon {
	iconSrc: string;
	iconAlt: string;
	iconLink: string;
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
}) => {
	if (type === "team-card") {
		return (
			<div className={`col-lg-3 col-md-6 col-12 ${className}`}>
				<div className="card-news background-card hover-up shadow-2 mb-4 mb-lg-0">
					<div className="card-image">
						<Link href={profileLink}>
							<img src={imageSrc} alt={name} />
						</Link>
					</div>
					<div className="card-info p-4">
						<div className="card-title">
							<Link className="text-xl-bold neutral-1000" href={profileLink}>
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
										>
											<img
												className="m-0"
												src={icon.iconSrc}
												alt={icon.iconAlt}
											/>
										</Link>
									))}
								</div>
								<Link
									href={profileLink}
									className="rounded-circle background-100 icon-shape icon icon-sm hover-up border icon-shape-arrow"
								>
									<img className="m-0" src={arrowIconSrc} alt="arrow" />
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
								<img src={authorImage} alt={authorName} />
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
									<img
										key={idx}
										className="background-brand-2 p-1"
										src="/assets/imgs/template/icons/star-black.svg"
										alt="Star"
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
