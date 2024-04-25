import { Metadata } from "next";

import ListBukuKolaborasi from "@/app/ui/kolaborasi/listBukuKolaborasi";
import Jumbotron from "@/app/ui/jumbotron";
import { getKategori } from "@/app/lib/data";
import { kategoriData } from "@/app/lib/definitions";
import { Suspense } from "react";
import { KoleksiBukuSkeleton, FilterBukuSkeleton } from "@/app/ui/skeletons";
import FilterBoxKolaborasi from "@/app/ui/filter-box-kolaborasi";

export const metadata: Metadata = {
  title: "Kolaborasi Buku",
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

  const dataKategori: kategoriData[] = await getKategori();
  return (
    <main id="content">
      <section>
        <Jumbotron
          judul="Ayo Kolaborasi Membuat Buku Dengan Kami"
          deskripsi="Kolaborasi dengan kami untuk membuat buku yang bermanfaat bagi banyak orang. Dengan kolaborasi, Anda dapat memperoleh banyak keuntungan dari kolaborasi buku yang Anda buat."
        />
      </section>
      <section className="px-14 lg:px-20 py-16">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          <div className="lg:ml-8">
            <Suspense fallback={<FilterBukuSkeleton />}>
              <FilterBoxKolaborasi dataKategori={dataKategori} />
            </Suspense>
          </div>
          <div className="w-full flex-1">
            <Suspense
              key={search + currentPage + order + kategori}
              fallback={<KoleksiBukuSkeleton />}
            >
              <ListBukuKolaborasi
                order={order}
                kategori={kategori}
                currentPage={currentPage}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
