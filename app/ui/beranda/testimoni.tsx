import React from "react";
import Image from "next/image";

import { getTestimoni } from "@/app/lib/actions";
import { Testimoni } from "@/app/lib/definitions";

import { Rating, RatingStar } from "flowbite-react";
import EmptyData from "../emptyData";

export default async function testimoni() {
  const data: Testimoni[] = await getTestimoni(4);

  if (data.length < 1) {
    return (
      <section className="p-4">
        <EmptyData title="Belum ada Data" value="Tunggu Data nya ya!" />
      </section>
    );
  }

  return (
    <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm md:mb-12 md:grid-cols-2 bg-white ">
      {data.map((testimoni, index) => (
        <figure
          key={index}
          className="flex flex-col items-center justify-center p-4 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e  "
        >
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 flex flex-col items-center">
            <Rating>
              {Array.from({ length: testimoni.rating }, (_, i) => (
                <RatingStar key={i} />
              ))}
            </Rating>
            <p className="my-4">{testimoni.ulasan}</p>
          </blockquote>
          <figcaption className="flex items-center justify-center ">
            <Image
              className="rounded-full w-9 h-9"
              width={500}
              height={500}
              src={testimoni.foto_profil}
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
              <div>{testimoni.nama_lengkap}</div>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
