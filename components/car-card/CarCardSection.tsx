import { filter } from "lodash";
import { H4, P } from "../typography";
import CarCard from "./index";
import SortCarsFilter from "@/components/elements/SortCarsFilter";

export interface CarCardSectionProps {
	cars: any[];
	category: string;
	isSortCarFilter?: boolean;
	sortCriteria?: any;
	handleSortChange?: (criteria: any) => void;
	itemsPerPage?: number;
	handleItemsPerPageChange?: (val: number) => void;
	handleClearFilters?: () => void;
	startItemIndex?: number;
	endItemIndex?: number;
	sortedCars?: any[];
	title?: string;
	subTitle?: string;
}

const CarCardSection = ({
	cars,
	category,
	isSortCarFilter = false,
	sortCriteria,
	handleSortChange,
	itemsPerPage,
	handleItemsPerPageChange,
	handleClearFilters,
	startItemIndex,
	endItemIndex,
	sortedCars,
	title = "Hasil Pencarian",
	subTitle = "Pilih Bus dan rute yang sesuai",
}: CarCardSectionProps) => {
	const isShuttle =
		category !== "bandara" && category !== "harian" && category !== "bulanan";

	cars = filter(cars, ["type", isShuttle ? "shuttle" : "rent"]);

	return (
		<>
			<section className="section-box pt-50 background-body">
				<div className="container">
					<div className="row align-items-end">
						<div className="col-md-9 mb-30  ">
							<H4 className="title-svg neutral-1000 mb-15">{title}</H4>
							<P className="text-lg-medium text-bold neutral-500">{subTitle}</P>
						</div>
					</div>
				</div>
			</section>
			<section className="box-section block-content-tourlist background-body">
				<div className="container">
					<div className="box-content-main pt-20">
						<div className="content-right">
							{isSortCarFilter && (
								<div className="box-filters mb-25 pb-5 border-bottom border-1">
									<SortCarsFilter
										sortCriteria={sortCriteria}
										handleSortChange={handleSortChange}
										itemsPerPage={itemsPerPage}
										handleItemsPerPageChange={handleItemsPerPageChange}
										handleClearFilters={handleClearFilters}
										startItemIndex={startItemIndex}
										endItemIndex={endItemIndex}
										sortedCars={sortedCars}
										category={category}
									/>
								</div>
							)}
							<div className="box-grid-tours fadeIn">
								<div className="row tw:!space-y-4">
									{cars.map((car) => (
										<div className="col-lg-4 col-md-6" key={car.id}>
											<CarCard key={car.id} car={car} category={category} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CarCardSection;
