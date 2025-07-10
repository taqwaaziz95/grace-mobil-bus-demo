"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

export type SlideItem = {
  key: string | number;
  content: React.ReactNode;
};

export type ReusableSwiperProps = {
  slides: SlideItem[];
  swiperProps?: any; // Pass Swiper props if needed
  className?: string;
  showNavButtons?: boolean;
};

const ReusableSwiper: React.FC<ReusableSwiperProps> = ({
  slides,
  swiperProps = {},
  className = "",
  showNavButtons = true,
}) => {
  return (
    <Swiper {...swiperProps} className={className}>
      {slides.map((slide) => (
        <SwiperSlide key={slide.key}>{slide.content}</SwiperSlide>
      ))}
      {showNavButtons && (
        <div className="d-none d-md-block">
          <div
            className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2"
            tabIndex={0}
            role="button"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div
            className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2"
            tabIndex={0}
            role="button"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}
    </Swiper>
  );
};

export default ReusableSwiper;
