"use client";

import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";

import CardAdsLandscape from "@/app/ui/cardAdsLandscape";

import { getAds } from "@/app/lib/data";
import { BookAds } from "@/app/lib/definitions";
import EmptyData from "../emptyData";

export default () => {
  const [data, setData] = useState<BookAds[]>([]);

  useEffect(() => {
    const fetchProjects = () => {
      getAds()
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setData(res.data.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProjects();
  }, []);

  if (data.length < 1) {
    return (
      <section className="p-4">
        <EmptyData title="Belum ada Data" value="Tunggu Data nya ya!" />
      </section>
    );
  }

  return (
    <section>
      <Swiper
        slidesPerView={1}
        spaceBetween={32}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Mousewheel, Pagination, Autoplay]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <CardAdsLandscape
              slug={item.slug}
              judul={item.judul}
              kategori={item.kategori}
              deskripsi={item.deskripsi}
              coverBuku={item.cover_buku}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
