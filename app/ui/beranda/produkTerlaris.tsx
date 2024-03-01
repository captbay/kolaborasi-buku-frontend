"use client";

import React, { useRef } from "react";
// For Typescript
import SwiperCore from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { lusitana } from "@/app/ui/fonts";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CardBooks from "@/app/ui/cards";

export default () => {
  const swiperRef = useRef<SwiperCore>();
  return (
    <>
      <div className="flex justify-between items-center px-8 mb-4">
        <h2 className={`${lusitana.className} text-lg`}>Produk Terlaris</h2>
        <div className="flex">
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <ArrowLeftCircleIcon className="text-primaryColor w-auto h-8" />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <ArrowRightCircleIcon className="text-primaryColor w-auto h-8" />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <CardBooks />
        </SwiperSlide>
        <SwiperSlide>
          <CardBooks />
        </SwiperSlide>
        <SwiperSlide>
          <CardBooks />
        </SwiperSlide>
        <SwiperSlide>
          <CardBooks />
        </SwiperSlide>
        <SwiperSlide>
          <CardBooks />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
