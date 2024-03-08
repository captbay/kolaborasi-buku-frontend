import React from "react";
import { formatCurrency } from "../lib/utils";
import { Button } from "./button";
import Link from "next/link";

interface paketData {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
}

export default async function priceCards({
  id,
  nama,
  harga,
  deskripsi,
}: paketData) {
  return (
    <div className="w-full flex flex-col max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {nama}
      </h5>
      <div className="w-fit flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-extrabold tracking-tight">
          {formatCurrency(harga)}
        </span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /bulan
        </span>
      </div>
      <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
        {deskripsi}
      </p>
      <Button>
        <Link href="#">Pilih Paket</Link>
      </Button>
    </div>
  );
}
