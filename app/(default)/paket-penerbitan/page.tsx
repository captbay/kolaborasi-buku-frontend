import { lusitana } from "@/app/ui/fonts";

import { Metadata } from "next";

import Pricing from "@/app/ui/paket-penerbitan/pricing";
import Testimoni from "@/app/ui/beranda/testimoni";
import { Button } from "@/app/ui/button";

export const metadata: Metadata = {
  title: "Paket Penerbitan",
};

export default async function Page() {
  return (
    <main id="content">
      <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <header>
            <h1
              className={`${lusitana.className} mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl`}
            >
              Paket Penerbitan Buku
            </h1>
          </header>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Anda bisa menerbitkan buku dengan mudah dan cepat dengan kami.
          </p>
        </div>
      </section>
      <section className="px-28 py-16">
        <div className="flex flex-col justify-center items-center px-8">
          <h2 className={`${lusitana.className} text-lg font-semibold`}>
            Paket-Paket Terbaik Kami
          </h2>
          <p className="text-center text-sm font-light">
            Pilih paket yang sesuai dengan kebutuhan Anda, kami selalu siap
            berikan yang sebaik mungkin.
          </p>
        </div>
        <div className="mt-4">
          <Pricing />
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
        <div className="flex justify-between mt-4">
          <Testimoni />
        </div>
      </section>
    </main>
  );
}
