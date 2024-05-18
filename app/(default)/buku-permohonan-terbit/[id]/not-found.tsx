import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center gap-2 py-16">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Tidak Ditemukan</h2>
      <p>Data yang Anda cari tidak ditemukan</p>
      <Link href="/profil/koleksi-buku-penerbitan-saya">
        <Button>Kembali</Button>
      </Link>
    </main>
  );
}
