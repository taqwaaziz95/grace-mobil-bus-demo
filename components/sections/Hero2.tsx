"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { swiperGroup1 } from "../../util/swiperOptions";
import HeroSearch from "../elements/HeroSearch";
import { useEffect, useState } from "react";

export default function Hero2() {
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

  const [selectedCategory, updateSelectedCategory] = useState<string>("all");

  if (!isUserChecked) {
    return null; // or a loading spinner
  }

  function setSelectedCategory(category: string): void {
    updateSelectedCategory(category);
  }
  return (
    <>
      <section className="section-box box-banner-home7 background-body">
        <div className="container-banner-home7 position-relative">
          <div className="box-swiper">
            <Swiper
              {...swiperGroup1}
              className="swiper-container swiper-group-1"
            >
              <div className="swiper-wrapper">
                <SwiperSlide>
                  <div className="item-banner-slide banner-2">
                    <div className="container">
                      <h1 className="mt-20 mb-20 color-white">
                        Discover your next ride today
                      </h1>
                      <h6 className="color-white heading-6-medium">
                        Explore our wide selection and enjoy a smooth ride
                        journey, <br />
                        with expert assistance at every turn
                      </h6>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
        <div className="container-search-advance">
          <div className="container">
            <div className="box-search-advance background-card wow  mb-70">
              <div className="box-top-search">
                <div className="left-top-search">
                  <button
                    className={`category-link text-sm-bold btn-click ${
                      selectedCategory === "all" ? "active" : ""
                    } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Buses
                  </button>
                  <button
                    className={`category-link text-sm-bold btn-click ${
                      selectedCategory === "medium" ? "active" : ""
                    } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                    onClick={() => setSelectedCategory("medium")}
                  >
                    Medium Bus 31 Seat
                  </button>
                  <button
                    className={`category-link text-sm-bold btn-click ${
                      selectedCategory === "shuttle" ? "active" : ""
                    } text-black bg-blue-500 hover:bg-blue-700 active:bg-blue-800`}
                    onClick={() => setSelectedCategory("shuttle")}
                  >
                    Shuttle Bus
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
              {user ? (
                <>
                  <HeroSearch />
                  {/* <label>Saya dah login</label> */}
                </>
              ) : (
                <HeroSearch />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
