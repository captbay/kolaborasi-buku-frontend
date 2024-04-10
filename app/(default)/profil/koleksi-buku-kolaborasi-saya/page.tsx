import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";

import React, { Suspense } from "react";
import { KoleksiBukuSkeleton } from "@/app/ui/skeletons";
import ListBukuKolaborasiUserPagination from "@/app/ui/profile/koleksi-buku-kolaborasi-user/listBukuKolaborasiUserPagination";
import SearchKoleksiBukuKolaborasiUser from "@/app/ui/profile/koleksi-buku-kolaborasi-user/searchKoleksiBukuKolaborasiUser";

export const metadata: Metadata = {
  title: "Koleksi Buku Saya",
};
export default async function KoleksiBukuKolaborasiSaya({
  searchParams,
}: {
  searchParams?: {
    searchKolaborasi?: string;
    page?: string;
  };
}) {
  const searchKolaborasi = searchParams?.searchKolaborasi || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="flex flex-col justify-center p-8 gap-5">
      <h1
        className={`${lusitana.className} text-2xl font-semibold tracking-tight text-blackColor text-center`}
      >
        Koleksi Buku Kolaborasi Saya
      </h1>
      <div className="relative flex-1 flex-shrink-0">
        <Suspense fallback={<p>Loading feed...</p>}>
          <SearchKoleksiBukuKolaborasiUser placeholder="Cari buku kolaborasi saya berdasarkan judul buku atau judul bab..." />
        </Suspense>
      </div>
      <Suspense
        key={searchKolaborasi + currentPage}
        fallback={<KoleksiBukuSkeleton />}
      >
        <ListBukuKolaborasiUserPagination
          searchKolaborasi={searchKolaborasi}
          currentPage={currentPage}
        />
      </Suspense>
    </section>
  );
}
