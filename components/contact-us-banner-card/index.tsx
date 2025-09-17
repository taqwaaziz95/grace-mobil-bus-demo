import { withBasePath } from "@/lib/basePath";
import { H6 } from "../typography";

type Contact = {
	name: string;
	number: string;
	link: string;
};

type ContactUsBannerCardProps = {
	phone?: string;
	csTitle?: string;
	csAvailability?: string;
	marketingTitle?: string;
	marketingHours?: string;
	contacts?: Contact[];
	imageUrl?: string;
	imageRightUrl?: string;
};

export default function ContactUsBannerCard({
	phone = "021-2274-0870",
	csTitle = "Customer Service",
	csAvailability = "24 Hour",
	marketingTitle = "Marketing & Reservation",
	marketingHours = "Monday - Saturday (09.00 AM - 06.00 PM)",
	contacts = [
		{
			name: "Heni",
			number: "0811-9444-889",
			link: "https://api.whatsapp.com/send?phone=628119444889&text=Halo%20Grace%20Trans,%20saya%20ingin%20info%20untuk%20reservasi%20kendaraan",
		},
		{
			name: "Fia",
			number: "0822-4671-3465",
			link: "https://api.whatsapp.com/send?phone=6282246713465&text=Halo%20Grace%20Trans,%20saya%20ingin%20info%20untuk%20reservasi%20kendaraan",
		},
	],
	imageUrl = "https://gracetrans.co.id/wp-content/uploads/2024/10/Frame-2.png",
	imageRightUrl = withBasePath("/assets/imgs/gracetrans/icons/whatsapp.png"),
}: ContactUsBannerCardProps) {
	return (
		<div className="tw:!flex tw:!items-center tw:!justify-center tw:!w-full ">
			{/* Left section: Image and CS */}
			<div className="tw:!bg-[#f9d207] tw:!flex tw:!items-center tw:!gap-4 tw:!px-8 tw:!py-4 tw:!rounded-l-lg tw:!rounded-r-lg tw:!relative tw:!left-[8px]">
				<div className="tw:!w-[80px] tw:!h-[80px] tw:!flex-shrink-0 tw:!flex tw:!items-center tw:!justify-center">
					<img
						loading="lazy"
						decoding="async"
						width="64"
						height="64"
						src={imageUrl}
						alt=""
						className="tw:!rounded-lg"
					/>
				</div>
				<a
					href="tel:+622122740870"
					className="tw:!flex tw:!flex-col tw:!items-start tw:!text-left tw:!gap-1"
				>
					<h5 className="tw:!text-base tw:!font-semibold">{csTitle}</h5>
					<h5 className="tw:!text-base tw:!text-gray-500">{csAvailability}</h5>
					<h5 className="tw:!text-base tw:!text-primary-600">{phone}</h5>
				</a>
			</div>
			{/* Right section: Marketing & Reservation */}
			<div className="tw:!flex tw:!items-center tw:!bg-[#ffff22] tw:!flex tw:!items-center tw:!gap-4 tw:!px-8 tw:!py-4 tw:!rounded-r-lg  ">
				<div className="tw:!w-[80px] tw:!h-[80px] tw:!flex-shrink-0 tw:!flex tw:!items-center tw:!justify-center">
					<img
						loading="lazy"
						decoding="async"
						width="64"
						height="64"
						src={imageRightUrl}
						alt=""
						className="tw:!rounded-lg"
					/>
				</div>
				<div className="tw:!flex tw:!flex-col">
					<h5 className="tw:!text-base tw:!font-semibold">{marketingTitle}</h5>
					<h5 className="tw:!text-base tw:!text-gray-500">{marketingHours}</h5>
					<div className="tw:!flex tw:!flex-row tw:!gap-2 tw:!flex-wrap">
						{contacts.map((contact, index) => (
							<a
								key={index}
								href={contact.link}
								target="_blank"
								rel="noopener noreferrer"
								className="tw:!text-sm tw:!px-3 tw:!rounded tw:!bg-green-50 tw:!text-green-700 tw:!border tw:!border-green-200 hover:tw:!bg-green-100"
								style={{ display: "inline-block" }}
							>
								<H6>
									{contact.name} : {contact.number}
								</H6>
							</a>
						))}
					</div>
				</div>
			</div>
			<div
				className="tw:!flex tw:!gap-4 tw:!flex-wrap tw:!items-center"
				id="icon-list-home-reservation"
			></div>
		</div>
	);
}

export type { ContactUsBannerCardProps, Contact };
