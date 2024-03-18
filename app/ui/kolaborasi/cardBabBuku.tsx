import React from "react";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { formatCurrency } from "@/app/lib/utils";
import Link from "next/link";

export default async function cardBabBuku({
  id,
  no_bab,
  judul,
  harga,
  durasi_pembuatan,
  deskripsi,
  is_terjual,
}: {
  id: string;
  no_bab: number;
  judul: string;
  harga: number;
  durasi_pembuatan: number;
  deskripsi: string;
  is_terjual: boolean;
}) {
  return (
    <section className="flex min-w-fit flex-col bg-white border border-gray-200 rounded-lg shadow">
      <div className="p-5">
        <h2 className="text-sm font-light">Bab {no_bab}</h2>
        <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
          {judul}
        </h3>
        {/* deskripsi */}
        <p className="mt-2 text-gray-500 text-wrap line-clamp-2">{deskripsi}</p>
        <h3 className="text-base font-semibold tracking-tight text-blackColor">
          {formatCurrency(harga)}
        </h3>
        <p className="text-sm font-medium text-blackColor text-end">
          Deadline {durasi_pembuatan} hari
        </p>
        {is_terjual ? (
          // disabled button
          <button
            className="flex w-full mt-2 h-10 items-center justify-center rounded-lg
             bg-disableColor px-4 text-sm font-medium text-whiteColor"
            disabled
          >
            Terjual
          </button>
        ) : (
          <Link href={`transaksi/bab-kolaborasi/${id}`}>
            <Button className="w-full mt-2">Ajukan Kolaborasi</Button>
          </Link>
        )}
      </div>
    </section>
  );
}
