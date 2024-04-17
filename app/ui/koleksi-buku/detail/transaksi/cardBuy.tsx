"use client";

import { Button } from "@/app/ui/button";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  addKeranjang,
  addTransaksiBuku,
  addTestimoni,
} from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DownloadBukuUser from "@/app/ui/profile/koleksi-buku-user/downloadBukuUser";
import ModalTestimoni from "@/app/ui/koleksi-buku/detail/transaksi/modalTestimoni";

export default function cardBuy({
  harga,
  buku_dijual_id,
  judul,
  isDibeli,
  isTransaksi,
  isTestimoni,
}: {
  harga: string;
  buku_dijual_id: string;
  judul: string;
  isDibeli: boolean;
  isTransaksi: boolean;
  isTestimoni: boolean;
}) {
  const { token, token_type } = useGetCookie();
  const router = useRouter();
  const [isModalTestimoni, setIsModalTestimoni] = useState<boolean>(false);
  const testimoniRef = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState<number>(0);

  const handleAddKeranjang = async () => {
    const loading = toast.loading("Sedang Menambahkan ke keranjang...");

    try {
      const res = await addKeranjang(buku_dijual_id, token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
        router.refresh();
      }
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.data.message,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  const createQueryString = (name: any, value: any) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleBeliBuku = async () => {
    const loading = toast.loading("Mengarahkan ke halaman pembayaran...");

    try {
      const res = await addTransaksiBuku([buku_dijual_id], token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });

        router.push(
          `/pembelian-buku?${createQueryString("token_trx", res.data.data)}`
        );
      }
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.data.message,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  const handleAddTestimoni = async () => {
    const loading = toast.loading("Silahkan tunggu sebentar...");

    try {
      const res = await addTestimoni(
        buku_dijual_id,
        rating,
        testimoniRef.current?.value as string,
        token,
        token_type
      );

      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
        setIsModalTestimoni(false);
      }
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.data.message,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg min-w-full">
      <div className="flex flex-col m-6">
        {isDibeli && isTransaksi ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
              Sudah <span className=" text-green-500">Dibeli</span>, Terima
              Kasih !
            </h2>
            <DownloadBukuUser buku_dijual_id={buku_dijual_id} judul={judul} />
            {!isTestimoni && (
              <Button
                className="mt-4 bg-yellow-500 hover:bg-yellow-600"
                onClick={() => setIsModalTestimoni(true)}
              >
                Berikan Testimoni
              </Button>
            )}
          </>
        ) : isTransaksi ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
              Harga
            </h2>
            <div className="flex justify-between mt-4">
              <h3 className="text-base font-semibold tracking-tight text-blackColor">
                {harga}
              </h3>
            </div>
            <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600">
              <Link href="/profil/transaksi-pembelian-buku">
                Buku sedang dalam transaksi
              </Link>
            </Button>
          </>
        ) : token != null ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
              Harga
            </h2>
            <div className="flex justify-between mt-4">
              <h3 className="text-base font-semibold tracking-tight text-blackColor">
                {harga}
              </h3>
            </div>
            <Button className="mt-4" onClick={handleAddKeranjang}>
              Tambah ke Keranjang
            </Button>
            <Button className="mt-4" onClick={handleBeliBuku}>
              Beli Sekarang
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
              Harga
            </h2>
            <div className="flex justify-between mt-4">
              <h3 className="text-base font-semibold tracking-tight text-blackColor">
                {harga}
              </h3>
            </div>
            <Button className="mt-4">
              <Link href="/login">Tambah ke Keranjang</Link>
            </Button>
            <Button className="mt-4">
              <Link href="/login">Beli Sekarang</Link>
            </Button>
          </>
        )}
      </div>
      <ModalTestimoni
        openModal={isModalTestimoni}
        onCloseModal={() => setIsModalTestimoni(false)}
        testimoniRef={testimoniRef}
        rating={rating}
        setRating={setRating}
        onClickAddTestimoni={handleAddTestimoni}
      />
    </section>
  );
}
