import React from "react";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import Image from "next/image";

interface Props {
  slug: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  coverBuku: string;
}

export default function cardAdsLandscape({
  slug,
  judul,
  kategori,
  deskripsi,
  coverBuku,
}: Props) {
  return (
    <section className="flex w-full items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mx-4 w-full">
        <h2 className="text-sm font-light">{kategori}</h2>
        <h3 className="text-base font-semibold tracking-tight text-blackColor">
          {judul}
        </h3>
        <p className="text-sm font-light text-gray-500 line-clamp-2">
          {deskripsi}
        </p>
        <Button className="mt-4">
          <Link href={`/koleksi-buku/${slug}`}>Lihat Detail</Link>
        </Button>
      </div>
      <figure className="mx-4">
        <Image
          className="p-4 w-full h-48"
          src={coverBuku}
          alt="product image"
          width={500}
          height={500}
        />
      </figure>
    </section>
  );
}
