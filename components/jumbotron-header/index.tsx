import Image from "next/image";
import Link from "next/link";

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
	withBasePath?: (path: string) => string;
	isBreadCrumbs?: boolean;
}

const JumbotronHeader = ({
	bannerImg,
	title,
	subtitle,
	breadcrumbs = [],
	withBasePath = (p) => p,
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
				<h2 className="text-white">{title}</h2>
				<span className="text-white text-xl-medium">{subtitle}</span>
			</div>
			{isBreadCrumbs && (
				<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
					{breadcrumbs.map((item, idx) => (
						<>
							{idx > 0 && (
								<span>
									<Image
										src={withBasePath("/assets/imgs/icons/right.svg")}
										alt="Gracetrans"
										height={24}
										width={24}
									/>
								</span>
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
