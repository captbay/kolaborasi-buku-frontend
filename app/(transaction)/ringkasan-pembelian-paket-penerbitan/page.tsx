import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getJasaTambahan, getPaketPenerbitanById } from "@/app/lib/data";

import { redirect } from "next/navigation";

import { JasaTambahan, PaketPenerbitan } from "@/app/lib/definitions";
import { Suspense } from "react";
import RingkasanBeforeBuyPaketPenerbitan from "@/app/ui/ringkasan-pembelian-paket/ringkasanBeforeBuy";

type Props = {
  searchParams: { paket_id: string };
};

export const metadata: Metadata = {
  title: "Ringkasan Pembelian Paket",
};

export default async function Page({ searchParams }: Props) {
  const paket_id = searchParams?.paket_id;

  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };

  if (!paket_id) {
    redirect("/");
  }

  const dataPaket: PaketPenerbitan = await getPaketPenerbitanById(
    paket_id,
    token,
    token_type
  );

  const dataJasaTambahan: JasaTambahan[] = await getJasaTambahan(
    paket_id,
    token,
    token_type
  );

  if (!dataPaket || !dataJasaTambahan) {
    redirect("/");
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <RingkasanBeforeBuyPaketPenerbitan
        dataPaket={dataPaket}
        dataJasaTambahan={dataJasaTambahan}
      />
    </Suspense>
  );
}
