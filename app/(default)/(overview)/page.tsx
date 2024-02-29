import { lusitana } from "@/app/ui/fonts";

import Image from "next/image";

import { Metadata } from "next";
import Link from "next/link";

import CardBooks from "@/app/ui/cards";
import Coursell from "@/app/ui/beranda/coursell";
import { Button } from "@/app/ui/button";
import Testimoni from "@/app/ui/beranda/testimoni";
import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";

export const metadata: Metadata = {
  title: "Beranda",
};

export default async function Page() {
  return (
    <main id="content">
      <section>
        <Coursell />
      </section>
      <section className="px-20 py-16">
        {/* swiper with card element */}
        <ProdukTerlaris />
      </section>
      <section className="px-28 py-8">
        <div className="flex w-full items-center justify-around bg-white border border-gray-200 rounded-lg shadow">
          <div className="px-5 pb-5">
            <h2 className="text-sm font-light">Sejarah</h2>
            <h3 className="text-base font-semibold tracking-tight text-blackColor">
              Buku Kemerdekaan Indonesia : sejarah dari negeri kuno
            </h3>
            <Button className="mt-4">Lihat Detail</Button>
          </div>
          <figure>
            <Image
              className="p-4 w-48 h-48"
              src="/books/1.png"
              alt="product image"
              width={500}
              height={500}
            />
          </figure>
        </div>
      </section>
      <section className="px-20 py-16">
        <div className="flex justify-center items-center px-8">
          <h2 className={`${lusitana.className} text-lg`}>Koleksi Buku</h2>
        </div>
        {/* swiper with card element */}
        <div className="flex justify-between mt-4">
          <CardBooks />
          <CardBooks />
          <CardBooks />
          <CardBooks />
        </div>
        <div className="flex justify-center items-center px-8">
          <Button className="mt-8">Lihat Detail</Button>
        </div>
      </section>
      <section className="px-20 py-16">
        <div className="flex justify-center items-center px-8">
          <h2 className={`${lusitana.className} text-lg`}>Ayo Kolaborasi!</h2>
        </div>
        {/* swiper with card element */}
        <div className="flex justify-between mt-4">
          <CardBooks />
          <CardBooks />
          <CardBooks />
          <CardBooks />
        </div>
        <div className="flex justify-center items-center px-8">
          <Button className="mt-8">Lihat Detail</Button>
        </div>
      </section>
      <section className="px-28 py-16">
        <div className="flex flex-col justify-center items-center px-8">
          <h2 className={`${lusitana.className} text-lg font-semibold`}>
            Testimoni Pelanggan
          </h2>
          <p className="text-center text-sm font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nisl non tincidunt.
          </p>
        </div>
        {/* swiper with card element */}
        <div className="mt-4">
          <Testimoni />
        </div>
      </section>
    </main>
  );
}
