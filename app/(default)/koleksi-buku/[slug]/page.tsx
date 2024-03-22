import type { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";

import Breadcrumbs from "@/app/ui/breadcrumbs";
import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";
import ThumbSlider from "@/app/ui/koleksi-buku/detail/thumbSlider";
import TestimoniPembeliBuku from "@/app/ui/koleksi-buku/detail/testimoniPembeliBuku";

import { getBestSeller, getDetailBuku } from "@/app/lib/data";

import { notFound } from "next/navigation";

import { Button } from "@/app/ui/button";
import { CardData, getDetailBukuResponse } from "@/app/lib/definitions";
import { formatCurrency } from "../../../lib/utils";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return {
    title: slug,
  };
}

export default async function Page({ params }: Props) {
  const slug = params.slug;

  const detailBuku: getDetailBukuResponse = await getDetailBuku(slug);
  const bestSeller: CardData[] = await getBestSeller();

  if (!detailBuku) {
    notFound();
  }

  return (
    <main id="content">
      <Suspense fallback={<p>Loading feed...</p>}>
        <section className="hidden lg:block px-14 lg:px-28 py-4">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Koleksi Buku", href: "/koleksi-buku" },
              {
                label: `${detailBuku.kategori}`,
                href: `/koleksi-buku?kategori=${detailBuku.kategori}`,
              },
              {
                label: `${detailBuku.judul}`,
                href: `/koleksi-buku/${slug}`,
                active: true,
              },
            ]}
          />
        </section>
        <section className="px-14 lg:px-28 py-12">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col lg:w-3/4">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="lg:w-1/2 flex flex-col lg:sticky lg:top-[182px] h-fit">
                  <ThumbSlider galleryFoto={detailBuku.gallery_foto} />
                </div>
                <div className="w-full flex flex-col">
                  {/* head */}
                  <div>
                    <p className="text-gray-500 mt-2">{detailBuku.kategori}</p>
                    <h1 className={`${lusitana.className} text-4xl font-bold`}>
                      {detailBuku.judul}
                    </h1>
                    <p className="text-gray-500 mt-2">
                      {detailBuku.list_penulis}
                    </p>
                  </div>
                  {/* deskripsi */}
                  <div>
                    <h2 className="text-xl font-semibold mt-8">Deskripsi</h2>
                    <p className="mt-4 text-gray-500 text-wrap">
                      {detailBuku.deskripsi}
                    </p>
                  </div>
                  {/* detail data */}
                  <div className="flex flex-col lg:flex-row gap-16 mt-8">
                    <div className="flex flex-col gap-8">
                      {/* isbn */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">ISBN</h2>
                        <p className="text-gray-500">{detailBuku.isbn}</p>
                      </div>
                      {/* tanggal terbit */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">
                          Tanggal Terbit
                        </h2>
                        <p className="text-gray-500">
                          {detailBuku.tanggal_terbit}
                        </p>
                      </div>
                      {/* jumlah halaman */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">
                          Jumlah Halaman
                        </h2>
                        <p className="text-gray-500">
                          {detailBuku.jumlah_halaman}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-8">
                      {/* bahasa */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">Bahasa</h2>
                        <p className="text-gray-500">{detailBuku.bahasa}</p>
                      </div>
                      {/* penerbit */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">Penerbit</h2>
                        <p className="text-gray-500">{detailBuku.penerbit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center px-8 mt-16">
                <h2 className={`${lusitana.className} text-lg font-semibold`}>
                  Testimoni Pembelian Buku
                </h2>
                <p className="text-center text-sm font-light">
                  Temukan pengalaman membeli buku yang memuaskan dari pelanggan
                  setia kami!
                </p>
              </div>
              <div className="mt-4">
                {/* Testimoni Pembelian Buku */}
                <TestimoniPembeliBuku data={detailBuku.testimoni_pembeli} />
              </div>
            </div>
            <div className="lg:ml-8 lg:w-1/4 h-fit lg:sticky lg:top-[182px]">
              <div className="bg-white border border-gray-200 rounded-lg min-w-full">
                <div className="flex flex-col m-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                    Harga
                  </h2>
                  <div className="flex justify-between mt-4">
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(detailBuku.harga)}
                    </h3>
                  </div>
                  <Button className="mt-4">Tambah ke Keranjang</Button>
                  <Button className="mt-4">Beli Sekarang</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-14 lg:px-20 py-12">
          <Suspense fallback={<p>Loading feed...</p>}>
            <ProdukTerlaris data={bestSeller} />
          </Suspense>
        </section>
      </Suspense>
    </main>
  );
}
