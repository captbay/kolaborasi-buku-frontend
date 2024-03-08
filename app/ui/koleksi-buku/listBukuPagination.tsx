import React from "react";

import CardBooks from "@/app/ui/cards";
import FilterBox from "@/app/ui/filter-box";
import Pagination from "@/app/ui/pagination";

export default async function listBukuPagination() {
  return (
    <div className="flex justify-between">
      <div className="ml-8">
        <FilterBox />
      </div>
      <div className="flex flex-col w-fit">
        <div className="grid grid-cols-4 gap-4 mx-8 flex-1">
          {/* <CardBooks
            coverBuku=""
            judul=""
            harga={}
            kategori=""
            pembeli={}
            rating={}
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
