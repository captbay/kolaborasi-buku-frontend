"use client";

import { BukuPenerbitanUserDetail } from "@/app/lib/definitions";
import React, { useRef } from "react";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import clsx from "clsx";
import { Button } from "@/app/ui/button";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import useGetCookie from "@/app/lib/useGetCookies";
import { getDownloadBukuPermohonanTerbit } from "@/app/lib/actions";
import { ArrowDownTrayIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ManagePenerbitanUser({
  data,
}: {
  data: BukuPenerbitanUserDetail;
}) {
  const { token, token_type } = useGetCookie();

  const handleDownload = async () => {
    const loading = toast.loading("Sedang Download File...");

    try {
      const res = await getDownloadBukuPermohonanTerbit(
        data.id,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        saveAs(blob, `file-buku-permohonan-terbit-${data.judul}.pdf`);

        toast.update(loading, {
          render: "Berhasil Download File",
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
      } else {
        toast.update(loading, {
          render: res.data.message,
          type: "error",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  return (
    <section className="px-14 lg:px-28 py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-16 h-full">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-8 h-full">
            <div className="h-fit">
              {data.cover_buku === null ? (
                <Image
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center lg:h-[480px]"
                  src={"/default_cover.jpg"}
                  alt="hero_image"
                  width={500}
                  height={500}
                />
              ) : (
                <Image
                  className="h-auto w-full max-w-full rounded-lg object-contain object-center lg:h-[480px]"
                  src={
                    "http://kolaborasi-buku-backend.test/storage/" +
                    data.cover_buku
                  }
                  alt="hero_image"
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="w-full flex flex-col gap-4">
              {/* tag */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div
                  className={clsx(
                    "p-2 text-whiteColor rounded-full flex items-center",
                    {
                      "bg-gray-600":
                        data.transaksi_paket_penerbitan.status === "REVIEW",
                      "bg-yellow-600":
                        data.transaksi_paket_penerbitan.status ===
                        "TERIMA DRAFT",
                      "bg-red-600":
                        data.transaksi_paket_penerbitan.status ===
                          "DP TIDAK SAH" ||
                        data.transaksi_paket_penerbitan.status ===
                          "PELUNASAN TIDAK SAH",
                      "bg-indigo-600":
                        data.transaksi_paket_penerbitan.status === "INPUT ISBN",
                      "bg-lime-600":
                        data.transaksi_paket_penerbitan.status ===
                        "DRAFT SELESAI",
                      "bg-green-600":
                        data.transaksi_paket_penerbitan.status ===
                          "DP UPLOADED" ||
                        data.transaksi_paket_penerbitan.status ===
                          "PELUNASAN UPLOADED" ||
                        data.transaksi_paket_penerbitan.status ===
                          "SIAP TERBIT" ||
                        data.transaksi_paket_penerbitan.status ===
                          "SUDAH TERBIT",
                    }
                  )}
                >
                  <p className="text-whiteColor text-xs">
                    {data.transaksi_paket_penerbitan.status}
                  </p>
                </div>
                <div className="px-2 py-4 text-whiteColor rounded-full flex items-center bg-primaryColor">
                  <p className="text-whiteColor text-xs">
                    Mulai Pengajuan: {data.created_at}
                  </p>
                </div>
              </div>
              {/* head */}
              <div>
                <h1 className={`${lusitana.className} text-4xl font-bold`}>
                  {data.judul}
                </h1>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Deskripsi Buku</h2>
                <p className="mt-2 text-gray-500 text-wrap">{data.deskripsi}</p>
              </div>
              {data.isbn != null && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">ISBN</h2>
                  <p className="text-gray-500">{data.isbn}</p>
                </div>
              )}
              {/* note */}
              <div className="flex flex-col gap-2 w-full p-4 bg-yellow-100 items-center rounded-lg">
                {/* jumlah halaman */}
                <h2 className="text-lg font-semibold">Note dari Admin</h2>
                <p className="text-gray-500">
                  {data.transaksi_paket_penerbitan.note == null ||
                  data.transaksi_paket_penerbitan.note == ""
                    ? "Tidak ada catatan"
                    : data.transaksi_paket_penerbitan.note}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {data.transaksi_paket_penerbitan.status === "SUDAH TERBIT"
                      ? "File Buku Anda"
                      : "File Draft Buku Anda"}
                  </h2>
                  {/* download button file mou */}
                  <Button onClick={handleDownload}>
                    Download <ArrowDownTrayIcon className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit flex flex-col items-center">
          <h2 className={`${lusitana.className} text-lg font-semibold`}>
            Tahapan Penerbitan
          </h2>
          <div className="w-full mt-8 flex flex-col lg:flex-row justify-center">
            <section className="flex flex-col">
              {data.array_status.map((item, index) => {
                const isLastItem = index === data.array_status.length - 1;
                return (
                  <ol
                    key={index}
                    className={`relative border-s ${
                      isLastItem ? "border-none" : "border-primaryColor"
                    }`}
                  >
                    <li className="mb-10 ms-6">
                      <span
                        className={clsx(
                          "absolute flex items-center justify-center w-12 h-12 rounded-full -start-6 ring ",
                          {
                            "ring-green-600 bg-green-400":
                              item === data.transaksi_paket_penerbitan.status,
                            "ring-primaryColor bg-blue-400":
                              item !== data.transaksi_paket_penerbitan.status,
                          }
                        )}
                      >
                        {item === data.transaksi_paket_penerbitan.status ? (
                          <CheckIcon className="w-6 h-6 text-green-600" />
                        ) : (
                          <CheckIcon className="w-6 h-6 text-primaryColor" />
                        )}
                      </span>
                      <div className="ml-4">
                        <h3 className="flex items-center mb-1 text-base font-medium text-gray-900 pb-3">
                          {item}
                        </h3>
                        {data.transaksi_paket_penerbitan.status ===
                          "TERIMA DRAFT" &&
                          item === "TERIMA DRAFT" && (
                            <Link
                              href={
                                "/pembelian-paket-penerbitan?token_trx=" +
                                data.transaksi_paket_penerbitan.trx_id
                              }
                              className="w-full"
                            >
                              <Button>Pelunasan</Button>
                            </Link>
                          )}
                        {data.transaksi_paket_penerbitan.status ===
                          "DRAFT SELESAI" &&
                          item === "DRAFT SELESAI" && (
                            <Link
                              href={
                                "/pembelian-paket-penerbitan?token_trx=" +
                                data.transaksi_paket_penerbitan.trx_id
                              }
                              className="w-full"
                            >
                              <Button>Pelunasan</Button>
                            </Link>
                          )}
                      </div>
                    </li>
                  </ol>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
