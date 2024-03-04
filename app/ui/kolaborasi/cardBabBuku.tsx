import React from "react";
import Image from "next/image";
import { Button } from "@/app/ui/button";

export default async function cardBabBuku() {
  return (
    <div className="flex min-w-fit flex-col bg-white border border-gray-200 rounded-lg shadow">
      <figure className="flex justify-center">
        <Image
          className="p-4 w-48 h-48"
          src="/books/1.png"
          alt="product image"
          width={500}
          height={500}
        />
      </figure>
      <div className="px-5 pb-5">
        <h2 className="text-sm font-light">Bab 1</h2>
        <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
          Judul Bab
        </h3>
        <p className="text-sm font-medium text-blackColor text-end">
          Deadline 40 hari
        </p>
        <Button className="w-full mt-2">Ajukan Kolaborasi</Button>
      </div>
    </div>
  );
}
