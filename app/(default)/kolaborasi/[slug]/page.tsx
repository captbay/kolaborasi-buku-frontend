import type { Metadata } from "next";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

import Breadcrumbs from "@/app/ui/breadcrumbs";
import TimelinePenulisan from "@/app/ui/kolaborasi/timelinePenulisan";
import CardBabBuku from "@/app/ui/kolaborasi/cardBabBuku";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDetailBukuKolaborasiResponse } from "@/app/lib/definitions";
import { getDetailBukuKolaborasi } from "@/app/lib/actions";

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

  const detailBuku: getDetailBukuKolaborasiResponse =
    await getDetailBukuKolaborasi(slug);

  if (!detailBuku) {
    notFound();
  }

  return (
    <main id="content">
      <Suspense fallback={<p>Loading feed...</p>}>
        <section className="px-14 md:px-28 py-4">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Kolaborasi", href: "/kolaborasi" },
              {
                label: `${detailBuku.kategori}`,
                href: `/kolaborasi?kategori=${detailBuku.kategori}`,
              },
              {
                label: `${detailBuku.judul}`,
                href: `/kolaborasi/${slug}`,
                active: true,
              },
            ]}
          />
        </section>
        <section className="px-14 md:px-28 py-12">
          <div className="flex justify-between gap-16">
            <div className="flex flex-col gap-16">
              <div className="flex justify-between gap-8">
                <div className="w-1/2 flex flex-col sticky top-[182px] h-fit">
                  <Image
                    className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                    src={
                      process.env.NEXT_PUBLIC_STORAGE_FILE +
                      detailBuku.cover_buku
                    }
                    alt="hero_image"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-full flex flex-col">
                  {/* tag */}
                  <div className="flex">
                    {detailBuku.status_kolaborasi == "closed" ? (
                      <div className="bg-green-100 rounded-full px-4 py-2">
                        <p className="text-green-500">Kolaborator Terpenuhi</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-100 rounded-full px-4 py-2">
                        <p className="text-yellow-500">Menunggu Kolaborator</p>
                      </div>
                    )}
                  </div>
                  {/* head */}
                  <div>
                    <p className="text-gray-500 mt-2">{detailBuku.kategori}</p>
                    <h1 className={`${lusitana.className} text-4xl font-bold`}>
                      {detailBuku.judul}
                    </h1>
                  </div>
                  {/* deskripsi */}
                  <div>
                    <h2 className="text-xl font-semibold mt-8">Deskripsi</h2>
                    <p className="mt-4 text-gray-500 text-wrap">
                      {detailBuku.deskripsi}
                    </p>
                  </div>
                  {/* detail data */}
                  <div className="flex gap-16 mt-8">
                    <div className="flex flex-col gap-2">
                      {/* jumlah halaman */}
                      <h2 className="text-lg font-semibold">Jumlah Bab</h2>
                      <p className="text-gray-500">{detailBuku.jumlah_bab}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center">
                  <h2 className={`${lusitana.className} text-lg font-semibold`}>
                    List Bab
                  </h2>
                </div>
                {/* swiper with card element */}
                <div className="flex flex-col gap-8">
                  {detailBuku.bab.map((item, index) => (
                    <CardBabBuku
                      key={index}
                      id={item.id}
                      no_bab={item.no_bab}
                      judul={item.judul}
                      harga={item.harga}
                      durasi_pembuatan={item.durasi_pembuatan}
                      deskripsi={item.deskripsi}
                      is_terjual={item.is_terjual}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col items-center sticky top-[182px]">
              <h2 className={`${lusitana.className} text-lg font-semibold`}>
                Timeline
              </h2>
              <div className="w-full mt-8 flex justify-center">
                <TimelinePenulisan data={detailBuku.timeline_kolaborasi} />
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}
