import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

export default function EmptyData() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Data tidak ditemukan</p>
      <Link href="/koleksi-buku">
        <Button>Kembali</Button>
      </Link>
    </section>
  );
}
