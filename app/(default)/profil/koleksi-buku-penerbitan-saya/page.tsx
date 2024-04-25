import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";

import React, { Suspense } from "react";
import { KoleksiBukuSkeleton } from "@/app/ui/skeletons";
import ListBukuPenerbitanUserPagination from "@/app/ui/profile/koleksi-buku-paket-penerbitan/listBukuPenerbitanUserPagination";
import SearchKoleksiBukuPenerbitanUser from "@/app/ui/profile/koleksi-buku-paket-penerbitan/searchKoleksiBukuPenerbitanUser";

export const metadata: Metadata = {
  title: "Koleksi Buku Penerbitan Saya",
};
export default async function KoleksiBukuSaya({
  searchParams,
}: {
  searchParams?: {
    searchPenerbitan?: string;
    page?: string;
  };
}) {
  const searchPenerbitan = searchParams?.searchPenerbitan || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="flex flex-col justify-center p-8 gap-5">
      <h1
        className={`${lusitana.className} text-2xl font-semibold tracking-tight text-blackColor text-center`}
      >
        Koleksi Buku Penerbitan Saya
      </h1>
      <div className="relative flex-1 flex-shrink-0">
        <Suspense fallback={<p>Loading feed...</p>}>
          <SearchKoleksiBukuPenerbitanUser placeholder="Cari koleksi buku penerbitan saya berdasarkan judul..." />
        </Suspense>
      </div>
      <Suspense
        key={searchPenerbitan + currentPage}
        fallback={<KoleksiBukuSkeleton />}
      >
        <ListBukuPenerbitanUserPagination
          searchPenerbitan={searchPenerbitan}
          currentPage={currentPage}
        />
      </Suspense>
    </section>
  );
}
