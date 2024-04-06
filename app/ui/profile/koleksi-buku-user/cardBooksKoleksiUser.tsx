import React from "react";
import Image from "next/image";

import clsx from "clsx";
import { Button } from "@/app/ui/button";
import DownloadBukuUser from "@/app/ui/profile/koleksi-buku-user/downloadBukuUser";
import Link from "next/link";
import { redirect } from "next/navigation";

interface CardBooksKoleksiUserProps {
  buku_dijual_id: string;
  slug: string;
  className?: string;
  judul: string;
  kategori: string;
  coverBuku: string;
}

const CardBooksKoleksiUser: React.FC<CardBooksKoleksiUserProps> = ({
  buku_dijual_id,
  slug,
  className,
  judul,
  kategori,
  coverBuku,
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
            src={"http://kolaborasi-buku-backend.test/storage/" + coverBuku}
            alt="product image"
            width={500}
            height={500}
          />
        </figure>
        <div className="px-5 pb-5 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-light">{kategori}</h2>
            <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
              {judul}
            </h3>
          </div>
          <DownloadBukuUser buku_dijual_id={buku_dijual_id} judul={judul} />
        </div>
      </section>
    </Link>
  );
};

export default CardBooksKoleksiUser;
