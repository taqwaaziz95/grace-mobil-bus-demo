import React, { ReactNode } from "react";

type FloatingButtonProps = {
	icon: ReactNode;
	onClick: () => void;
};

export const FloatingButton = ({ icon, onClick }: FloatingButtonProps) => (
	<button
		className="fixed bottom-4 left-4 w-12 h-12 bg-green-500 text-white rounded-full shadow-md flex items-center justify-center"
		onClick={onClick}
	>
		{icon}
	</button>
);
