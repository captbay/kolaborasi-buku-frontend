import { Metadata } from "next";

import Coursell from "@/app/ui/beranda/coursell";
import ProdukTerlaris from "@/app/ui/beranda/produkTerlaris";
import KoleksiBuku from "@/app/ui/beranda/koleksiBuku";
import KolaborasiBuku from "@/app/ui/beranda/kolaborasiBuku";
import TestimoniBeranda from "@/app/ui/beranda/testimoniBeranda";
import BannerBookVertical from "@/app/ui/beranda/bannerBookVertical";

import { Suspense } from "react";
import { CoursellSkeleton } from "@/app/ui/skeletons";

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
        <Suspense fallback={<p>Loading feed...</p>}>
          <ProdukTerlaris />
        </Suspense>
      </section>
      <section className="px-28 py-8">
        <Suspense fallback={<p>Loading feed...</p>}>
          <BannerBookVertical />
        </Suspense>
      </section>
      <section className="px-20 py-16">
        <KoleksiBuku />
      </section>
      <section className="px-20 py-16">
        <KolaborasiBuku />
      </section>
      <section className="px-28 py-16">
        <TestimoniBeranda />
      </section>
    </main>
  );
}
