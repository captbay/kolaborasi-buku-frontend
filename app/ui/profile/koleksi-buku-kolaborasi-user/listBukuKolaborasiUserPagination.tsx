import React from "react";

import { getKoleksiBukuKolaborasiResponse } from "@/app/lib/definitions";
import { getKoleksiBukuKolaborasiUser } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import EmptyData from "@/app/ui/emptyData";
import { cookies } from "next/headers";
import CardBooksKoleksiKolaborasiUser from "@/app/ui/profile/koleksi-buku-kolaborasi-user/cardBooksKoleksiKolaborasiUser";

export default async function ListBukuKolaborasiUserPagination({
  searchKolaborasi,
  currentPage,
}: {
  searchKolaborasi?: string;
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

  const koleksiKolaborasiData: getKoleksiBukuKolaborasiResponse =
    await getKoleksiBukuKolaborasiUser({
      limit: 12,
      page: currentPage,
      search: searchKolaborasi,
      token: token,
      token_type: token_type,
    });

  if (
    koleksiKolaborasiData?.data == null ||
    koleksiKolaborasiData?.data.length < 1
  ) {
    return (
      <EmptyData
        title="Data Koleksi Kolaborasi Buku tidak ditemukan"
        value="Silahkan berkolaborasi membuat buku terlebih dahulu :)"
      />
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {koleksiKolaborasiData?.data?.map((item, index) => (
          <CardBooksKoleksiKolaborasiUser
            key={index}
            id={item.id}
            status={item.status}
            datetime_deadline={item.datetime_deadline}
            no_bab={item.no_bab}
            judul_bab={item.judul_bab}
            judul_buku={item.judul_buku}
            cover_buku={item.cover_buku}
            kategori_buku={item.kategori_buku}
          />
        ))}
      </section>
      <div className="flex w-full justify-center">
        {koleksiKolaborasiData?.data != null ? (
          <Pagination totalPages={koleksiKolaborasiData?.last_page} />
        ) : null}
      </div>
    </>
  );
}
