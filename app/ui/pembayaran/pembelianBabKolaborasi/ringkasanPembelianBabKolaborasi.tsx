"use client";
import React, { FormEvent, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { formatCurrency } from "@/app/lib/utils";
import { Button } from "@/app/ui/button";
import { toast } from "react-toastify";
import Image from "next/image";
import TimerClock from "@/app/ui/pembayaran/timerClock";
import {
  getTrxBabKolaborasiResponse,
  rekeningData,
} from "@/app/lib/definitions";
import {
  updateStatusTransaksiKolaborasiBuku,
  uploadBuktiBayarPembelianKolaborasiBuku,
} from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Modal } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import Link from "next/link";
import clsx from "clsx";
import BankPenerbitan from "@/app/ui/bankPenerbitan";

const customTheme: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: "relative h-fit w-fit p-4 md:h-auto",
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      popup: "border-b-0 p-2",
      title: "text-xl font-medium text-gray-900 dark:text-white",
      close: {
        base: "hidden ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
  },
};

export default function ringkasanPembelianBabKolaborasi({
  data,
  rekening,
}: {
  data: getTrxBabKolaborasiResponse;
  rekening: rekeningData;
}) {
  const { token, token_type } = useGetCookie();
  const [timeExp, setTimeExp] = useState(false);
  const [successUpload, setSuccessUpload] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [errorMessageFile, setErrorMessageFile] = useState<string>("");

  const handleUploadFile = async (e: FormEvent<HTMLFormElement>) => {
    // ganti error message
    setErrorMessageFile("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();

    if (file) {
      const form = new FormData();
      form.append("foto_bukti_bayar", file);

      try {
        const res = await uploadBuktiBayarPembelianKolaborasiBuku(
          data.trx_id,
          form,
          token,
          token_type
        );
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render:
              "Bukti bayar berhasil diunggah, silahkan tunggu konfirmasi admin dan pantau notifikasi atau koleksi buku kolaborasi anda!",
            type: "success",
            autoClose: 5000,
            isLoading: false,
          });
          // seletah berhasil
          setSuccessUpload(true);
        }
      } catch (error: any) {
        toast.update(loading, {
          render: "Terjadi Kesalahan!",
          type: "error",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });

        if (error?.response?.data?.message.foto_bukti_bayar !== undefined) {
          setErrorMessageFile(
            error?.response?.data?.message.foto_bukti_bayar[0] ||
              "An error occurred."
          );
        }
      }
    } else {
      toast.update(loading, {
        render: "Bukti bayar harus diisi",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  const handleCompleteTime = async () => {
    setTimeExp(true);
    try {
      const res = await updateStatusTransaksiKolaborasiBuku(
        data.trx_id,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section>
      <section className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <h1 className={`${lusitana.className} text-2xl font-semibold`}>
          Detail Transaksi Kolaborasi
        </h1>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center">
            <p className="text-xs font-semibold tracking-tight text-whiteColor">
              {data.no_transaksi}
            </p>
          </div>
          <div
            className={clsx(
              "p-2 text-whiteColor rounded-full flex items-center",
              {
                "bg-red-600": data.status === "FAILED",
                "bg-green-600": data.status === "DONE",
                "bg-yellow-600": data.status === "PROGRESS",
                "bg-primaryColor": data.status === "UPLOADED",
              }
            )}
          >
            <p className="text-xs font-semibold tracking-tight text-whiteColor">
              {data.status}
            </p>
          </div>
          {data.date_time_lunas && (
            <div className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center">
              <p className="text-xs font-semibold tracking-tight text-whiteColor">
                Lunas : {data.date_time_lunas}
              </p>
            </div>
          )}
          {data.date_time_exp && (
            <TimerClock
              msTime={Date.parse(data.date_time_exp) - 25200000}
              onComplete={handleCompleteTime}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col lg:flex-row justify-between gap-8">
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between bg-white border border-gray-200 rounded-lg min-w-full">
              <Image
                className="p-2 w-full lg:w-32 h-full"
                src={
                  process.env.NEXT_PUBLIC_STORAGE_FILE +
                  data.buku_kolaborasi.cover_buku
                }
                alt="Gambar Buku"
                width={500}
                height={500}
                priority
              />
              <div className="flex flex-1 flex-col p-4 gap-2">
                <h2 className="text-sm font-light">
                  {data.buku_kolaborasi.kategori}
                </h2>
                <h3 className="text-lg font-semibold tracking-tight text-blackColor">
                  {data.buku_kolaborasi.judul}
                </h3>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-sm font-light">
                      Bab {data.bab_buku.no_bab}
                    </p>
                    <p className="text-sm font-light">
                      Judul Bab: {data.bab_buku.judul}
                    </p>
                    <p className="text-sm font-light">
                      Deadline {data.bab_buku.durasi_pembuatan} hari
                    </p>
                  </div>
                  <p className="text-xl font-bold text-gray-900 ">
                    {formatCurrency(data.bab_buku.harga)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {data.status == "PROGRESS" ? (
          <section className="flex-1 h-fit flex flex-col sticky top-16 space-y-3">
            <BankPenerbitan rekening={rekening} />
            <form onSubmit={handleUploadFile} className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-lg min-w-full">
                <div className="flex flex-col m-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                    Upload Bukti Bayar
                  </h2>
                  <p className="text-base font-light tracking-tight text-blackColor">
                    Silakan upload bukti bayar Anda di sini
                  </p>
                  <input
                    className="mt-4"
                    id="file"
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    name="file"
                    placeholder="Masukan bukti bayar anda"
                    onChange={(e) => {
                      setFile(e.target.files?.[0]);
                    }}
                  />
                  {errorMessageFile && (
                    <div
                      className="flex h-8 items-center space-x-1 mt-2"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                      <p className="text-sm text-dangerColor">
                        {errorMessageFile}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg min-w-full">
                <div className="flex flex-col m-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                    Ringkasan Pembelian
                  </h2>
                  <div className="flex flex-col lg:flex-row justify-between mt-4">
                    <h3 className="text-base font-light tracking-tight text-blackColor">
                      Transaksi Dibuat
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {data.created_at}
                    </h3>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between mt-4">
                    <h3 className="text-base font-light tracking-tight text-blackColor">
                      Total Harga
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(data.total_harga)}
                    </h3>
                  </div>
                  {timeExp == false ? (
                    <Button className="mt-4" type="submit">
                      Sudah Upload Bukti Bayar
                    </Button>
                  ) : (
                    <button
                      className="flex w-full mt-4 h-10 items-center justify-center rounded-lg
             bg-disableColor px-4 text-sm font-medium text-whiteColor cursor-not-allowed"
                      disabled
                    >
                      Gagal
                    </button>
                  )}
                </div>
              </div>
            </form>
          </section>
        ) : (
          <section className="flex-1 h-fit flex flex-col sticky top-16 space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg min-w-full">
              <div className="flex flex-col m-6">
                <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                  Ringkasan Pembelian
                </h2>
                <div className="flex flex-col lg:flex-row justify-between mt-4">
                  <h3 className="text-base font-light tracking-tight text-blackColor">
                    Transaksi Dibuat
                  </h3>
                  <h3 className="text-base font-semibold tracking-tight text-blackColor">
                    {data.created_at}
                  </h3>
                </div>
                <div className="flex flex-col lg:flex-row justify-between mt-4">
                  <h3 className="text-base font-light tracking-tight text-blackColor">
                    Total Harga
                  </h3>
                  <h3 className="text-base font-semibold tracking-tight text-blackColor">
                    {formatCurrency(data.total_harga)}
                  </h3>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
      {successUpload && (
        <Flowbite theme={{ theme: customTheme }}>
          <Modal show={true}>
            <Modal.Header>Bukti Bayar Berhasil Diunggah</Modal.Header>
            <Modal.Body>
              Bukti bayar anda berhasil diunggah, silahkan tunggu konfirmasi
              admin dan pantau notifikasi atau koleksi buku kolaborasi anda!
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">
                <Link href="/profil/koleksi-buku-kolaborasi-saya">
                  Menuju Koleksi Buku Kolaborasi
                </Link>
              </Button>
            </Modal.Footer>
          </Modal>
        </Flowbite>
      )}
    </section>
  );
}
