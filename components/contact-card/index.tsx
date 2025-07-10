import React, { ReactNode } from "react";

type ContactCardProps = {
	icon: ReactNode;
	title: string;
	children: ReactNode;
};

export const ContactCard = ({ icon, title, children }: ContactCardProps) => (
	<div className="bg-yellow-400 p-4 rounded-md flex items-start gap-4">
		<div className="text-2xl">{icon}</div>
		<div>
			<h4 className="font-bold text-sm">{title}</h4>
			<div className="text-sm">{children}</div>
		</div>
	</div>
);
