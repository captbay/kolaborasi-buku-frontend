import React from "react";

import CardKolaborasiBooks from "@/app/ui/cards-kolaborasi";
import FilterBoxKolaborasi from "@/app/ui/filter-box-kolaborasi";
import Pagination from "@/app/ui/pagination";

export default async function listBukuKolaborasi() {
  return (
    <div className="flex justify-between">
      <div className="ml-8">
        <FilterBoxKolaborasi />
      </div>
      <div className="flex flex-col w-fit">
        <div className="grid grid-cols-4 gap-4 mx-8 flex-1">
          {/* <CardKolaborasiBooks
            coverBuku=""
            judul=""
            jumlahBab=""
            kategori=""
            slug=""
          /> */}
        </div>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={100} />
        </div>
      </div>
    </div>
  );
}
