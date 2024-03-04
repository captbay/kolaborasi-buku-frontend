"use client";
import React from "react";
import Image from "next/image";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function imageSection() {
  return (
    <Swiper
      style={
        {
          "--swiper-navigation-color": "#18415F",
          "--swiper-navigation-size": "30px",
        } as React.CSSProperties
      }
      className="w-full h-[100px] mt-4"
      modules={[Navigation]}
      slidesPerView={4}
      navigation={true}
      spaceBetween={16}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src="/books/1.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[100px] object-contain rounded-lg p-2 bg-whiteColor"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/coursell/1.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[100px] object-contain rounded-lg p-2 bg-whiteColor"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/books/1.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[100px] object-contain rounded-lg p-2 bg-whiteColor"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/coursell/1.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[100px] object-contain rounded-lg p-2 bg-whiteColor"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/books/1.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[100px] object-contain rounded-lg p-2 bg-whiteColor"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/coursell/1.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[100px] object-contain rounded-lg p-2 bg-whiteColor"
        />
      </SwiperSlide>
    </Swiper>
  );
}
