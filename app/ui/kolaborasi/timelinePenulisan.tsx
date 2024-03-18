"use client";

import React from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { TimelineKolaborasi } from "@/app/lib/definitions";

export default function timelinePenulisan({
  data,
}: {
  data: TimelineKolaborasi[];
}) {
  return (
    <section className="flex flex-col">
      {data.map((item, index) => {
        const isLastItem = index === data.length - 1;

        return (
          <ol
            key={index}
            className={`relative border-s ${
              isLastItem ? "border-none" : "border-primaryColor"
            }`}
          >
            <li className="mb-10 ms-6">
              <span
                className={`absolute flex items-center justify-center w-12 h-12 rounded-full -start-6 ring ${
                  item.status === "selesai"
                    ? "bg-green-100 ring-green-500"
                    : item.status === "menunggu"
                    ? "bg-yellow-100 ring-yellow-500"
                    : "bg-red-100 ring-red-500"
                }`}
              >
                {item.status === "selesai" ? (
                  <CheckIcon className="w-6 h-6 text-green-500" />
                ) : item.status === "menunggu" ? (
                  <ClockIcon className="w-6 h-6 text-yellow-500" />
                ) : (
                  <CheckIcon className="w-6 h-6 text-red-500" />
                )}
              </span>
              <div className="ml-4">
                <time
                  className={`block mb-2 text-sm font-normal leading-none text-${
                    item.status === "selesai"
                      ? "green"
                      : item.status === "menunggu"
                      ? "yellow"
                      : "red"
                  }-500`}
                >
                  {item.status}
                </time>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                  {item.judul}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 ">
                  {item.count}
                </p>
              </div>
            </li>
          </ol>
        );
      })}
    </section>
  );
}

{
  /*  <ol className="relative border-s border-primaryColor">
       <li className="mb-10 ms-6">
         <span className="absolute flex items-center justify-center w-12 h-12 bg-green-100 rounded-full -start-6 ring ring-green-500">
           <CheckIcon className="w-6 h-6 text-green-500" />
         </span>
         <div className="ml-4">
           <time className="block mb-2 text-sm font-normal leading-none text-green-500 ">
             Selesai
           </time>
           <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
             Kontributor
           </h3>
           <p className="mb-4 text-base font-normal text-gray-500 ">5/5</p>
         </div>
       </li>
      </ol>
      <ol className="relative border-s border-primaryColor">
       <li className="mb-10 ms-6">
         <span className="absolute flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full -start-6 ring ring-yellow-500">
           <CheckIcon className="w-6 h-6 text-yellow-500" />
         </span>
         <div className="ml-4">
           <time className="block mb-2 text-sm font-normal leading-none text-yellow-500 ">
             Menunggu
           </time>
           <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
             Upload Naskah
           </h3>
           <p className="mb-4 text-base font-normal text-gray-500 ">1/5</p>
         </div>
       </li>
      </ol>
      <ol className="relative border-s border-primaryColor">
       <li className="mb-10 ms-6">
         <span className="absolute flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full -start-6 ring ring-yellow-500">
           <CheckIcon className="w-6 h-6 text-yellow-500" />
         </span>
         <div className="ml-4">
           <time className="block mb-2 text-sm font-normal leading-none text-yellow-500 ">
             Menunggu
           </time>
           <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
             Editing Oleh Editor
           </h3>
           <p className="mb-4 text-base font-normal text-gray-500 ">1/5</p>
         </div>
       </li>
      </ol>
      <ol className="relative border-s border-primaryColor">
       <li className="mb-10 ms-6">
         <span className="absolute flex items-center justify-center w-12 h-12 bg-red-100 rounded-full -start-6 ring ring-red-500">
           <CheckIcon className="w-6 h-6 text-red-500" />
         </span>
         <div className="ml-4">
           <time className="block mb-2 text-sm font-normal leading-none text-red-500 ">
             Gagal
           </time>
           <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
             Naskah Selesai
           </h3>
           <p className="mb-4 text-base font-normal text-gray-500 ">0/5</p>
         </div>
       </li>
      </ol>
      <ol className="relative border-s border-primaryColor">
       <li className="mb-10 ms-6">
         <span className="absolute flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full -start-6 ring ring-yellow-500">
           <CheckIcon className="w-6 h-6 text-yellow-500" />
         </span>
         <div className="ml-4">
           <time className="block mb-2 text-sm font-normal leading-none text-yellow-500 ">
             Menunggu
           </time>
           <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
             Input ISBN
           </h3>
         </div>
       </li>
      </ol>
      <ol className="relative">
       <li className="mb-10 ms-6">
         <span className="absolute flex items-center justify-center w-12 h-12 bg-green-100 rounded-full -start-6 ring ring-green-500">
           <CheckIcon className="w-6 h-6 text-green-500" />
         </span>
         <div className="ml-4">
           <time className="block mb-2 text-sm font-normal leading-none text-green-500 ">
             Selesai
           </time>
           <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
             Buku Publish
           </h3>
           <p className="mb-4 text-base font-normal text-gray-500 ">5/5</p>
         </div>
       </li>
      </ol> */
}
