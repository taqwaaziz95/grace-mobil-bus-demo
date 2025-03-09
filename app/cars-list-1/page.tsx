"use client";
import CarCard1 from "@/components/elements/carcard/CarCard1";
import HeroSearch from "@/components/elements/HeroSearch";
import SortCarsFilter from "@/components/elements/SortCarsFilter";
import ByAmenities from "@/components/Filter/ByAmenities";
import ByCarType from "@/components/Filter/ByCarType";
import ByFuel from "@/components/Filter/ByFuel";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import Layout from "@/components/layout/Layout";
import rawCarsData from "@/util/cars.json";
import useCarFilter from "@/util/useCarFilter";
import Link from "next/link";
import Marquee from "react-fast-marquee";
const carsData = rawCarsData.map((car) => ({
	...car,
	rating: parseFloat(car.rating as string),
}));
export default function CarsList1() {
	const {
		filter,
		setFilter,
		sortCriteria,
		setSortCriteria,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		uniqueNames,
		uniqueFuelTypes,
		uniqueAmenities,
		uniqueLocations,
		uniqueRatings,
		uniqueCarTypes,
		filteredCars,
		sortedCars,
		totalPages,
		startIndex,
		endIndex,
		paginatedCars,
		handleCheckboxChange,
		handleSortChange,
		handlePriceRangeChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useCarFilter(carsData);

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
									alt="Carento"
								/>
							</div>
							<div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
								<span className="text-sm-bold bg-2 px-4 py-3 rounded-12">
									Find bus near your location
								</span>
								<h2 className="text-white mt-4">List of our Bus and Routes</h2>
								<span className="text-white text-lg-medium">
									Search and find your best premium shuttle bus
								</span>
							</div>
							<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 d-none d-none d-md-flex">
								<Link href="/" className="neutral-700 text-md-medium">
									Home
								</Link>
								<span className="@@ds-prev-page">
									<img
										src="/assets/imgs/template/icons/arrow-right.svg"
										alt="Carento"
									/>
								</span>
								<Link href="#" className="neutral-1000 text-md-bold">
									@@prev-page
								</Link>
								<span>
									<img
										src="/assets/imgs/template/icons/arrow-right.svg"
										alt="Carento"
									/>
								</span>
								<Link
									href="#"
									className="neutral-1000 text-md-bold text-nowrap"
								>
									@@current-page
								</Link>
							</div>
						</div>
					</div>
					{/* search 1 */}
					<section className="box-section box-search-advance-home10 background-body">
						<div className="container">
							<div className="box-search-advance background-card wow fadeIn">
								<div className="box-top-search">
									<div className="left-top-search">
										<div className="left-top-search">
											<Link
												className="category-link text-sm-bold btn-click active text-white"
												href="#"
											>
												All Buses
											</Link>
										</div>
									</div>
									{/* <div className="right-top-search d-none d-md-flex">
										<Link
											className="text-sm-medium need-some-help"
											href="/contact"
										>
											Need help?
										</Link>
									</div> */}
								</div>
								<HeroSearch />
							</div>
						</div>
					</section>
					{/* cars-listing-1 */}
					<section className="section-box pt-50 background-body">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-md-9 mb-30 wow fadeInUp">
									<h4 className="title-svg neutral-1000 mb-15">
										Our Latest Fleet
									</h4>
									<p className="text-lg-medium text-bold neutral-500">
										Choose your bus and destination from our latest fleet
									</p>
								</div>
							</div>
						</div>
					</section>
					<section className="box-section block-content-tourlist background-body">
						<div className="container">
							<div className="box-content-main pt-20">
								<div className="content-right">
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
										/>
									</div>
									<div className="box-grid-tours wow fadeIn">
										<div className="row">
											{paginatedCars.map((car) => (
												<div
													className="col-lg-4 col-md-6 wow fadeInUp"
													key={car.id}
												>
													<CarCard1 car={car} />
												</div>
											))}
										</div>
									</div>
									<ByPagination
										handlePreviousPage={handlePreviousPage}
										totalPages={totalPages}
										currentPage={currentPage}
										handleNextPage={handleNextPage}
										handlePageChange={handlePageChange}
									/>
								</div>
								<div className="content-left order-lg-first">
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Show on map
												</h6>
												<div className="box-collapse scrollFilter mb-15">
													<div className="pt-0">
														<div className="box-map-small">
															<iframe
																src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63449.99338213992!2d106.64530463404886!3d-6.312948168266957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef0b29e78801%3A0xefd715749f1392c9!2sGRACE%20TRANS%20(PT%20MATARI%20JELAJAH%20INDONESIA)!5e0!3m2!1sid!2sid!4v1741530013607!5m2!1sid!2sid"
																width="100%"
																height={160}
																style={{ border: 0 }}
																allowFullScreen
																loading="lazy"
																referrerPolicy="no-referrer-when-downgrade"
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* <div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Filter Price{" "}
												</h6>
												<ByPrice
													filter={filter}
													handlePriceRangeChange={handlePriceRangeChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Car type
												</h6>
												<ByCarType
													uniqueCarTypes={uniqueCarTypes}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Amenities
												</h6>
												<ByAmenities
													uniqueAmenities={uniqueAmenities}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Fuel Type
												</h6>
												<ByFuel
													uniqueFuelTypes={uniqueFuelTypes}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Review Score{" "}
												</h6>
												<ByRating
													uniqueRatings={uniqueRatings}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">
													Booking Location
												</h6>
												<ByLocation
													uniqueLocations={uniqueLocations}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div> */}
								</div>
							</div>
						</div>
						{/* <div className="background-100 pt-55 pb-55">
							<div className="container">
								<Marquee
									direction="left"
									pauseOnHover={true}
									className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center  wow fadeIn"
								>
									<ul className="carouselTicker__list">
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/lexus.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/lexus-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/mer.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/mer-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/bugatti.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/bugatti-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/jaguar.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/jaguar-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/honda.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/honda-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/chevrolet.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/chevrolet-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/acura.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/acura-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/bmw.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/bmw-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/toyota.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/toyota-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/lexus.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/lexus-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/mer.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/mer-w.png"
													alt="Carento"
												/>
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img
													className="light-mode"
													src="/assets/imgs/page/homepage2/bugatti.png"
													alt="Carento"
												/>
												<img
													className="dark-mode"
													src="/assets/imgs/page/homepage2/bugatti-w.png"
													alt="Carento"
												/>
											</div>
										</li>
									</ul>
								</Marquee>
							</div>
						</div> */}
					</section>
				</div>
			</Layout>
		</>
	);
}
