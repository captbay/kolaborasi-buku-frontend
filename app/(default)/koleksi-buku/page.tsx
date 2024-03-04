import { Metadata } from "next";

import ListBukuPagination from "@/app/ui/koleksi-buku/listBukuPagination";

export const metadata: Metadata = {
  title: "Koleksi Buku",
};

export default async function Page() {
  return (
    <main id="content">
      <section className="px-20 py-16">
        <ListBukuPagination />
      </section>
    </main>
  );
}
