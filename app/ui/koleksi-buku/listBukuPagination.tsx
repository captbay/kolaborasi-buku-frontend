import React from "react";

import CardBooks from "@/app/ui/cards";
import { getBukuAllResponse } from "@/app/lib/definitions";
import { getBuku } from "@/app/lib/actions";
import Pagination from "@/app/ui/pagination";
import EmptyData from "../emptyData";

export default async function listBukuPagination({
  search,
  currentPage,
  order,
  kategori,
  hargaMin,
  hargaMax,
}: {
  search?: string;
  currentPage: number;
  order: string;
  kategori: string;
  hargaMin?: number;
  hargaMax?: number;
}) {
  const buku: getBukuAllResponse = await getBuku({
    limit: 12,
    page: currentPage,
    search: search,
    order: order,
    kategori: kategori,
    hargaMin: hargaMin,
    hargaMax: hargaMax,
  });

  if (buku.data.length < 1) {
    return <EmptyData />;
  }

  return (
    <>
      <section className="grid grid-cols-4 gap-4 mx-8">
        {buku?.data?.map((item, index) => (
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
      </section>
      <div className="mt-5 flex w-full justify-center">
        {buku?.data.length > 0 ? (
          <Pagination totalPages={buku?.last_page} />
        ) : null}
      </div>
    </>
  );
}
