import React from "react";

export interface VideoTestimonialProps {
	src: string;
	name: string;
	role: string;
	testimonial: string;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({
	src,
	name,
	role,
	testimonial,
}) => {
	return (
		<section className="tw:!bg-white tw:!py-10 tw:!px-4">
			<div className="tw:!max-w-6xl tw:!mx-auto tw:!grid tw:!grid-cols-2 md:tw:!grid-cols-2 tw:!gap-8 tw:!items-center">
				{/* Left: Video */}
				<div className="tw:!rounded-2xl tw:!overflow-hidden tw:!shadow-md tw:!relative tw:!w-full tw:!aspect-video">
					<video
						src={src}
						controls
						className="tw:!w-full tw:!h-full tw:!object-cover"
					/>
				</div>
				{/* Right: Text */}
				<div className="tw:!text-left">
					<h2 className="tw:!text-3xl tw:!font-bold tw:!text-gray-900 tw:!mb-4">
						Ulasan Nyata{" "}
						<span className="tw:!text-sky-500">Pelanggan Kami</span>
					</h2>
					<p className="tw:!text-gray-700 tw:!text-base tw:!leading-relaxed">
						{testimonial}
					</p>
					<div className="tw:!mt-5">
						<p className="tw:!text-sky-500 tw:!font-medium tw:!text-lg">
							{name}
						</p>
						<p className="tw:!text-gray-500 tw:!text-sm">{role}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VideoTestimonial;
