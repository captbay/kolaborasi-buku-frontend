import React, { Suspense } from "react";
import Image from "next/image";

import { getTestimoni } from "@/app/lib/data";
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
    <Suspense fallback={<p>Loading feed...</p>}>
      <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm lg:mb-12 lg:grid-cols-2 bg-white ">
        {data.map((testimoni, index) => (
          <figure
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center bg-white border-b border-gray-200 rounded-t-lg lg:rounded-t-none lg:rounded-ss-lg lg:border-e  "
          >
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 flex flex-col items-center">
              <Rating>
                {Array.from({ length: 5 }, (_, i) => (
                  <RatingStar key={i} filled={i < testimoni.rating} />
                ))}
              </Rating>
              <p className="my-4">{testimoni.ulasan}</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
              <Image
                className="rounded-full w-9 h-9"
                width={500}
                height={500}
                src={
                  "http://kolaborasi-buku-backend.test/storage/" +
                  testimoni.foto_profil
                }
                alt="profile picture"
              />
              <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                <div>{testimoni.nama_lengkap}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Suspense>
  );
}
