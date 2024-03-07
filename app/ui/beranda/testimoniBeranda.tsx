import React from "react";
import { lusitana } from "@/app/ui/fonts";
import Testimoni from "@/app/ui/beranda/testimoni";

export default async function testimoniBeranda() {
  return (
    <section>
      <div className="flex flex-col justify-center items-center px-8">
        <h2 className={`${lusitana.className} text-lg font-semibold`}>
          Testimoni Pelanggan Kita
        </h2>
        <p className="text-center text-sm font-light">
          Apa kata mereka yang sudah berbelanja di toko kita? Yuk, lihat
          kata-kata mereka yang berbelanja di toko kita.
        </p>
      </div>
      <div className="mt-4">
        <Testimoni />
      </div>
    </section>
  );
}
