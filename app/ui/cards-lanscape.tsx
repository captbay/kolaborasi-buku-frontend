import React from "react";
import Image from "next/image";

import { Button } from "@/app/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../lib/utils";

export default function CardsLanscape({
  cover,
  judul,
  kategori,
  harga,
  onDelete,
  id,
  checked,
  onChoose,
}: {
  cover: string;
  judul: string;
  kategori: string;
  harga: number;
  onDelete: () => void;
  id: string;
  checked: boolean;
  onChoose: () => void;
}) {
  return (
    <div className="flex justify-around bg-white border border-gray-200 rounded-lg min-w-full">
      {/* checkbok */}
      <div className="flex items-center p-4">
        <input
          id={id}
          type="checkbox"
          value={harga}
          checked={checked}
          onChange={onChoose}
        />
      </div>
      <Image
        className="p-4 w-32 h-32"
        src={process.env.NEXT_PUBLIC_STORAGE_FILE + cover}
        alt="Gambar Buku"
        width={500}
        height={500}
      />
      <div className="flex flex-1 flex-col p-4 leading-normal">
        <h2 className="text-sm font-light">{kategori}</h2>
        <h3 className="text-base font-semibold tracking-tight text-blackColor">
          {judul}
        </h3>
        <p className="text-xl font-bold text-gray-900 ">
          {formatCurrency(harga)}
        </p>
      </div>
      <div className="flex items-end p-4">
        <Button className="w-fit" onClick={onDelete}>
          <TrashIcon className="text-whiteColor w-auto h-6" />
        </Button>
      </div>
    </div>
  );
}
