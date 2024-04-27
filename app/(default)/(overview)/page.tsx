import { Metadata } from "next";

import Coursell from "@/app/ui/beranda/coursell";
import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";
import KoleksiBuku from "@/app/ui/beranda/koleksiBuku";
import KolaborasiBuku from "@/app/ui/beranda/kolaborasiBuku";
import TestimoniBeranda from "@/app/ui/beranda/testimoniBeranda";
import BannerBookVertical from "@/app/ui/beranda/bannerBookVertical";

import { Suspense } from "react";
import { getBestSeller, getAds } from "@/app/lib/data";
import { getBukuAdsResponse, CardData } from "@/app/lib/definitions";
import { ProdukTerlarisSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Beranda",
};

export default async function Page() {
  const bestSeller: CardData[] = await getBestSeller();
  const adsBooks: getBukuAdsResponse = await getAds();

  return (
    <main id="content">
      <section>
        <Coursell />
      </section>
      <section className="px-14 lg:px-20 py-16">
        <Suspense fallback={<ProdukTerlarisSkeleton />}>
          <ProdukTerlaris data={bestSeller} />
        </Suspense>
      </section>
      <section className="px-4 lg:px-28 py-8">
        <Suspense fallback={<p>Loading feed...</p>}>
          <BannerBookVertical data={adsBooks.data} />
        </Suspense>
      </section>
      <section className="px-14 lg:px-20 py-16">
        <KoleksiBuku />
      </section>
      <section className="px-14 lg:px-20 py-16">
        <KolaborasiBuku />
      </section>
      <section className="px-14 lg:px-20 py-16">
        <TestimoniBeranda />
      </section>
    </main>
  );
}
