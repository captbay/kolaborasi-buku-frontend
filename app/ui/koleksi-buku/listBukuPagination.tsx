import React from "react";

import CardBooks from "@/app/ui/cards";
import { getBukuAllResponse } from "@/app/lib/definitions";
import { getBuku } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import EmptyData from "@/app/ui/emptyData";

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

  if (buku?.data == null || buku?.data.length < 1) {
    return (
      <EmptyData
        hrefBack="/koleksi-buku"
        title="Data tidak ditemukan"
        value="Silahkan mencari buku lainnya"
        isButton={true}
      />
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        {buku?.data != null ? (
          <Pagination totalPages={buku?.last_page} />
        ) : null}
      </div>
    </>
  );
}
