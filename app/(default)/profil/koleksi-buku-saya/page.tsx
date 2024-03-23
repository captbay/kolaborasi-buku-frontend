import KoleksiBuku from "@/app/ui/profile/koleksi-buku-user";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koleksi Buku Saya",
};
export default function LoginPage() {
  return <KoleksiBuku />;
}
