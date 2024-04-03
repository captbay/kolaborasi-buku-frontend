import { getPembelianBukuAll } from "@/app/lib/data";
import { getTrxPenjualanBukuResponse } from "@/app/lib/definitions";
import TransaksiPembelianBuku from "@/app/ui/profile/transaksi-pembelian-buku";

import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Transaksi Saya",
};
export default async function LoginPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };
  const trxBukuPROGRESS: getTrxPenjualanBukuResponse[] =
    await getPembelianBukuAll("PROGRESS", token, token_type);

  const trxBukuUPLOADED: getTrxPenjualanBukuResponse[] =
    await getPembelianBukuAll("UPLOADED", token, token_type);

  const trxBukuFAILED: getTrxPenjualanBukuResponse[] =
    await getPembelianBukuAll("FAILED", token, token_type);

  const trxBukuDONE: getTrxPenjualanBukuResponse[] = await getPembelianBukuAll(
    "DONE",
    token,
    token_type
  );

  return (
    <TransaksiPembelianBuku
      dataPROGRESS={trxBukuPROGRESS}
      dataUPLOADED={trxBukuUPLOADED}
      dataFAILED={trxBukuFAILED}
      dataDONE={trxBukuDONE}
    />
  );
}
