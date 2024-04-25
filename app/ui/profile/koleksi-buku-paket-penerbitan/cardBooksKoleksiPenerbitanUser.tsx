import React from "react";
import Image from "next/image";

import clsx from "clsx";
import { Button } from "@/app/ui/button";
import DownloadBukuUser from "@/app/ui/profile/koleksi-buku-user/downloadBukuUser";
import Link from "next/link";

interface CardBooksKoleksiPenerbitanUserProps {
  id: string;
  className?: string;
  judul: string;
  coverBuku: string;
}

const CardBooksKoleksiPenerbitanUser: React.FC<
  CardBooksKoleksiPenerbitanUserProps
> = ({ id, className, judul, coverBuku }) => {
  return (
    <section
      className={clsx(
        "flex w-full h-full flex-col justify-between bg-white border border-gray-200 rounded-lg shadow",
        className
      )}
    >
      <Link href={`/buku-permohonan-terbit/${id}`}>
        <figure className="flex justify-center">
          {coverBuku === null ? (
            <Image
              className="p-4 w-48 h-48"
              src={"/default_cover.jpg"}
              alt="product image"
              width={500}
              height={500}
            />
          ) : (
            <Image
              className="p-4 w-48 h-48"
              src={"http://kolaborasi-buku-backend.test/storage/" + coverBuku}
              alt="product image"
              width={500}
              height={500}
            />
          )}
        </figure>
        <div className="px-5 pb-5">
          <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
            {judul}
          </h3>
        </div>
      </Link>
    </section>
  );
};

export default CardBooksKoleksiPenerbitanUser;
