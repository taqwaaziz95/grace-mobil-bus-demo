import React from "react";
import Link from "next/link";

interface Route {
	label: string;
	href: string;
	active?: boolean;
}

interface BreadcrumbsProps {
	routes: Route[];
	className?: string;
	separatorIcon?: string; // path to separator icon, default to arrow-right.svg
	backgroundColor?: string; // custom background color
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	routes,
	className = "",
	separatorIcon = "/assets/imgs/template/icons/arrow-right.svg",
	backgroundColor,
}) => {
	return (
		<div
			className={`background-body position-absolute z-1 px-3 py-2 rounded-12 border d-flex gap-3 align-items-center ${className} ${backgroundColor ? `tw:!bg-[${backgroundColor}]` : ""}`}
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{routes.map((route, idx) => (
				<React.Fragment key={route.href + route.label}>
					<Link
						href={route.href}
						className={
							idx === routes.length - 1
								? "neutral-1000 text-md-bold"
								: "neutral-700 text-md-medium"
						}
						aria-current={idx === routes.length - 1 ? "page" : undefined}
					>
						{route.label}
					</Link>
					{idx < routes.length - 1 && (
						<span style={{ display: "flex", alignItems: "center" }}>
							<img src={separatorIcon} alt="separator" />
						</span>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default Breadcrumbs;
