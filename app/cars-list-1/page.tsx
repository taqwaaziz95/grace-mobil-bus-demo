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
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
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
          <section className="section-box pt-50 background-body">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-md-9 mb-30  ">
                  <h4 className="title-svg neutral-1000 mb-15">
                    Hasil Pencarian
                  </h4>
                  <p className="text-lg-medium text-bold neutral-500">
                    Pilih Bus dan rute yang sesuai
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
                  <div className="box-grid-tours  fadeIn">
                    <div className="row">
                      {paginatedCars.map((car) => (
                        <div className="col-lg-4 col-md-6  " key={car.id}>
                          <CarCard1 car={car} category={category} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/*
                  <ByPagination
                    handlePreviousPage={handlePreviousPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePageChange={handlePageChange}
                  />
				  */}
                </div>
              </div>
            </div>
            {/* <div className="background-100 pt-55 pb-55">
							<div className="container">
								<Marquee
									direction="left"
									pauseOnHover={true}
									className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center   fadeIn"
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
