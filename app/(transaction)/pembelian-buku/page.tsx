import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getRekening, getTrxPenjualanBuku } from "@/app/lib/data";

import { redirect } from "next/navigation";

import {
  getTrxPenjualanBukuResponse,
  rekeningData,
} from "@/app/lib/definitions";
import { Suspense } from "react";
import RingkasanPembelianBuku from "@/app/ui/pembayaran/pembelianBuku/ringkasanPembelianBuku";

type Props = {
  searchParams: { token_trx: string };
};

export const metadata: Metadata = {
  title: "Transaksi Buku",
};

export default async function Page({ searchParams }: Props) {
  const token_trx = searchParams?.token_trx;

  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };

  if (!token_trx) {
    redirect("/");
  }

  const data: getTrxPenjualanBukuResponse = await getTrxPenjualanBuku(
    token_trx,
    token,
    token_type
  );

  const rekening: rekeningData = await getRekening(token, token_type);

  if (!data) {
    redirect("/");
  }

  return <RingkasanPembelianBuku data={data} rekening={rekening} />;
}
