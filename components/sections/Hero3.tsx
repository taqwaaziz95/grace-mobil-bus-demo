"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { swiperGroup1 } from "../../util/swiperOptions";
import HeroSearch from "../elements/HeroSearch";

export default function Hero3() {
  const [user, setUser] = useState<string | null>(null);
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setIsUserChecked(true);
  }, []);

  const [selectedCategory, updateSelectedCategory] =
    useState<string>("resident");

  if (!isUserChecked) {
    return null; // or a loading spinner
  }

  function setSelectedCategory(category: string): void {
    updateSelectedCategory(category);
  }

  return (
    <>
      <section className="box-section block-banner-home3 position-relative">
        <div className="container-banner-home3 position-relative">
          <div className="box-swiper">
            <Swiper
              {...swiperGroup1}
              className="swiper-container swiper-group-1"
            >
              <div className="swiper-wrapper">
                <SwiperSlide>
                  <div className="item-banner-slide banner-2 tw:!h-[600px]">
                    <div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center">
                      <h1 className="color-white tw:!mb-12 tw:!z-1">
                        Book Shuttle
                      </h1>
                      <div className="box-search-advance background-card tw:!top-0">
                        <div className="box-top-search">
                          <div className="left-top-search">
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "resident" ? "active" : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("resident")}
                            >
                              Resident
                            </button>
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "korporat" ? "active" : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("korporat")}
                            >
                              Korporat
                            </button>
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "antar-kota"
                                  ? "active"
                                  : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("antar-kota")}
                            >
                              Antar Kota
                            </button>
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "mall" ? "active" : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("mall")}
                            >
                              Shopping Mall
                            </button>
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
                        <HeroSearch category={selectedCategory} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item-banner-slide banner-2 tw:!h-[600px]">
                    <div className="container tw:!flex tw:!flex-col tw:!h-full tw:!items-center">
                      <h1 className="color-white tw:!mb-12 tw:!z-1">
                        Book Rental Mobil
                      </h1>
                      <div className="box-search-advance background-card tw:!top-0">
                        <div className="box-top-search">
                          <div className="left-top-search">
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "bandara" ? "active" : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("bandara")}
                            >
                              Antar Jemput Bandara
                            </button>
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "harian" ? "active" : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("harian")}
                            >
                              Harian
                            </button>
                            <button
                              className={`category-link text-sm-bold btn-click ${
                                selectedCategory === "bulanan" ? "active" : ""
                              } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                              onClick={() => setSelectedCategory("bulanan")}
                            >
                              Bulanan
                            </button>
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
                        <HeroSearch category={selectedCategory} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
              <div className="d-none d-md-block">
                <div
                  className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2"
                  tabIndex={0}
                  role="button"
                  aria-label="Previous slide"
                  aria-controls="swiper-wrapper-9c1b729b91027a37b"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2"
                  tabIndex={0}
                  role="button"
                  aria-label="Next slide"
                  aria-controls="swiper-wrapper-9c1b729b91027a37b"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
