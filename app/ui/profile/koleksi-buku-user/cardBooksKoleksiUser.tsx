import React from "react";
import Image from "next/image";

import clsx from "clsx";
import { Button } from "@/app/ui/button";
import DownloadBukuUser from "@/app/ui/profile/koleksi-buku-user/downloadBukuUser";
import Link from "next/link";

interface CardBooksKoleksiUserProps {
  buku_dijual_id: string;
  slug: string;
  className?: string;
  judul: string;
  kategori: string;
  coverBuku: string;
  active_flag: boolean;
}

const CardBooksKoleksiUser: React.FC<CardBooksKoleksiUserProps> = ({
  buku_dijual_id,
  slug,
  className,
  judul,
  kategori,
  coverBuku,
  active_flag,
}) => {
  return (
    <section
      className={clsx(
        "flex w-full h-full flex-col justify-between bg-white border border-gray-200 rounded-lg shadow",
        className
      )}
    >
      {active_flag ? (
        <Link href={`/koleksi-buku/${slug}`}>
          <figure className="flex justify-center">
            <Image
              className="p-4 w-48 h-48"
              src={process.env.NEXT_PUBLIC_STORAGE_FILE + coverBuku}
              alt="product image"
              width={500}
              height={500}
            />
          </figure>
          <div className="px-5 flex flex-col">
            <h2 className="text-sm font-light">{kategori}</h2>
            <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
              {judul}
            </h3>
          </div>
        </Link>
      ) : (
        <>
          <figure className="flex justify-center">
            <Image
              className="p-4 w-48 h-48"
              src={process.env.NEXT_PUBLIC_STORAGE_FILE + coverBuku}
              alt="product image"
              width={500}
              height={500}
            />
          </figure>
          <div className="px-5 flex flex-col">
            <h2 className="text-sm font-light">{kategori}</h2>
            <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
              {judul}
            </h3>
          </div>
        </>
      )}
      <div className="px-5 pb-5">
        <DownloadBukuUser buku_dijual_id={buku_dijual_id} judul={judul} />
      </div>
    </section>
  );
};

export default CardBooksKoleksiUser;
