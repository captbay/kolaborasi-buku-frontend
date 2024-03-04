import React from "react";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

interface CardBooksProps {
  className?: string;
}

const CardKolaborasi: React.FC<CardBooksProps> = ({ className }) => {
  return (
    <Link href={`/kolaborasi/${"slug"}`}>
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
          <p className="text-sm font-medium text-blackColor text-end">5 Bab</p>
        </div>
      </div>
    </Link>
  );
};

export default CardKolaborasi;
