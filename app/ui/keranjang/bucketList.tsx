"use client";

import { lusitana } from "@/app/ui/fonts";
import React, { useEffect, useState } from "react";
import CardsLanscape from "@/app/ui/cards-lanscape";
import { toast } from "react-toastify";
import { Button } from "@/app/ui/button";
import useGetCookie from "@/app/lib/useGetCookies";
import { Keranjang } from "@/app/lib/definitions";
import { getKeranjang } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";
import { ItemKeranjangSkeleton, KeranjangSkeleton } from "@/app/ui/skeletons";
import { deleteKeranjang } from "@/app/lib/actions";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function bucketList() {
  const { token, token_type, id } = useGetCookie();
  const [data, setData] = useState<Keranjang[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [total, setTotal] = useState(0);
  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + data[index].harga;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  // handel delete
  const handleDeleteCart = async (id: string) => {
    const loading = toast.loading("Silahkan tunggu sebentar...");

    try {
      const res = await deleteKeranjang(id, token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });

        getKeranjang(token, token_type)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              setData(response.data.data);
              setCheckedState(
                response.data.data.length !== 0
                  ? new Array(response.data.data.length).fill(false)
                  : []
              );
            }
          })
          .catch((error) => {
            console.error(error);
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

  // use effect
  useEffect(() => {
    setIsClient(true);

    getKeranjang(token, token_type)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setData(response.data.data);
          setCheckedState(
            response.data.data.length !== 0
              ? new Array(response.data.data.length).fill(false)
              : []
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, token_type]);

  return isClient && token && token_type ? (
    data.length > 0 ? (
      <section className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className={`${lusitana.className} text-lg font-semibold`}>
            Keranjang
          </h2>
          <div className="flex flex-col gap-4">
            {data.length > 0 ? (
              data.map((item, index) => (
                <CardsLanscape
                  key={index}
                  cover={item.cover_buku}
                  judul={item.judul}
                  kategori={item.kategori}
                  harga={item.harga}
                  onDelete={() => {
                    handleDeleteCart(item.keranjang_id);
                  }}
                  id={`custom-checkbox-${index}`}
                  checked={checkedState[index]}
                  onChoose={() => handleOnChange(index)}
                />
              ))
            ) : (
              <ItemKeranjangSkeleton />
            )}
          </div>
        </div>
        <div className="flex-[0.5]">
          <div className="bg-white border border-gray-200 rounded-lg min-w-full sticky top-[182px]">
            <div className="flex flex-col m-6">
              <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                Ringkasan Belanja
              </h2>
              <div className="flex justify-between mt-4">
                <h3 className="text-base font-light tracking-tight text-blackColor">
                  Total Harga
                </h3>
                <h3 className="text-base font-semibold tracking-tight text-blackColor">
                  {formatCurrency(total)}
                </h3>
              </div>
              <Button className="mt-4">Checkout</Button>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section className="flex h-full flex-col items-center justify-center gap-2 py-16">
        <FaceFrownIcon className="w-10 text-gray-400" />
        <h2 className="text-xl font-semibold">Keranjang Kosong</h2>
        <p>Silahkan Menambah Buku Ke Dalam Keranjang</p>
        <Link href="/koleksi-buku">
          <Button>Ayo Tambahkan!</Button>
        </Link>
      </section>
    )
  ) : (
    <KeranjangSkeleton />
  );
}
