"use client";

// Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

export default () => {
  return (
    <Swiper
      style={{ "--swiper-navigation-color": "#18415F" } as React.CSSProperties}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation={true}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      onReachEnd={() => {
        /*back to first slide*/
      }}
    >
      <SwiperSlide>
        <Image
          src="/coursell/1.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[375px]"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/coursell/2.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[375px]"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/coursell/3.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[375px]"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/coursell/4.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-full h-[375px]"
        />
      </SwiperSlide>
    </Swiper>
  );
};
