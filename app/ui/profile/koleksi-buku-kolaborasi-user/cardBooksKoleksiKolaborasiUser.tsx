import React from "react";
import Image from "next/image";

import clsx from "clsx";
import Link from "next/link";
import TimerKolaborasi from "@/app/ui/profile/timerKolaborasi";

interface CardBooksKoleksiKolaborasiUserProps {
  id: string;
  status: string;
  datetime_deadline: string;
  no_bab: number;
  judul_bab: string;
  judul_buku: string;
  cover_buku: string;
  kategori_buku: string;
}

const CardBooksKoleksiKolaborasiUser: React.FC<
  CardBooksKoleksiKolaborasiUserProps
> = ({
  id,
  status,
  datetime_deadline,
  no_bab,
  judul_bab,
  judul_buku,
  cover_buku,
  kategori_buku,
}) => {
  return (
    <Link href={`/kolaborasi-saya/${id}`}>
      <section className="bg-white p-4 m-4 rounded-lg shadow-md flex flex-col">
        <div className="flex flex-col xl:flex-row gap-2 items-center">
          <div
            className={clsx(
              "p-2 text-whiteColor rounded-full flex items-center",
              {
                "bg-green-600": status === "DONE",
                "bg-yellow-600": status === "PROGRESS",
                "bg-lime-600": status === "EDITING",
                "bg-orange-600": status === "REJECTED",
                "bg-primaryColor": status === "UPLOADED",
                "bg-red-600": status === "FAILED",
              }
            )}
          >
            <p className="text-xs font-semibold tracking-tight text-whiteColor">
              {status}
            </p>
          </div>
          {status == "FAILED" && (
            <div className="p-2 text-whiteColor rounded-full flex items-center bg-yellow-600">
              <p className="text-whiteColor text-xs">
                Silahkan Melakukan Kolaborasi Ulang!
              </p>
            </div>
          )}
          {datetime_deadline && (
            <TimerKolaborasi msTime={Date.parse(datetime_deadline)} />
          )}
        </div>
        <div className="flex flex-col justify-between items-center">
          <figure className="flex justify-center">
            <Image
              className="p-4 w-48 h-48"
              src={"http://kolaborasi-buku-backend.test/storage/" + cover_buku}
              alt="product image"
              width={500}
              height={500}
            />
          </figure>
          <h2 className="text-sm font-light">{kategori_buku}</h2>
          <h3 className="text-lg font-semibold tracking-tight text-blackColor line-clamp-2">
            {judul_buku}
          </h3>
          <p className="text-sm font-medium">Bab {no_bab}</p>
          <p className="text-sm font-medium">Judul Bab: {judul_bab}</p>
        </div>
      </section>
    </Link>
  );
};

export default CardBooksKoleksiKolaborasiUser;
