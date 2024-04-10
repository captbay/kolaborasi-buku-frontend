import { Metadata } from "next";
import { cookies } from "next/headers";

import TransaksiKolaborasiBuku from "@/app/ui/profile/transaksi-kolaborasi-buku";
import { getPembelianBukuKolaborasiAll } from "@/app/lib/data";
import { getTrxBabKolaborasiResponse } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Transaksi Saya",
};
export default async function TransaksiKolaborasiPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };
  const trxBukuPROGRESS: getTrxBabKolaborasiResponse[] =
    await getPembelianBukuKolaborasiAll("PROGRESS", token, token_type);

  const trxBukuUPLOADED: getTrxBabKolaborasiResponse[] =
    await getPembelianBukuKolaborasiAll("UPLOADED", token, token_type);

  const trxBukuFAILED: getTrxBabKolaborasiResponse[] =
    await getPembelianBukuKolaborasiAll("FAILED", token, token_type);

  const trxBukuDONE: getTrxBabKolaborasiResponse[] =
    await getPembelianBukuKolaborasiAll("DONE", token, token_type);

  return (
    <TransaksiKolaborasiBuku
      dataPROGRESS={trxBukuPROGRESS}
      dataUPLOADED={trxBukuUPLOADED}
      dataFAILED={trxBukuFAILED}
      dataDONE={trxBukuDONE}
    />
  );
}
