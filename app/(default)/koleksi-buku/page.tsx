import { Metadata } from "next";
import { Suspense } from "react";

import ListBukuPagination from "@/app/ui/koleksi-buku/listBukuPagination";
import FilterBox from "@/app/ui/filter-box";
import { KoleksiBukuSkeleton, FilterBukuSkeleton } from "@/app/ui/skeletons";

import { kategoriData } from "@/app/lib/definitions";
import { getKategori } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Koleksi Buku",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    order?: string;
    kategori?: string;
    hargaMin?: number;
    hargaMax?: number;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const order = searchParams?.order || "terbaru";
  const kategori = searchParams?.kategori || "semua";
  const hargaMin = searchParams?.hargaMin;
  const hargaMax = searchParams?.hargaMax;

  const dataKategori: kategoriData[] = await getKategori();

  return (
    <main id="content">
      <section className="px-14 lg:px-20 py-16">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          <div className="lg:ml-8">
            <Suspense fallback={<FilterBukuSkeleton />}>
              <FilterBox dataKategori={dataKategori} />
            </Suspense>
          </div>
          <div className="w-full flex-1">
            <Suspense
              key={
                search + currentPage + order + kategori + hargaMin + hargaMax
              }
              fallback={<KoleksiBukuSkeleton />}
            >
              <ListBukuPagination
                search={search}
                order={order}
                kategori={kategori}
                hargaMin={hargaMin}
                hargaMax={hargaMax}
                currentPage={currentPage}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
