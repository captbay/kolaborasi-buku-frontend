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
    <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24">
        <header>
          <h1
            className={`${lusitana.className} mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl`}
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
