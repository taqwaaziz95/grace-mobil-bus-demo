import React, { useState } from "react";
import Button from "../button";
// import { Button } from "../button";

type Slide = {
	image: string;
	title: string;
	buttonLabel: string;
};

type CarouselProps = {
	slides: Slide[];
};

export const Carousel = ({ slides }: CarouselProps) => {
	const [index, setIndex] = useState(0);

	const prev = () => setIndex((index - 1 + slides.length) % slides.length);
	const next = () => setIndex((index + 1) % slides.length);

	return (
		<div className="relative w-full h-[80vh] overflow-hidden">
			{slides.map((slide, i) => (
				<div
					key={i}
					className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
					style={{
						backgroundImage: `url(${slide.image})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-10 text-white">
						<h1
							className="text-5xl font-bold mb-4"
							dangerouslySetInnerHTML={{ __html: slide.title }}
						/>
						<Button>{slide.buttonLabel}</Button>
					</div>
				</div>
			))}
			<button
				onClick={prev}
				className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
			>
				❮
			</button>
			<button
				onClick={next}
				className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
			>
				❯
			</button>
		</div>
	);
};
