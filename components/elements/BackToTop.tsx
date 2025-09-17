"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop({ target }: any) {
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setHasScrolled(window.scrollY > 100);
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleClick = () => {
		window.scrollTo({
			top: document.querySelector(target).offsetTop,
			behavior: "smooth",
		});
	};

	return (
		<>
			{hasScrolled && (
				<a
					id="scrollUp"
					onClick={handleClick}
					style={{
						position: "fixed",
						zIndex: 2147483647,
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<ArrowUp />
				</a>
			)}
		</>
	);
}
