import TransaksiUser from "@/app/ui/profile/transaksi-user";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaksi Saya",
};
export default function LoginPage() {
  return <TransaksiUser />;
}
