import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";

import { Metadata } from "next";

import BucketList from "@/app/ui/keranjang/bucketList";

export const metadata: Metadata = {
  title: "Beranda",
};

export default async function keranjang() {
  return (
    <main id="content">
      <section className="px-20 py-16">
        <BucketList />
      </section>
      <section className="px-20 py-16">
        <ProdukTerlaris />
      </section>
    </main>
  );
}
