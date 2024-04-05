import React from "react";

import { getKoleksiBukuResponse } from "@/app/lib/definitions";
import { getBuku, getKoleksiBukuUser } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import EmptyData from "@/app/ui/emptyData";
import { cookies } from "next/headers";
import CardBooksKoleksiUser from "@/app/ui/profile/koleksi-buku-user/cardBooksKoleksiUser";

export default async function ListBukuUserPagination({
  search,
  currentPage,
}: {
  search?: string;
  currentPage: number;
}) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, id, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        id: null,
        token_type: null,
      };

  const koleksiBuku: getKoleksiBukuResponse = await getKoleksiBukuUser({
    limit: 12,
    page: currentPage,
    search: search,
    token: token,
    token_type: token_type,
  });

  if (koleksiBuku?.data == null || koleksiBuku?.data.length < 1) {
    return (
      <EmptyData
        title="Data Koleksi Buku tidak ditemukan"
        value="Silahkan membeli buku terlebih dahulu :)"
      />
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {koleksiBuku?.data?.map((item, index) => (
          <CardBooksKoleksiUser
            key={index}
            buku_dijual_id={item.buku_dijual_id}
            judul={item.judul}
            kategori={item.kategori}
            coverBuku={item.cover_buku}
          />
        ))}
      </section>
      <div className="flex w-full justify-center">
        {koleksiBuku?.data != null ? (
          <Pagination totalPages={koleksiBuku?.last_page} />
        ) : null}
      </div>
    </>
  );
}
