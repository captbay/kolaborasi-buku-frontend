import React from "react";
import { lusitana } from "@/app/ui/fonts";

export default async function jumbotron({
  judul,
  deskripsi,
}: {
  judul: string;
  deskripsi: string;
}) {
  return (
    <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply h-96">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24">
        <header>
          <h1
            className={`${lusitana.className} mb-4 text-4xl font-extrabold tracking-tight leading-none text-white lg:text-5xl`}
          >
            {judul}
          </h1>
        </header>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          {deskripsi}
        </p>
      </div>
    </div>
  );
}
