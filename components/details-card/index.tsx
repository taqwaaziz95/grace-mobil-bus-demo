import Link from "next/link";

export interface DetailsCardProps {
	imageSrc: string;
	linkSrc: string;
	title: string;
	description: string;
	buttonLabel?: string;
	buttonLink?: string;
	withBasePath?: (path: string) => string;
}

const DetailsCard = ({
	imageSrc,
	linkSrc,
	title,
	description,
	buttonLabel = "View Details",
	buttonLink = "#",
	withBasePath = (p) => p,
}: DetailsCardProps) => (
	<div className="col-lg-4 col-md-6">
		<div className="card-news background-card hover-up mb-24">
			<div className="card-image">
				<img src={withBasePath(imageSrc)} alt="Gracetrans" />
			</div>
			<div className="card-info">
				<div className="card-title mb-3">
					<Link className="text-xl-bold neutral-1000" href={linkSrc}>
						{title}
					</Link>
					<p className="text-md-medium neutral-500 mt-2">{description}</p>
				</div>
				<div className="card-program">
					<div className="endtime">
						<div className="card-button">
							<Link className="btn btn-primary2" href={buttonLink}>
								{buttonLabel}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export interface DetailsCardListProps {
	cards: DetailsCardProps[];
}

export const DetailsCardList = ({ cards }: DetailsCardListProps) => (
	<div className="row mt-50">
		{cards.map((card, idx) => (
			<DetailsCard key={card.title + idx} {...card} />
		))}
	</div>
);

export default DetailsCard;
