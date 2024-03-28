"use client";

import { Button } from "@/app/ui/button";
import React from "react";
import { toast } from "react-toastify";
import { addKeranjang } from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";

export default function cardBuy({
  harga,
  buku_dijual_id,
}: {
  harga: string;
  buku_dijual_id: string;
}) {
  const { token, token_type } = useGetCookie();

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

  const handleBeliBuku = async () => {
    const loading = toast.loading("Mengarahkan ke pembayaran...");
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
        <Button className="mt-4" onClick={handleAddKeranjang}>
          Tambah ke Keranjang
        </Button>
        <Button className="mt-4" onClick={handleBeliBuku}>
          Beli Sekarang
        </Button>
      </div>
    </section>
  );
}
