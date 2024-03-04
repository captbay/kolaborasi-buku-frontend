import { Metadata } from "next";

import ListBukuKolaborasi from "@/app/ui/kolaborasi/listBukuKolaborasi";
import Jumbotron from "@/app/ui/jumbotron";

export const metadata: Metadata = {
  title: "Kolaborasi Buku",
};

export default async function Page() {
  return (
    <main id="content">
      <section>
        <Jumbotron
          judul="Ayo Kolaborasi Membuat Buku Dengan Kami"
          deskripsi="Kolaborasi dengan kami untuk membuat buku yang bermanfaat bagi banyak orang. Dengan kolaborasi, Anda dapat memperoleh banyak keuntungan dari kolaborasi buku yang Anda buat."
        />
      </section>
      <section className="px-20 py-16">
        <ListBukuKolaborasi />
      </section>
    </main>
  );
}
