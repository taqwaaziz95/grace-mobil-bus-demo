import React from "react";
import Marquee from "react-fast-marquee";

export interface CustomMarqueeProps {
	brands?: Array<{
		lightMode: string;
		darkMode: string;
		alt?: string;
	}>;
	direction?: "left" | "right";
	pauseOnHover?: boolean;
	className?: string;
}

export default function CustomMarquee({
	brands = [],
	direction = "left",
	pauseOnHover = true,
	className = "background-100 pt-55 pb-55",
}: CustomMarqueeProps) {
	return (
		<div className={className}>
			<div className="container">
				<Marquee
					direction={direction}
					pauseOnHover={pauseOnHover}
					className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center  wow fadeIn"
				>
					<ul className="carouselTicker__list">
						{brands.map((brand, idx) => (
							<li className="carouselTicker__item" key={idx}>
								<div className="item-brand">
									<img
										className="light-mode"
										src={brand.lightMode}
										alt={brand.alt || "Brand"}
									/>
									<img
										className="dark-mode"
										src={brand.darkMode}
										alt={brand.alt || "Brand"}
									/>
								</div>
							</li>
						))}
					</ul>
				</Marquee>
			</div>
		</div>
	);
}
