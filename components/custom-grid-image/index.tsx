import React from "react";
import { H1, H3 } from "../typography";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

const IMAGES = {
	img1: "/assets/imgs/section-1/img-1.png",
	img2: "/assets/imgs/section-1/img-2.png",
	img3: "/assets/imgs/section-1/img-3.png",
};

type CustomGridImageProps = {
	heading?: string;
	highlighted?: string;
	description: string;
	tagOne: {
		number: string | number;
		title: string;
		subtitle: string;
	};
	tagTwo: {
		number: string | number;
		title: string;
		subtitle: string;
	};
};

const CustomGridImage = ({
	heading = "The Future of Car Rental is Here",
	highlighted = "Car Rental",
	description,
	tagOne,
	tagTwo,
}: CustomGridImageProps) => {
	return (
		<div className="container">
			<div className="row pb-50">
				<div className="col-lg-4">
					<h3 className="neutral-1000">
						{heading.split(highlighted)[0]}
						<br />
						<span className="text-primary">{highlighted}</span>
						{heading.split(highlighted)[1]
							? ` ${heading.split(highlighted)[1]}`
							: ""}
					</h3>
				</div>
				<div className="col-lg-7 offset-lg-1">
					<p className="text-lg-medium neutral-500">{description}</p>
				</div>
			</div>

			<div className="row g-4">
				<div className="col-lg-4 col-md-6">
					<div className="box-image rounded-12 position-relative overflow-hidden">
						<Image
							className="rounded-12"
							src={withBasePath(IMAGES.img1)}
							alt="img"
							width={400}
							height={400}
							style={{ width: "100%", height: "auto" }}
						/>
						<div className="box-tag bg-white p-3 d-flex align-items-center position-absolute bottom-0 end-0 rounded-12 m-3">
							<H1 className="text-dark fs-72 me-4">{tagOne.number}</H1>
							<H3>
								{tagOne.title} <br /> {tagOne.subtitle}
							</H3>
						</div>
					</div>
				</div>

				<div className="col-lg-4 col-md-6">
					<div className="box-image rounded-12 position-relative overflow-hidden">
						<Image
							className="rounded-12"
							src={IMAGES.img2}
							alt="img"
							width={400}
							height={400}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				</div>

				<div className="col-lg-4 col-12">
					<div className="d-flex flex-column gap-4 align-self-stretch h-100">
						<div className="box-tag background-brand-2 p-5 d-flex rounded-12 align-items-center justify-content-center">
							<H1 className="text-dark fs-96 me-3" color="white">
								{tagTwo.number}
							</H1>
							<H3 color="white">
								{tagTwo.title} <br /> {tagTwo.subtitle}
							</H3>
						</div>
						<Image
							className="rounded-12"
							src={IMAGES.img3}
							alt="img"
							width={400}
							height={400}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomGridImage;
