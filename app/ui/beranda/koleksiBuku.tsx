import React, { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import CardBooks from "@/app/ui/cards";
import { Button } from "@/app/ui/button";

import Link from "next/link";

import { getBuku } from "@/app/lib/data";
import { getBukuAllResponse } from "@/app/lib/definitions";
import EmptyData from "../emptyData";

export default async function koleksiBuku() {
  const buku: getBukuAllResponse = await getBuku({
    limit: 4,
    page: 1,
  });

  if (buku.data.length < 1) {
    return (
      <section className="p-4">
        <EmptyData title="Belum ada Data" value="Tunggu Data nya ya!" />
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-center items-center px-8">
        <h2 className={`${lusitana.className} text-lg font-semibold`}>
          Koleksi Buku
        </h2>
      </div>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full mt-4 lg:px-8 gap-8">
          {buku.data.map((item, index) => (
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
      </Suspense>
      <div className="flex justify-center items-center mt-8">
        <Link href={"/koleksi-buku"}>
          <Button>Lihat Detail</Button>
        </Link>
      </div>
    </section>
  );
}
