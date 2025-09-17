import Image from "next/image";
import Link from "next/link";
import { H1, H2, Span } from "../typography";
import { withBasePath } from "@/lib/basePath";

export interface BreadcrumbItem {
	label: string;
	href: string;
	isActive?: boolean;
}

interface JumbotronHeaderProps {
	bannerImg: string;
	title: string;
	subtitle: string;
	breadcrumbs?: BreadcrumbItem[];
	isBreadCrumbs?: boolean;
}

const JumbotronHeader = ({
	bannerImg,
	title,
	subtitle,
	breadcrumbs = [],
	isBreadCrumbs = true,
}: JumbotronHeaderProps) => (
	<div className="page-header pt-30 background-body">
		<div className="custom-container position-relative mx-auto">
			<div className="bg-overlay rounded-12 overflow-hidden">
				<img
					className="w-100 h-100 img-banner"
					src={withBasePath(bannerImg)}
					alt="Gracetrans"
				/>
			</div>
			<div className="container position-absolute z-1 top-50 start-50 translate-middle">
				<H1 className="text-white">{title}</H1>
				<Span className="text-white text-xl-medium">{subtitle}</Span>
			</div>
			{isBreadCrumbs && (
				<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
					{breadcrumbs.map((item, idx) => (
						<>
							{idx > 0 && (
								<>
									<Image
										src={withBasePath("/assets/imgs/icons/right.svg")}
										alt=">"
										height={24}
										width={24}
									/>
								</>
							)}
							<Link
								key={item.label + idx}
								href={item.href}
								className={
									item.isActive
										? "neutral-1000 text-md-bold"
										: "neutral-700 text-md-medium"
								}
							>
								{item.label}
							</Link>
						</>
					))}
				</div>
			)}
		</div>
	</div>
);

export default JumbotronHeader;
