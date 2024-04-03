"use client";

import { Button } from "@/app/ui/button";
import React from "react";
import { toast } from "react-toastify";
import { addKeranjang, addTransaksiBuku } from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function cardBuy({
  harga,
  buku_dijual_id,
  isDibeli,
  isTransaksi,
}: {
  harga: string;
  buku_dijual_id: string;
  isDibeli: boolean;
  isTransaksi: boolean;
}) {
  const { token, token_type } = useGetCookie();
  const router = useRouter();

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

  return (
    <section className="bg-white border border-gray-200 rounded-lg min-w-full">
      <div className="flex flex-col m-6">
        <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
          Harga
        </h2>
        <div className="flex justify-between mt-4">
          <h3 className="text-base font-semibold tracking-tight text-blackColor">
            {harga}
          </h3>
        </div>
        {isDibeli && isTransaksi ? (
          <Button className="mt-4 bg-yellow-500">
            <Link href="/profil/koleksi-buku-saya">Buku sudah dibeli</Link>
          </Button>
        ) : isTransaksi ? (
          <Button className="mt-4 bg-yellow-500">
            <Link href="/profil/transaksi-pembelian-buku">
              Buku sedang dalam transaksi
            </Link>
          </Button>
        ) : token != null ? (
          <>
            <Button className="mt-4" onClick={handleAddKeranjang}>
              Tambah ke Keranjang
            </Button>
            <Button className="mt-4" onClick={handleBeliBuku}>
              Beli Sekarang
            </Button>
          </>
        ) : (
          <>
            <Button className="mt-4">
              <Link href="/login">Tambah ke Keranjang</Link>
            </Button>
            <Button className="mt-4">
              <Link href="/login">Beli Sekarang</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
