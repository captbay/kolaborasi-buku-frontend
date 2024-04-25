import { getPembelianPaketPenerbitanAll } from "@/app/lib/data";
import { getTrxPaketResponse } from "@/app/lib/definitions";
import TransaksiPaketPenerbitan from "@/app/ui/profile/transaksi-paket-penerbitan";

import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Transaksi Saya",
};
export default async function TransaksiPaketPenerbitanPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };

  const trxBukuREVIEW: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("REVIEW", token, token_type);

  const trxBukuTERIMADRAFT: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("TERIMA DRAFT", token, token_type);

  const trxBukuDPUPLOADED: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("DP UPLOADED", token, token_type);

  const trxBukuDPTIDAKSAH: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("DP TIDAK SAH", token, token_type);

  const trxBukuINPUTISBN: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("INPUT ISBN", token, token_type);

  const trxBukuDRAFTSELESAI: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("DRAFT SELESAI", token, token_type);

  const trxBukuPELUNASANUPLOADED: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll(
      "PELUNASAN UPLOADED",
      token,
      token_type
    );

  const trxBukuPELUNASANTIDAKSAH: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll(
      "PELUNASAN TIDAK SAH",
      token,
      token_type
    );

  const trxBukuSIAPTERBIT: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("SIAP TERBIT", token, token_type);

  const trxBukuSUDAHTERBIT: getTrxPaketResponse[] =
    await getPembelianPaketPenerbitanAll("SUDAH TERBIT", token, token_type);

  return (
    <TransaksiPaketPenerbitan
      dataREVIEW={trxBukuREVIEW}
      dataTERIMADRAFT={trxBukuTERIMADRAFT}
      dataDPUPLOADED={trxBukuDPUPLOADED}
      dataDPTIDAKSAH={trxBukuDPTIDAKSAH}
      dataINPUTISBN={trxBukuINPUTISBN}
      dataDRAFTSELESAI={trxBukuDRAFTSELESAI}
      dataPELUNASANUPLOADED={trxBukuPELUNASANUPLOADED}
      dataPELUNASANTIDAKSAH={trxBukuPELUNASANTIDAKSAH}
      dataSIAPTERBIT={trxBukuSIAPTERBIT}
      dataSUDAHTERBIT={trxBukuSUDAHTERBIT}
    />
  );
}
