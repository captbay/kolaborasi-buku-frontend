import TransaksiKolaborasiBuku from "@/app/ui/profile/transaksi-kolaborasi-buku";

import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Transaksi Saya",
};
export default function TransaksiKolaborasiPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };

  return <TransaksiKolaborasiBuku />;
}
