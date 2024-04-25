import React from "react";

import CardKolaborasiBooks from "@/app/ui/cards-kolaborasi";
import Pagination from "@/app/ui/pagination";
import EmptyData from "../emptyData";
import { getKolaborasiBukuAllResponse } from "@/app/lib/definitions";
import { getKolaborasi } from "@/app/lib/data";

export default async function listBukuKolaborasi({
  search,
  currentPage,
  order,
  kategori,
}: {
  search?: string;
  currentPage: number;
  order: string;
  kategori: string;
  hargaMin?: number;
  hargaMax?: number;
}) {
  const buku: getKolaborasiBukuAllResponse = await getKolaborasi({
    limit: 12,
    page: currentPage,
    order: order,
    kategori: kategori,
  });

  if (buku?.data == null || buku?.data.length < 1) {
    return (
      <EmptyData
        hrefBack="/kolaborasi"
        title="Data tidak ditemukan"
        value="Silahkan mencari kolaborasi lainnya"
        isButton={true}
      />
    );
  }
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {buku?.data?.map((item, index) => (
          <CardKolaborasiBooks
            key={index}
            slug={item.slug}
            judul={item.judul}
            kategori={item.kategori}
            coverBuku={item.cover_buku}
            jumlahBab={item.jumlah_bab}
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
