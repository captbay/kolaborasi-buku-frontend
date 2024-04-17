import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";

import { Metadata } from "next";
import { Suspense } from "react";

import BucketList from "@/app/ui/keranjang/bucketList";
import { CardData } from "@/app/lib/definitions";
import { getBestSeller } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Keranjang",
};

export default async function keranjang() {
  const bestSeller: CardData[] = await getBestSeller();

  return (
    <main id="content">
      <section className="px-14 lg:px-28 py-16">
        <BucketList />
      </section>
      <section className="px-14 lg:px-20 py-16">
        <Suspense fallback={<p>Loading feed...</p>}>
          <ProdukTerlaris data={bestSeller} />
        </Suspense>
      </section>
    </main>
  );
}
