import React from "react";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

interface CardBooksProps {
  className?: string;
  slug: string;
  judul: string;
  kategori: string;
  coverBuku: string;
  jumlahBab: string;
}

const CardKolaborasi: React.FC<CardBooksProps> = ({
  className,
  slug,
  judul,
  kategori,
  coverBuku,
  jumlahBab,
}) => {
  return (
    <Link href={`/kolaborasi/${slug}`}>
      <section
        className={clsx(
          "flex w-full h-full flex-col bg-white border border-gray-200 rounded-lg shadow",
          className
        )}
      >
        <figure className="flex justify-center">
          <Image
            className="p-4 w-48 h-48"
            src={coverBuku}
            alt="product image"
            width={500}
            height={500}
          />
        </figure>
        <div className="px-5 pb-5">
          <h2 className="text-sm font-light">{kategori}</h2>
          <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
            {judul}
          </h3>
          <p className="text-sm font-medium text-blackColor text-end">
            {jumlahBab} Bab
          </p>
        </div>
      </section>
    </Link>
  );
};

export default CardKolaborasi;
