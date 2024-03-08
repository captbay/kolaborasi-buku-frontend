import React from "react";
import { lusitana } from "@/app/ui/fonts";
import CardBooks from "@/app/ui/cards";
import { Button } from "@/app/ui/button";

import Link from "next/link";

import { getBuku } from "@/app/lib/actions";
import { CardData } from "@/app/lib/definitions";

export default async function koleksiBuku() {
  const data: CardData[] = await getBuku(4);

  return (
    <section>
      <div className="flex justify-center items-center px-8">
        <h2 className={`${lusitana.className} text-lg font-semibold`}>
          Koleksi Buku
        </h2>
      </div>
      {/* swiper with card element */}
      <div className="grid grid-cols-4 h-full mt-4 px-8 gap-8">
        {data?.map((item, index) => (
          <CardBooks
            key={index}
            slug={item.slug}
            judul={item.judul}
            harga={item.harga}
            kategori={item.kategori}
            coverBuku={item.cover_buku}
            pembeli={item.pembeli}
            rating={item.rating}
          />
        ))}
      </div>
      <div className="flex justify-center items-center px-8">
        <Link href={"/koleksi-buku"}>
          <Button className="mt-8">Lihat Detail</Button>
        </Link>
      </div>
    </section>
  );
}