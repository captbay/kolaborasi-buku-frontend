import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getRekening, getTrxBabKolaborasi } from "@/app/lib/data";

import { redirect } from "next/navigation";

import {
  getTrxBabKolaborasiResponse,
  rekeningData,
} from "@/app/lib/definitions";
import { Suspense } from "react";
import RingkasanPembelianBabKolaborasi from "@/app/ui/pembayaran/pembelianBabKolaborasi/ringkasanPembelianBabKolaborasi";

type Props = {
  searchParams: { token_trx: string };
};

export const metadata: Metadata = {
  title: "Transaksi Bab Kolaborasi",
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

  const data: getTrxBabKolaborasiResponse = await getTrxBabKolaborasi(
    token_trx,
    token,
    token_type
  );

  const rekening: rekeningData = await getRekening(token, token_type);

  if (!data) {
    redirect("/");
  }

  return <RingkasanPembelianBabKolaborasi data={data} rekening={rekening} />;
}
