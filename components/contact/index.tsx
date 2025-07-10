import React from "react";

interface ContactLocationProps {
	title: string;
	address: string;
	mapUrl: string;
	phone?: string;
	email?: string;
	hours?: string;
}

const ContactLocation: React.FC<ContactLocationProps> = ({
	title,
	address,
	mapUrl,
	phone,
	email,
	hours,
}) => {
	return (
		<div className="tw:!flex tw:!flex-row lg:tw:!flex-row tw:!gap-2 tw:!mb-30">
			{/* Left Section – Contact Info */}
			<div className="tw:!flex-1 tw:!p-2 tw:!bg-blue-200 tw:!rounded-3 tw:!shadow-md ">
				<h4 className="tw:!neutral-1000">{title}</h4>
				<p className="tw:!neutral-500 tw:!mb-2">{address}</p>

				{phone && (
					<p className="tw:!neutral-500 tw:!mb-2">
						<strong>Phone:</strong> {phone}
					</p>
				)}
				{email && (
					<p className="tw:!neutral-500 tw:!mb-2">
						<strong>Email:</strong> {email}
					</p>
				)}
				{hours && (
					<p className="tw:!neutral-500 tw:!mb-2">
						<strong>Hours:</strong> {hours}
					</p>
				)}
			</div>

			{/* Right Section – Embedded Map */}
			<div className="tw:!flex-1">
				<iframe
					className="tw:!w-full tw:!h-[400px] tw:!rounded-3"
					src={mapUrl}
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
};

export default ContactLocation;
