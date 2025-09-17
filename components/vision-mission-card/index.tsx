import React from "react";
import Link from "next/link";

interface VisionMissionCardProps {
	leftImg1: string;
	leftImg2?: string;
	leftImg1Alt?: string;
	leftImg2Alt?: string;
	playButton?: boolean;
	onPlayClick?: () => void;
	rightBtnText: string;
	rightBtnHref?: string;
	rightTitle: string;
	rightDesc: string;
	rightList: string[];
	rightCtaText: string;
	rightCtaHref?: string;
	className?: string;
}

const VisionMissionCard: React.FC<VisionMissionCardProps> = ({
	leftImg1,
	leftImg2,
	leftImg1Alt = "Gracetrans",
	leftImg2Alt = "Gracetrans",
	playButton = false,
	onPlayClick,
	rightBtnText,
	rightBtnHref = "#",
	rightTitle,
	rightDesc,
	rightList,
	rightCtaText,
	rightCtaHref = "#",
	className = "section-cta-7 background-body py-96",
}) => (
	<section className={className}>
		<div className="box-cta-6">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6">
						<div className="card-image d-inline-block position-relative mb-100">
							<img className="rounded-12" src={leftImg1} alt={leftImg1Alt} />
							{playButton && (
								<a
									className="btn btn-play popup-youtube position-absolute top-50 start-50 translate-middle"
									onClick={onPlayClick}
								/>
							)}
							{leftImg2 && (
								<img
									className="position-absolute top-100 start-100 translate-middle rounded-12 d-none d-md-block"
									src={leftImg2}
									alt={leftImg2Alt}
								/>
							)}
						</div>
					</div>
					<div className="col-lg-6 ps-lg-5">
						<Link
							className="btn btn-signin bg-2 text-dark mb-4"
							href={rightBtnHref}
						>
							{rightBtnText}
						</Link>
						<h4 className="mb-4 neutral-1000">{rightTitle}</h4>
						<p className="text-lg-medium neutral-500 mb-4">{rightDesc}</p>

						<h4 className="mb-4 neutral-1000">Misi Kami</h4>
						<div className="row">
							<div className="col">
								<ul className="list-ticks-green list-ticks-green-2">
									{rightList.map((item, idx) => (
										<li className="neutral-1000 pe-0" key={idx}>
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
						<Link className="btn btn-primary mt-2" href={rightCtaHref}>
							{rightCtaText}
							<svg
								width={16}
								height={16}
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 15L15 8L8 1M15 8L1 8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
			<div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
		</div>
	</section>
);

export default VisionMissionCard;
