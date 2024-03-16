import React, { Suspense } from "react";

import PriceCards from "@/app/ui/price-cards";
import { paketData } from "@/app/lib/definitions";
import { getPaket } from "@/app/lib/actions";
import EmptyData from "../emptyData";

export default async function pricing() {
  const data: paketData[] = await getPaket();

  if (data.length < 1) {
    return (
      <section className="p-4">
        <EmptyData title="Belum ada Data" value="Tunggu Data nya ya!" />
      </section>
    );
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <div className="flex justify-center flex-wrap gap-8">
        {data.map((data, index) => (
          <PriceCards
            key={index}
            id={data.id}
            nama={data.nama}
            harga={data.harga}
            deskripsi={data.deskripsi}
            jasaData={data.jasa_paket_penerbitan}
          />
        ))}
      </div>
    </Suspense>
  );
}
