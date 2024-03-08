import React from "react";

import PriceCards from "@/app/ui/price-cards";
import { paketData } from "@/app/lib/definitions";
import { getPaket } from "@/app/lib/actions";

export default async function pricing() {
  const data: paketData[] = await getPaket();

  return (
    <div className="flex justify-center flex-wrap gap-8">
      {data.map((data, index) => (
        <PriceCards
          key={index}
          id={data.id}
          nama={data.nama}
          harga={data.harga}
          deskripsi={data.deskripsi}
        />
      ))}
    </div>
  );
}
