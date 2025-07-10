import BookingModal from "../../../components/modal/BookingModal";
import Link from "next/link";
import { useState } from "react";

export default function CarCard1({ car, handleBooking, category }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isShuttle =
    category != "bandara" && category != "harian" && category != "bulanan";

  return (
    <>
      <div className="card-journey-small background-card hover-up">
        <div className="card-image">
          <Link
            className="text-lg-bold neutral-1000 text-nowrap"
            href={!isShuttle ? "/cars-details-1?category=" + category : "#"}
          >
            <img
              src={`/assets/imgs/cars-listing/${car.image}`}
              className="tw:!max-h-[240px]"
              alt="Grace Mobil"
            />
          </Link>
        </div>
        <div className="card-info p-4 pt-30">
          <div className="card-rating">
            <div className="card-left" />
            {/* <div className="card-right">
							<span className="rating text-xs-medium rounded-pill">
								4.96{" "}
								<span className="text-xs-medium neutral-500">
									(672 reviews)
								</span>
							</span>
						</div> */}
          </div>
          <div className="card-title">
            <Link
              className="text-lg-bold neutral-1000 text-nowrap"
              href={!isShuttle ? "/cars-details-1?category=" + category : "#"}
            >
              {car.name}
            </Link>
          </div>
          <div className="card-program">
            {isShuttle ? (
              <div className="card-location">
                <p className="text-location text-sm-medium neutral-500">
                  {car.location}
                </p>
              </div>
            ) : (
              <div>
                <div className="card-location">
                  <p className="text-location text-sm-medium neutral-500">
                    Tangerang Selatan
                  </p>
                </div>
                <div className="card-facitlities">
                  {/* <p className="card-gear text-md-medium">Automatic</p>
                  <p className="card-fuel text-md-medium">Diesel</p> */}
                  <p className="card-seat text-md-medium">7 seats</p>
                  <p className="card-seat text-md-medium">Termasuk Supir</p>
                </div>
              </div>
            )}
            <div className="endtime">
              <div className="card-price">
                {isShuttle ? (
                  <h6 className="text-lg-bold neutral-1000">
                    {car.carType == "Big Bus"
                      ? "Rp70.000"
                      : car.carType == "Medium Bus"
                        ? "Rp60.000"
                        : "Rp40.000"}
                  </h6>
                ) : (
                  <h6 className="text-lg-bold neutral-1000">
                    {category == "bandara"
                      ? "Rp100.000"
                      : category == "bulanan"
                        ? "Rp4.000.000"
                        : "Rp360.000"}
                  </h6>
                )}
                <p className="text-md-medium neutral-500">
                  {category == "bandara"
                    ? " / kedatangan"
                    : category == "bulanan"
                      ? " / bulan"
                      : " / hari"}
                </p>
              </div>
              {isShuttle && (
                <div className="card-button">
                  <button className="btn btn-gray" onClick={handleOpenModal}>
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <BookingModal
          car={car}
          onClose={handleCloseModal}
          handleBooking={handleBooking}
        />
      )}
    </>
  );
}
