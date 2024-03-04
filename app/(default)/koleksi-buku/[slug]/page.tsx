import type { Metadata } from "next";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

import Breadcrumbs from "@/app/ui/breadcrumbs";
import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";

import { Avatar } from "flowbite-react";
import { Rating, RatingStar } from "flowbite-react";

// import { fetchCustomers } from "@/app/lib/data";/
// import { fetchInvoiceById } from "@/app/lib/data";

// import { notFound } from "next/navigation";

import dynamic from "next/dynamic";
import { Button } from "@/app/ui/button";
const ImageSection = dynamic(
  () => import("@/app/ui/detail-buku/imageSection"),
  { ssr: false }
);

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
            { label: "Koleksi Buku", href: "/koleksi-buku" },
            {
              label: `${namaKategori}`,
              href: `/koleksi-buku?kategori=${namaKategori}`,
            },
            {
              label: "Nama Buku",
              href: `/koleksi-buku/${slug}`,
              active: true,
            },
          ]}
        />
      </section>
      <section className="px-28 py-12">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between gap-8">
              <div className="w-1/4 flex flex-col sticky top-[182px] h-fit">
                <Image
                  src={"/books/1.png"}
                  alt="Gambar Buku"
                  className="w-full h-[250px] object-contain rounded-lg p-4 shadow-md bg-whiteColor"
                  width={500}
                  height={500}
                />
                <ImageSection />
              </div>
              <div className="w-full flex flex-col">
                {/* head */}
                <div className="">
                  <h1 className={`${lusitana.className} text-4xl font-bold`}>
                    Judul Buku
                  </h1>
                  <p className="text-gray-500 mt-2">Penulis</p>
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
            <div className="flex flex-col justify-center items-center px-8 mt-16">
              <h2 className={`${lusitana.className} text-lg font-semibold`}>
                Testimoni Pembelian Buku
              </h2>
              <p className="text-center text-sm font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                bibendum, nunc at ultrices ultrices, nunc justo lacinia justo,
                eget molestie dolor purus id nunc. Donec vel nunc at justo
                lacinia
              </p>
            </div>
            <div className="mt-4">
              {/* Testimoni Pembelian Buku */}
              <div className="flex flex-col gap-4">
                <div className="w-full h-fit flex flex-col gap-2">
                  <Rating>
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5 hari lalu
                    </p>
                  </Rating>
                  <div className="flex gap-4 items-center">
                    <Avatar alt="User" img="/coursell/1.jpg" rounded />
                    <h3 className="text-md font-medium">Nama Pembeli</h3>
                  </div>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec bibendum, nunc at ultrices ultrices, nunc justo
                    lacinia justo, eget molestie dolor purus id nunc. Donec vel
                    nunc at justo lacinia
                  </p>
                  <div className="h-[1px] rounded-full w-full bg-gray-300 px-20"></div>
                </div>
                <div className="w-full h-fit flex flex-col gap-2">
                  <Rating>
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5 hari lalu
                    </p>
                  </Rating>
                  <div className="flex gap-4 items-center">
                    <Avatar alt="User" img="/coursell/1.jpg" rounded />
                    <h3 className="text-md font-medium">Nama Pembeli</h3>
                  </div>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec bibendum, nunc at ultrices ultrices, nunc justo
                    lacinia justo, eget molestie dolor purus id nunc. Donec vel
                    nunc at justo lacinia
                  </p>
                  <div className="h-[1px] rounded-full w-full bg-gray-300 px-20"></div>
                </div>
                <div className="w-full h-fit flex flex-col gap-2">
                  <Rating>
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5 hari lalu
                    </p>
                  </Rating>
                  <div className="flex gap-4 items-center">
                    <Avatar alt="User" img="/coursell/1.jpg" rounded />
                    <h3 className="text-md font-medium">Nama Pembeli</h3>
                  </div>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec bibendum, nunc at ultrices ultrices, nunc justo
                    lacinia justo, eget molestie dolor purus id nunc. Donec vel
                    nunc at justo lacinia
                  </p>
                  <div className="h-[1px] rounded-full w-full bg-gray-300 px-20"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-8 w-full h-fit sticky top-[182px]">
            <div className="bg-white border border-gray-200 rounded-lg min-w-full">
              <div className="flex flex-col m-6">
                <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                  Harga
                </h2>
                <div className="flex justify-between mt-4">
                  <h3 className="text-base font-semibold tracking-tight text-blackColor">
                    Rp 100.000
                  </h3>
                </div>
                <Button className="mt-4">Tambah ke Keranjang</Button>
                <Button className="mt-4">Beli Sekarang</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-20 py-12">
        <ProdukTerlaris />
      </section>
    </main>
  );
}
