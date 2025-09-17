import React from "react";

export interface Feature {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export interface LeftIconGridCardProps {
	data: Feature[];
}

const LeftIconGridCard: React.FC<LeftIconGridCardProps> = ({ data }) => {
	return (
		<div className="tw:!container tw:!mx-auto tw:!py-16 tw:!text-center tw:!bg-gradient-to-b tw:!from-white tw:!to-gray-100">
			<h2 className="tw:!text-4xl tw:!font-extrabold tw:!mb-12 tw:!text-gray-800">
				Mengapa Kami Adalah{" "}
				<span className="tw:!text-blue-600">Pilihan yang Tepat?</span>
			</h2>

			<div className="tw:!flex tw:!flex-wrap tw:!justify-center tw:!gap-8">
				{data.map((feature, index) => (
					<div
						key={index}
						className="tw:!bg-white tw:!shadow-lg tw:!py-8 tw:!px-6 tw:!rounded-3xl tw:!text-left tw:!flex tw:!items-center tw:!gap-6 tw:!transition-all tw:!duration-300 hover:tw:!shadow-2xl hover:tw:!scale-105 tw:!basis-full sm:tw:!basis-[45%] md:tw:!basis-[30%] tw:!max-w-[360px]"
					>
						<div className="tw:!bg-blue-500 tw:!text-white tw:!p-4 tw:!rounded-2xl tw:!flex tw:!items-center tw:!justify-center tw:!w-14 tw:!h-14">
							{feature.icon}
						</div>
						<div>
							<h3 className="tw:!font-semibold tw:!text-xl tw:!mb-2 tw:!text-gray-800">
								{feature.title}
							</h3>
							<p className="tw:!text-gray-600 tw:!text-base">
								{feature.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LeftIconGridCard;
