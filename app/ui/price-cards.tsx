import React from "react";
import { formatCurrency } from "../lib/utils";
import { Button } from "./button";
import Link from "next/link";
import { jasaPaketData } from "../lib/definitions";

interface paketData {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  jasaData: jasaPaketData[];
}

export default async function priceCards({
  id,
  nama,
  harga,
  deskripsi,
  jasaData,
}: paketData) {
  const createQueryString = (name: any, value: any) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  return (
    <div className="w-full flex justify-between flex-col max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
      <div>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          {nama}
        </h5>
        <div className="w-fit flex flex-col sm:flex-row items-baseline text-gray-900 dark:text-white">
          <span className="text-xl md:text-3xl font-extrabold tracking-tight">
            {formatCurrency(harga)}
          </span>
          <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            / terbitan
          </span>
        </div>
        <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
          {deskripsi}
        </p>
        <ul role="list" className="space-y-5 my-7">
          {jasaData.map((data, index) => (
            <li className="flex items-center" key={index}>
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                {data.nama}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Button>
        <Link
          href={`/ringkasan-pembelian-paket-penerbitan?${createQueryString(
            "paket_id",
            id
          )}`}
        >
          Pilih Paket
        </Link>
      </Button>
    </div>
  );
}
