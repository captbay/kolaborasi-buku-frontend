"use client";
import { formatCurrency } from "@/app/lib/utils";
import React, { FormEvent, useState } from "react";
import { Button } from "../../button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { getTrxBabKolaborasiResponse } from "@/app/lib/definitions";
import { uploadBuktiBayarPembelianKolaborasiBuku } from "@/app/lib/actions";
import { CustomFlowbiteTheme, Flowbite, Modal } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import Link from "next/link";

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

export default function FormUploadBuktiBayarKolaborasi({
  data,
}: {
  data: getTrxBabKolaborasiResponse;
}) {
  const { token, token_type } = useGetCookie();
  const [successUpload, setSuccessUpload] = useState<boolean>(false);
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

  return (
    <>
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
                setErrorMessageFile("");
              }}
            />
            {errorMessageFile && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageFile}</p>
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
            {data.date_time_exp != null ? (
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
      {successUpload && (
        <Flowbite theme={{ theme: customTheme }}>
          <Modal show={true}>
            <Modal.Header>Bukti Bayar Berhasil Diunggah</Modal.Header>
            <Modal.Body>
              Bukti bayar anda berhasil diunggah, silahkan tunggu konfirmasi
              admin dan pantau notifikasi atau koleksi buku anda!
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">
                <Link href="/profil/koleksi-buku-kolaborasi-saya">
                  Menuju Koleksi Buku
                </Link>
              </Button>
            </Modal.Footer>
          </Modal>
        </Flowbite>
      )}
    </>
  );
}
