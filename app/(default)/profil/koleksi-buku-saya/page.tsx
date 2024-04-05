import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";

import React, { Suspense } from "react";
import { KoleksiBukuSkeleton } from "@/app/ui/skeletons";
import ListBukuUserPagination from "@/app/ui/profile/koleksi-buku-user/listBukuUserPagination";
import SearchKoleksiBukuUser from "@/app/ui/profile/koleksi-buku-user/searchKoleksiBukuUser";

export const metadata: Metadata = {
  title: "Koleksi Buku Saya",
};
export default async function LoginPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="flex flex-col justify-center p-8 gap-5">
      <h1
        className={`${lusitana.className} text-2xl font-semibold tracking-tight text-blackColor text-center`}
      >
        Koleksi Buku Saya
      </h1>
      <div className="relative flex-1 flex-shrink-0">
        <Suspense fallback={<p>Loading feed...</p>}>
          <SearchKoleksiBukuUser placeholder="Cari koleksi buku saya berdasarkan judul..." />
        </Suspense>
      </div>
      <Suspense key={search + currentPage} fallback={<KoleksiBukuSkeleton />}>
        <ListBukuUserPagination search={search} currentPage={currentPage} />
      </Suspense>
    </section>
  );
}
