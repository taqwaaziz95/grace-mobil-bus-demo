"use client";
import { useEffect, useState } from "react";
import CarCard1 from "../../components/elements/carcard/CarCard1";
import HeroSearch from "../../components/elements/HeroSearch";
import SortCarsFilter from "../../components/elements/SortCarsFilter";
import ByAmenities from "../../components/Filter/ByAmenities";
import ByCarType from "../../components/Filter/ByCarType";
import ByFuel from "../../components/Filter/ByFuel";
import ByLocation from "../../components/Filter/ByLocation";
import ByPagination from "../../components/Filter/ByPagination";
import ByPrice from "../../components/Filter/ByPrice";
import ByRating from "../../components/Filter/ByRating";
import Layout from "../../components/layout/Layout";
import rawCarsData from "../../util/cars.json";
import useCarFilter from "../../util/useCarFilter";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import RentFilter from "../../components/elements/RentFilter";
import ShuttleFilter from "../../components/elements/ShuttleFilter";
import CarCardSection from "@/components/car-card/CarCardSection";
import { withBasePath } from "@/lib/basePath";

const carsData = rawCarsData.map((car) => ({
	// image: car.image,
	...car,
	image: withBasePath(car.image),
	rating: parseFloat(car.rating as string),
}));
export default function CarsList1() {
	const {
		sortCriteria,
		itemsPerPage,
		sortedCars,
		handleCheckboxChange,
		handleSortChange,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useCarFilter(carsData);

	const [category, setCategory] = useState<any>(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setCategory(urlParams.get("category"));
	}, []);

	console.log("category", category);

	return (
		<>
			<Layout footerStyle={1}>
				<div>
					<div className="page-header-2 pt-30 background-body">
						<div className="custom-container position-relative mx-auto">
							<div className="bg-overlay rounded-12 overflow-hidden">
								<img
									className="w-100 h-100 img-fluid img-banner"
									src="/assets/imgs/page-header/banner6.png"
									alt="Gracetrans"
								/>
							</div>
							<div className="container tw:!pt-20 tw:!flex tw:!flex-col tw:!h-full tw:!items-center tw:!relative">
								{category == "bandara" ||
								category == "harian" ||
								category == "bulanan" ? (
									<RentFilter category={category} />
								) : (
									<ShuttleFilter category={category} />
								)}
							</div>
						</div>
					</div>
					{/* search 1 */}

					{/* cars-listing-1 */}
					<CarCardSection
						cars={carsData}
						category={category}
						isSortCarFilter={true}
						sortCriteria={sortCriteria}
						handleSortChange={handleSortChange}
						itemsPerPage={itemsPerPage}
						// handleItemsPerPageChange={handleItemsPerPageChange}
						handleClearFilters={handleClearFilters}
						startItemIndex={startItemIndex}
						endItemIndex={endItemIndex}
						sortedCars={sortedCars}
					/>
				</div>
			</Layout>
		</>
	);
}
