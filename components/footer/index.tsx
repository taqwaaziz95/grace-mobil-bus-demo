import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
	copyright?: string;
	socials?: {
		name: string;
		url: string;
		icon: React.ReactNode;
	}[];
}

const defaultSocials = [
	{
		name: "Facebook",
		url: "https://facebook.com",
		icon: <Facebook size={20} />,
	},
	{
		name: "Twitter",
		url: "https://twitter.com",
		icon: <Twitter size={20} />,
	},
	{
		name: "Instagram",
		url: "https://instagram.com",
		icon: <Instagram size={20} />,
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com",
		icon: <Linkedin size={20} />,
	},
];

const Footer: React.FC<FooterProps> = ({
	copyright = "© 2024 GraceTrans. All rights reserved.",
	socials = defaultSocials,
}) => (
	<footer className="tw:border-t tw:border-gray-200 tw:py-4 tw:px-6 tw:bg-gray-50 tw:text-gray-700 tw:shadow-md">
		<div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:max-w-7xl tw:mx-auto">
			<span className="tw:text-gray-600 tw:text-sm tw:mb-2">{copyright}</span>
			<div className="tw:flex tw:space-x-4">
				{socials.map((social) => (
					<a
						key={social.name}
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						className="tw:text-gray-500 hover:tw:text-blue-600 tw:transition-colors tw:text-lg"
						aria-label={social.name}
					>
						{social.icon}
					</a>
				))}
			</div>
		</div>
	</footer>
);

export default Footer;
