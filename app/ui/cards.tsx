import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Rating, RatingStar } from "flowbite-react";

import clsx from "clsx";

interface CardBooksProps {
  className?: string;
}

const CardBooks: React.FC<CardBooksProps> = ({ className }) => {
  return (
    <Link href={`/koleksi-buku/${"slug"}`}>
      <div
        className={clsx(
          "flex min-w-fit flex-col bg-white border border-gray-200 rounded-lg shadow",
          className
        )}
      >
        <figure className="flex justify-center">
          <Image
            className="p-4 w-48 h-48"
            src="/books/1.png"
            alt="product image"
            width={500}
            height={500}
          />
        </figure>
        <div className="px-5 pb-5">
          <h2 className="text-sm font-light">Sejarah</h2>
          <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
            Buku Kemerdekaan Indonesia : sejarah dari negeri kuno
          </h3>
          <p className="text-xl font-bold text-blackColor ">Rp 599.000</p>
          <div className="flex items-center mt-2.5 justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Rating>
                <RatingStar />
                <p className="ml-2 text-sm font-medium text-blackColor dark:text-white">
                  5
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <p className="text-sm font-medium text-blackColor underline hover:no-underline dark:text-white">
                  73 Pembeli
                </p>
              </Rating>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBooks;
