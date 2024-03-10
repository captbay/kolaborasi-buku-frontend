import React from "react";
import { lusitana } from "@/app/ui/fonts";
import CardKolaborasi from "@/app/ui/cards-kolaborasi";
import { Button } from "@/app/ui/button";

import Link from "next/link";

import { getKolaborasi } from "@/app/lib/actions";
import { CardKolaborasiData } from "@/app/lib/definitions";

export default async function kolaborasiBuku() {
  const data: CardKolaborasiData[] = await getKolaborasi(4);

  return (
    <section>
      <div className="flex justify-center items-center px-8">
        <h2 className={`${lusitana.className} text-lg font-semibold`}>
          Ayo Kolaborasi!
        </h2>
      </div>
      <div className="grid grid-cols-4 h-full mt-4 px-8 gap-8">
        {data?.map((item, index) => (
          <CardKolaborasi
            key={index}
            slug={item.slug}
            judul={item.judul}
            kategori={item.kategori}
            coverBuku={item.cover_buku}
            jumlahBab={item.jumlah_bab.toString()}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link href={"/kolaborasi"}>
          <Button>Lihat Detail</Button>
        </Link>
      </div>
    </section>
  );
}
