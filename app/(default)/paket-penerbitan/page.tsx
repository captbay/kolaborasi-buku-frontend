import { lusitana } from "@/app/ui/fonts";

import { Metadata } from "next";

import Pricing from "@/app/ui/paket-penerbitan/pricing";
import Testimoni from "@/app/ui/beranda/testimoni";
import Jumbotron from "@/app/ui/jumbotron";

export const metadata: Metadata = {
  title: "Paket Penerbitan",
};

export default async function Page() {
  return (
    <main id="content">
      <section>
        <Jumbotron
          judul="Paket Penerbitan Buku"
          deskripsi="Kami siap membantu Anda dalam menerbitkan buku Anda. Pilih paket yang sesuai dengan kebutuhan Anda, kami selalu siap berikan yang sebaik mungkin."
        />
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
