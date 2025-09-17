import React from "react";
import { H2, P } from "../typography";

export interface VideoTestimonialProps {
	src: string;
	name: string;
	role: string;
	title1?: string;
	title2?: string;
	testimonial: string;
	isVideoPosition?: "left" | "right"; // default left
	className?: string;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({
	src,
	name,
	role,
	testimonial,
	isVideoPosition = "left",
	className = "",
	title1,
	title2,
}) => {
	return (
		<section className={`tw:!bg-white tw:!py-10 tw:!px-4 ${className}`}>
			<div className="tw:md:!max-w-6xl tw:!mx-auto tw:!grid tw:md:!grid-cols-2 tw:!grid-cols-1 tw:!gap-8 tw:!items-center">
				{isVideoPosition === "left" ? (
					<>
						<div className="tw:!hidden tw:md:!block tw:!rounded-2xl tw:!overflow-hidden tw:!shadow-md tw:!relative tw:!w-full tw:!aspect-video">
							<video
								src={src}
								controls
								className="tw:!w-full tw:!h-full tw:!object-cover"
							/>
						</div>
						<div className="tw:md:!text-left tw:!text-center tw:!w-full">
							<H2 className="tw:!text-3xl tw:!font-bold tw:!text-gray-900 tw:!mb-4">
								{title1}
								<span className="tw:!text-sky-500"> {title2}</span>
							</H2>
							<P className="tw:!text-gray-700 tw:!text-base tw:!leading-relaxed">
								{testimonial}
							</P>
							<div className="tw:!mt-5">
								<P className="tw:!text-sky-500 tw:!font-medium tw:!text-lg">
									{name}
								</P>
								<P className="tw:!text-gray-500 tw:!text-sm">{role}</P>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="tw:md:!text-left tw:!text-center tw:!w-full">
							<H2 className="tw:!text-3xl tw:!font-bold tw:!text-gray-900 tw:!mb-4">
								{title1}
								<span className="tw:!text-sky-500"> {title2}</span>
							</H2>
							<P className="tw:!text-gray-700 tw:!text-base tw:!leading-relaxed">
								{testimonial}
							</P>
							<div className="tw:!mt-5">
								<P className="tw:!text-sky-500 tw:!font-medium tw:!text-lg">
									{name}
								</P>
								<P className="tw:!text-gray-500 tw:!text-sm">{role}</P>
							</div>
						</div>
						<div className="tw:!hidden tw:md:!block tw:!rounded-2xl tw:!overflow-hidden tw:!shadow-md tw:!relative tw:!w-full tw:!aspect-video">
							<video
								src={src}
								controls
								className="tw:!w-full tw:!h-full tw:!object-cover"
							/>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default VideoTestimonial;
