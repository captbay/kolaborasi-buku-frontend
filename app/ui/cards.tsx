import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Rating, RatingStar } from "flowbite-react";

import clsx from "clsx";

import { formatCurrency } from "@/app/lib/utils";

interface CardBooksProps {
  className?: string;
  slug: string;
  judul: string;
  harga: number;
  kategori: string;
  coverBuku: string;
  pembeli: number;
  rating: number;
}

const CardBooks: React.FC<CardBooksProps> = ({
  className,
  slug,
  judul,
  harga,
  kategori,
  coverBuku,
  pembeli,
  rating,
}) => {
  return (
    <Link href={`/koleksi-buku/${slug}`}>
      <section
        className={clsx(
          "flex w-full h-full flex-col bg-white border border-gray-200 rounded-lg shadow",
          className
        )}
      >
        <figure className="flex justify-center">
          <Image
            className="p-4 w-48 h-48"
            src={process.env.NEXT_PUBLIC_STORAGE_FILE + coverBuku}
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
          <p className="text-xl font-bold text-blackColor ">
            {formatCurrency(harga)}
          </p>
          <div className="flex items-center mt-2.5 justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Rating>
                <RatingStar />
                <p className="ml-2 text-sm font-medium text-blackColor dark:text-white">
                  {rating ? rating : "-"}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500" />
                <p className="text-sm font-medium text-blackColor underline hover:no-underline dark:text-white">
                  {pembeli} Pembeli
                </p>
              </Rating>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default CardBooks;
