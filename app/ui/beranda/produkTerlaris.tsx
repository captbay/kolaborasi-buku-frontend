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

import { CardData } from "@/app/lib/definitions";
import EmptyData from "../emptyData";
import { ProdukTerlarisSkeleton } from "../skeletons";

export default function ProdukTerlaris({ data }: { data: CardData[] }) {
  const swiperRef = useRef<SwiperCore>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <ProdukTerlarisSkeleton />;
  }

  if (data.length < 1) {
    return (
      <section className="p-4">
        <h2 className={`${lusitana.className} text-lg font-semibold lg:px-4`}>
          Produk Terlaris
        </h2>
        <EmptyData title="Belum ada Data" value="Tunggu Data nya ya!" />
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center lg:px-8 mb-4">
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
      <div className="lg:px-8">
        <Swiper
          slidesPerView={4}
          className="mySwiper"
          spaceBetween={32}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            769: {
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
}
