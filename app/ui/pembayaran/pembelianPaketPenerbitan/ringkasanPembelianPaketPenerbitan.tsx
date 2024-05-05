"use client";
import React, { FormEvent, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { formatCurrency } from "@/app/lib/utils";
import { Button } from "@/app/ui/button";
import { toast } from "react-toastify";
import TimerClockPenerbitan from "@/app/ui/pembayaran/pembelianPaketPenerbitan/timerClockPenerbitan";
import { getTrxPaketResponse, rekeningData } from "@/app/lib/definitions";
import {
  updateStatusTransaksiPenerbitan,
  updateTrxPenerbitanAgain,
  uploadBuktiBayarPenerbitanBuku,
} from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Modal } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
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

export default function RingkasanPembelianPaketPenerbitan({
  data,
  rekening,
}: {
  data: getTrxPaketResponse;
  rekening: rekeningData;
}) {
  const route = useRouter();
  const { token, token_type } = useGetCookie();
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
        const res = await uploadBuktiBayarPenerbitanBuku(
          data.trx_id,
          form,
          token,
          token_type
        );
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render:
              "Bukti bayar berhasil diunggah, silahkan tunggu konfirmasi admin dan pantau notifikasi atau koleksi buku penerbitan anda!",
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
    const loading = toast.loading("Silahkan tunggu sebentar...");

    try {
      const res = await updateStatusTransaksiPenerbitan(
        data.trx_id,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
        route.refresh();
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

  const handleTrxPaketAgain = async () => {
    const loading = toast.loading("Silahkan tunggu sebentar...");

    try {
      const res = await updateTrxPenerbitanAgain(
        data.trx_id,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
        route.refresh();
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
    <section>
      <section className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <h1 className={`${lusitana.className} text-2xl font-semibold`}>
          Detail Transaksi Paket Penerbitan Buku
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
                "bg-gray-600": data.status === "REVIEW",
                "bg-yellow-600": data.status === "TERIMA DRAFT",
                "bg-red-600":
                  data.status === "DP TIDAK SAH" ||
                  data.status === "PELUNASAN TIDAK SAH",
                "bg-indigo-600": data.status === "INPUT ISBN",
                "bg-lime-600": data.status === "DRAFT SELESAI",
                "bg-green-600":
                  data.status === "DP UPLOADED" ||
                  data.status === "PELUNASAN UPLOADED" ||
                  data.status === "SIAP TERBIT" ||
                  data.status === "SUDAH TERBIT",
              }
            )}
          >
            <p className="text-xs font-semibold tracking-tight text-whiteColor">
              {data.status}
            </p>
          </div>
          {data.date_time_dp_lunas && (
            <div className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center">
              <p className="text-xs font-semibold tracking-tight text-whiteColor">
                Uang Muka Lunas : {data.date_time_dp_lunas}
              </p>
            </div>
          )}
          {data.date_time_lunas && (
            <div className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center">
              <p className="text-xs font-semibold tracking-tight text-whiteColor">
                Lunas Total : {data.date_time_lunas}
              </p>
            </div>
          )}
          {data.date_time_exp && (
            <TimerClockPenerbitan
              // msTime={Date.parse(new Date(data.date_time_exp).toISOString())}
              dateExp={data.date_time_exp}
              onComplete={handleCompleteTime}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col lg:flex-row justify-between gap-8">
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {data.status === "TERIMA DRAFT" && (
              <div className="bg-red-600 border border-gray-200 rounded-full min-w-full p-2 flex items-center justify-center">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">
                    Silahkan Melakukan Pembayaran DP
                  </h2>
                </div>
              </div>
            )}
            {data.status === "DRAFT SELESAI" && (
              <div className="bg-red-600 border border-gray-200 rounded-full min-w-full p-2 flex items-center justify-center">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">
                    Silahkan Melakukan Pembayaran Lunas
                  </h2>
                </div>
              </div>
            )}
            {data.status === "DP TIDAK SAH" && (
              <div className="bg-red-600 border border-gray-200 rounded-full min-w-full p-2 flex items-center justify-center">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white">
                    Silahkan Melakukan Pembayaran DP kembali
                  </h2>
                </div>
              </div>
            )}
            {data.status === "PELUNASAN TIDAK SAH" && (
              <div className="bg-red-600 border border-gray-200 rounded-full min-w-full p-2 flex items-center justify-center">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white">
                    Silahkan Melakukan Pembayaran Pelunasan kembali
                  </h2>
                </div>
              </div>
            )}
            {data.status === "PELUNASAN TIDAK SAH" ||
            data.status === "DP TIDAK SAH" ? (
              <Button className="w-full" onClick={handleTrxPaketAgain}>
                Ingin Transaksi Kembali
              </Button>
            ) : null}
            <div className="bg-white border border-gray-200 rounded-lg min-w-full p-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-blackColor">
                  {data.paket_penerbitan.nama}
                </h2>
                <div className="w-fit flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-extrabold tracking-tight">
                    {formatCurrency(data.paket_penerbitan.harga)}
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    / terbitan
                  </span>
                </div>
                <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                  {data.paket_penerbitan.deskripsi}
                </p>
                <ul role="list" className="space-y-5 my-7">
                  {data.paket_penerbitan.jasa_paket_penerbitan.map(
                    (data, index) => (
                      <li className="flex items-center" key={index}>
                        <svg
                          className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                          {data.nama}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {data.jasa_tambahan.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-between bg-white border border-gray-200 rounded-lg min-w-full"
              >
                <div className="flex flex-1 flex-col p-4 gap-2">
                  <h2 className="text-sm font-light">{item.nama}</h2>
                  <p className="text-xl font-bold text-gray-900 ">
                    {formatCurrency(item.harga)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {data.status == "TERIMA DRAFT" || data.status == "DRAFT SELESAI" ? (
          <section className="flex-1 h-fit flex flex-col sticky top-16 space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg min-w-full">
              <div className="flex flex-col m-6">
                <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                  Buku Penerbitan
                </h2>
                <h3 className="my-4 text-base font-light tracking-tight text-blackColor">
                  <span className="font-bold">Judul Buku: </span>
                  {data.buku_permohonan_terbit.judul}
                </h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {data.buku_permohonan_terbit.deskripsi}
                </p>
              </div>
            </div>
            <BankPenerbitan rekening={rekening} />
            <form onSubmit={handleUploadFile} className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-lg min-w-full">
                <div className="flex flex-col m-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                    Upload Bukti Bayar
                    {data.status === "TERIMA DRAFT" && " DP"}
                    {data.status === "DRAFT SELESAI" && " Pelunasan"}
                  </h2>
                  <p className="text-base font-light tracking-tight text-blackColor">
                    Silakan upload bukti bayar
                    {data.status === "TERIMA DRAFT" && " DP"}
                    {data.status === "DRAFT SELESAI" && " Pelunasan"}
                    Anda di sini
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
                    Ringkasan Penerbitan
                  </h2>
                  <div className="flex flex-col lg:flex-row justify-between mt-4">
                    <h3 className="text-base font-light tracking-tight text-blackColor">
                      <span className="font-bold">Paket Penerbitan: </span>
                      {data.paket_penerbitan.nama}
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(data.paket_penerbitan.harga)}
                    </h3>
                  </div>
                  {data.jasa_tambahan.map((data, index) => (
                    <div
                      className="flex flex-col lg:flex-row justify-between mt-4"
                      key={index}
                    >
                      <h3 className="text-base font-light tracking-tight text-blackColor">
                        {data.nama}
                      </h3>
                      <h3 className="text-base font-semibold tracking-tight text-blackColor">
                        {formatCurrency(data.harga)}
                      </h3>
                    </div>
                  ))}
                  <div className="hidden lg:block h-0.5 w-full bg-primaryCard px-20 my-4"></div>
                  <div className="flex flex-col lg:flex-row justify-between">
                    <h3 className="text-base font-light tracking-tight text-blackColor mr-2">
                      DP Harga (pembulat ke atas) :
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(Math.ceil(data.total_harga / 2))}
                    </h3>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between">
                    <h3 className="text-base font-light tracking-tight text-blackColor mr-2">
                      Pelunasan Harga (pembulat ke atas) :
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(Math.ceil(data.total_harga / 2))}
                    </h3>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-end">
                    <h3 className="text-base font-light tracking-tight text-blackColor mr-2">
                      Total Harga :
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(data.total_harga)}
                    </h3>
                  </div>
                  <Button className="mt-4" type="submit">
                    Sudah Upload Bukti Bayar
                    {data.status === "TERIMA DRAFT" && " DP"}
                    {data.status === "DRAFT SELESAI" && " Pelunasan"}
                  </Button>
                </div>
              </div>
            </form>
          </section>
        ) : (
          <section className="flex-1 h-fit flex flex-col sticky top-16 space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg min-w-full">
              <div className="flex flex-col m-6">
                <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                  Buku Penerbitan
                </h2>
                <h3 className="my-4 text-base font-light tracking-tight text-blackColor">
                  <span className="font-bold">Judul Buku: </span>
                  {data.buku_permohonan_terbit.judul}
                </h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {data.buku_permohonan_terbit.deskripsi}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg min-w-full">
              <div className="flex flex-col m-6">
                <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                  Ringkasan Penerbitan
                </h2>
                <div className="flex flex-col lg:flex-row justify-between mt-4">
                  <h3 className="text-base font-light tracking-tight text-blackColor">
                    <span className="font-bold">Paket Penerbitan: </span>
                    {data.paket_penerbitan.nama}
                  </h3>
                  <h3 className="text-base font-semibold tracking-tight text-blackColor">
                    {formatCurrency(data.paket_penerbitan.harga)}
                  </h3>
                </div>
                {data.jasa_tambahan.map((data, index) => (
                  <div
                    className="flex flex-col lg:flex-row justify-between mt-4"
                    key={index}
                  >
                    <h3 className="text-base font-light tracking-tight text-blackColor">
                      {data.nama}
                    </h3>
                    <h3 className="text-base font-semibold tracking-tight text-blackColor">
                      {formatCurrency(data.harga)}
                    </h3>
                  </div>
                ))}
                <div className="hidden lg:block h-0.5 w-full bg-primaryCard px-20 my-4"></div>
                <div className="flex flex-col lg:flex-row justify-end">
                  <h3 className="text-base font-light tracking-tight text-blackColor mr-2">
                    Total Harga :
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
              admin selanjutnya dan pantau notifikasi
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">
                <Link href="/profil/koleksi-buku-penerbitan-saya">
                  Menuju Koleksi Buku Penerbitan
                </Link>
              </Button>
            </Modal.Footer>
          </Modal>
        </Flowbite>
      )}
    </section>
  );
}
