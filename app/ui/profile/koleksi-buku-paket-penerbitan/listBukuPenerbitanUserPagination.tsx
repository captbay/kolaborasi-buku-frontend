import React from "react";

import { getKoleksiBukuPenerbitanResponse } from "@/app/lib/definitions";
import { getKoleksiBukuPenerbitanUser } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import EmptyData from "@/app/ui/emptyData";
import { cookies } from "next/headers";
import CardBooksKoleksiPenerbitanUser from "@/app/ui/profile/koleksi-buku-paket-penerbitan/cardBooksKoleksiPenerbitanUser";

export default async function ListBukuPenerbitanUserPagination({
  searchPenerbitan,
  currentPage,
}: {
  searchPenerbitan?: string;
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

  const koleksiBukuPenerbitan: getKoleksiBukuPenerbitanResponse =
    await getKoleksiBukuPenerbitanUser({
      limit: 12,
      page: currentPage,
      search: searchPenerbitan,
      token: token,
      token_type: token_type,
    });

  if (
    koleksiBukuPenerbitan?.data == null ||
    koleksiBukuPenerbitan?.data.length < 1
  ) {
    return (
      <EmptyData
        title="Data Koleksi Buku Penerbitan tidak ditemukan"
        value="Silahkan membeli paket penerbitan terlebih dahulu :)"
      />
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {koleksiBukuPenerbitan?.data?.map((item, index) => (
          <CardBooksKoleksiPenerbitanUser
            key={index}
            id={item.id}
            judul={item.judul}
            coverBuku={item.cover_buku}
          />
        ))}
      </section>
      <div className="flex w-full justify-center">
        {koleksiBukuPenerbitan?.data != null ? (
          <Pagination totalPages={koleksiBukuPenerbitan?.last_page} />
        ) : null}
      </div>
    </>
  );
}
