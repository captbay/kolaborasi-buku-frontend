"use client";

import React, { useRef } from "react";
import { useEffect, useState } from "react";
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

import CardBooks from "@/app/ui/cards";

import { getBestSeller } from "@/app/lib/actions";
import { CardData } from "@/app/lib/definitions";

export default () => {
  const [data, setData] = useState<CardData[]>([]);
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    const fetchProjects = () => {
      getBestSeller()
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setData(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProjects();
  }, []);

  if (!data) return null;

  return (
    <section>
      <div className="flex justify-between items-center px-8 mb-4">
        <h2 className={`${lusitana.className} text-lg font-semibold`}>
          Produk Terlaris
        </h2>
        <div className="flex">
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <ArrowLeftCircleIcon className="text-primaryColor w-auto h-8" />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <ArrowRightCircleIcon className="text-primaryColor w-auto h-8" />
          </button>
        </div>
      </div>
      <div className="px-8">
        <Swiper
          slidesPerView={4}
          className="mySwiper"
          spaceBetween={32}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id}>
              <CardBooks
                className="shadow-sm"
                slug={item.slug}
                judul={item.judul}
                harga={item.harga}
                kategori={item.kategori}
                coverBuku={item.cover_buku}
                pembeli={item.pembeli}
                rating={item.rating}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
