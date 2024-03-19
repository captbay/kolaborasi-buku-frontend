import React, { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import CardKolaborasi from "@/app/ui/cards-kolaborasi";
import { Button } from "@/app/ui/button";

import Link from "next/link";

import { getKolaborasi } from "@/app/lib/actions";
import { getKolaborasiBukuAllResponse } from "@/app/lib/definitions";
import EmptyData from "../emptyData";

export default async function kolaborasiBuku() {
  const data: getKolaborasiBukuAllResponse = await getKolaborasi({
    limit: 4,
    page: 1,
  });

  if (data.data.length < 1) {
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
          Ayo Kolaborasi!
        </h2>
      </div>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full mt-4 lg:px-8 gap-8">
          {data.data.map((item, index) => (
            <CardKolaborasi
              key={index}
              slug={item.slug}
              judul={item.judul}
              kategori={item.kategori}
              coverBuku={item.cover_buku}
              jumlahBab={item.jumlah_bab}
            />
          ))}
        </div>
      </Suspense>
      <div className="flex justify-center items-center mt-8">
        <Link href={"/kolaborasi"}>
          <Button>Lihat Detail</Button>
        </Link>
      </div>
    </section>
  );
}
