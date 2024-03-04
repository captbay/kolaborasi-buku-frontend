import type { Metadata } from "next";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

import Breadcrumbs from "@/app/ui/breadcrumbs";
import TimelinePenulisan from "@/app/ui/kolaborasi/timelinePenulisan";
import CardBabBuku from "@/app/ui/kolaborasi/cardBabBuku";

// import { fetchCustomers } from "@/app/lib/data";/
// import { fetchInvoiceById } from "@/app/lib/data";

// import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  // const product = await fetch(`https://.../${slug}`).then((res) => res.json());

  return {
    title: slug,
  };
}

export default async function Page({ params }: Props) {
  const slug = params.slug;
  const namaKategori = "Nama Kategori";

  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(slug),
  //   fetchCustomers(),
  // ]);

  // if (!tidak ada data) {
  //   notFound();
  // }

  return (
    <main id="content">
      <section className="px-28 py-4">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Kolaborasi", href: "/kolaborasi" },
            {
              label: `${namaKategori}`,
              href: `/kolaborasi?kategori=${namaKategori}`,
            },
            {
              label: "Nama Buku",
              href: `/kolaborasi/${slug}`,
              active: true,
            },
          ]}
        />
      </section>
      <section className="px-28 py-12">
        <div className="flex justify-between gap-16">
          <div className="flex flex-col gap-16">
            <div className="flex justify-between gap-8">
              <div className="w-1/4 flex flex-col sticky top-[182px] h-fit">
                <Image
                  src={"/books/1.png"}
                  alt="Gambar Buku"
                  className="w-full h-[250px] object-contain rounded-lg p-4 shadow-md bg-whiteColor"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-full flex flex-col">
                {/* tag */}
                <div className="flex gap-4">
                  <div className="bg-yellow-100 rounded-full px-4 py-2">
                    <p className="text-yellow-500">Menunggu Kolaborator</p>
                  </div>
                  <div className="bg-green-100 rounded-full px-4 py-2">
                    <p className="text-green-500">Kolaborator Terpenuhi</p>
                  </div>
                </div>
                {/* head */}
                <div>
                  <h1
                    className={`${lusitana.className} text-4xl font-bold mt-8`}
                  >
                    Judul Buku
                  </h1>
                </div>
                {/* kategori */}
                <div className="mt-4">
                  <p className="text-gray-500 text-base">Nama Kategori</p>
                </div>
                {/* deskripsi */}
                <div>
                  <h2 className="text-xl font-semibold mt-8">Deskripsi</h2>
                  <p className="mt-4 text-gray-500 text-wrap">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec bibendum, nunc at ultrices ultrices, nunc justo
                    lacinia justo, eget molestie dolor purus id nunc. Donec vel
                    nunc at justo lacinia Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Donec bibendum, nunc at
                    ultrices ultrices, nunc justo lacinia justo, eget molestie
                    dolor purus id nunc. Donec vel nunc at justo lacinia Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    bibendum, nunc at ultrices ultrices, nunc justo lacinia
                    justo, eget molestie dolor purus id nunc. Donec vel nunc at
                    justo lacinia Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Donec bibendum, nunc at ultrices ultrices,
                    nunc justo lacinia justo, eget molestie dolor purus id nunc.
                    Donec vel nunc at justo lacinia
                  </p>
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
              <div className="grid grid-cols-4 gap-4">
                <CardBabBuku />
                <CardBabBuku />
                <CardBabBuku />
                <CardBabBuku />
                <CardBabBuku />
                <CardBabBuku />
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col items-center sticky top-[182px]">
            <h2 className={`${lusitana.className} text-lg font-semibold`}>
              Timeline
            </h2>
            <div className="w-full mt-8 flex justify-center">
              <TimelinePenulisan />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
