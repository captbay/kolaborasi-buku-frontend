"use client";

import React from "react";
import { Button } from "@/app/ui/button";
import { formatCurrency } from "@/app/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addTransaksiKolaborasi } from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import Link from "next/link";

export default function cardBabBuku({
  id,
  no_bab,
  judul,
  harga,
  durasi_pembuatan,
  deskripsi,
  is_terjual,
  isDibeli,
  isTransaksi,
}: {
  id: string;
  no_bab: number;
  judul: string;
  harga: number;
  durasi_pembuatan: number;
  deskripsi: string;
  is_terjual: boolean;
  isDibeli: boolean;
  isTransaksi: boolean;
}) {
  const { token, token_type } = useGetCookie();
  const router = useRouter();

  const createQueryString = (name: any, value: any) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleBeliBabBuku = async () => {
    const loading = toast.loading("Mengarahkan ke halaman pembayaran...");

    try {
      const res = await addTransaksiKolaborasi(id, token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });

        router.push(
          `/pembelian-buku-kolaborasi?${createQueryString(
            "token_trx",
            res.data.data
          )}`
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

  return (
    <section className="flex min-w-fit flex-col bg-white border border-gray-200 rounded-lg shadow">
      <div className="p-5">
        <h2 className="text-sm font-light">Bab {no_bab}</h2>
        <h3 className="text-base font-semibold tracking-tight text-blackColor line-clamp-2">
          {judul}
        </h3>
        {/* deskripsi */}
        <p className="mt-2 text-gray-500 text-wrap line-clamp-2">{deskripsi}</p>
        <h3 className="text-base font-semibold tracking-tight text-blackColor">
          {formatCurrency(harga)}
        </h3>
        <p className="text-sm font-medium text-blackColor text-end">
          Deadline {durasi_pembuatan} hari
        </p>
        {isDibeli && isTransaksi ? (
          <button
            className="flex w-full mt-2 h-10 items-center justify-center rounded-lg
           bg-green-500 px-4 text-sm font-medium text-whiteColor"
          >
            <Link href="/profil/koleksi-buku-kolaborasi-saya">
              Sudah Dibeli
            </Link>
          </button>
        ) : isTransaksi ? (
          <Button className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600">
            <Link href="/profil/transaksi-kolaborasi-buku">
              Buku sedang dalam transaksi
            </Link>
          </Button>
        ) : is_terjual ? (
          <button
            className="flex w-full mt-2 h-10 items-center justify-center rounded-lg
             bg-disableColor px-4 text-sm font-medium text-whiteColor cursor-not-allowed"
            disabled
          >
            Terjual
          </button>
        ) : token != null ? (
          <Button className="w-full mt-2" onClick={handleBeliBabBuku}>
            Ajukan Kolaborasi
          </Button>
        ) : (
          <Button className="w-full mt-2">
            <Link href="/login">Ajukan Kolaborasi</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
