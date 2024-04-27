"use client";
import React, { FormEvent, RefObject, useRef, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import useGetCookie from "@/app/lib/useGetCookies";
import { JasaTambahan, PaketPenerbitan } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import {
  ArrowDownTrayIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { getDownloadMou, uploadBukuReview } from "@/app/lib/actions";
import Link from "next/link";
import { saveAs } from "file-saver";

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

export default function RingkasanBeforeBuyPaketPenerbitan({
  dataPaket,
  dataJasaTambahan,
}: {
  dataPaket: PaketPenerbitan;
  dataJasaTambahan: JasaTambahan[];
}) {
  const judulRef = useRef<HTMLInputElement>(null);
  const [errorMessageJudul, setErrorMessageJudul] = useState<string>("");
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);
  const [errorMessageDeskripsi, setErrorMessageDeskripsi] =
    useState<string>("");
  const [fileMou, setFileMou] = useState<File | undefined>();
  const [errorMessageFileMou, setErrorMessageFileMou] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [errorMessageFile, setErrorMessageFile] = useState<string>("");

  const [openModal, setOpenModal] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const [total, setTotal] = useState(dataPaket.harga);
  const [checkedState, setCheckedState] = useState<boolean[]>([
    ...new Array(dataJasaTambahan.length).fill(false),
  ]);
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { token, token_type } = useGetCookie();
  const [timeExp, setTimeExp] = useState(false);
  const [successUpload, setSuccessUpload] = useState(false);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    // set selected buku id
    const selected = dataJasaTambahan.filter((item, index) => {
      return updatedCheckedState[index];
    });

    setSelectedId(selected.map((item) => item.id));

    const totalPrice =
      dataPaket.harga +
      updatedCheckedState.reduce((sum, currentState, index) => {
        if (currentState === true) {
          return sum + dataJasaTambahan[index].harga;
        }
        return sum;
      }, 0);

    setTotal(totalPrice);
  };

  const handleUploadFile = async (e: FormEvent<HTMLFormElement>) => {
    // ganti error message
    setErrorMessageJudul("");
    setErrorMessageDeskripsi("");
    setErrorMessageFileMou("");
    setErrorMessageFile("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();

    if (file && fileMou) {
      const form = new FormData();
      form.append("paket_id", dataPaket.id);
      form.append("jasa_tambahan_id", JSON.stringify(selectedId));
      form.append("judul_buku", judulRef.current?.value as string);
      form.append("deskripsi_buku", deskripsiRef.current?.value as string);
      form.append("file_buku", file);
      form.append("file_mou", fileMou);

      try {
        const res = await uploadBukuReview(form, token, token_type);
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render:
              "Berhasil beli dan sedang kami review, silahkan tunggu konfirmasi admin!",
            type: "success",
            autoClose: 5000,
            isLoading: false,
          });
          // seletah berhasil
          setOpenModal(false);
          setSuccessUpload(true);
        }
      } catch (error: any) {
        toast.update(loading, {
          render: "Terjadi Kesalahan, silahkan coba lagi!",
          type: "error",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
        if (error?.response?.data?.message.file_buku !== undefined) {
          setErrorMessageFile(
            error?.response?.data?.message.file_buku[0] || "An error occurred."
          );
        }
        if (error?.response?.data?.message.file_mou !== undefined) {
          setErrorMessageFileMou(
            error?.response?.data?.message.file_mou[0] || "An error occurred."
          );
        }
        if (error?.response?.data?.message.judul_buku !== undefined) {
          setErrorMessageJudul(
            error?.response?.data?.message.judul_buku[0] || "An error occurred."
          );
        }
        if (error?.response?.data?.message.deskripsi_buku !== undefined) {
          setErrorMessageDeskripsi(
            error?.response?.data?.message.deskripsi_buku[0] ||
              "An error occurred."
          );
        }
      }
    } else {
      toast.update(loading, {
        render: "Silahkan upload file draft buku dan file MOU terlebih dahulu!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  const handleDownload = async () => {
    const loading = toast.loading("Sedang Download File MOU...");

    try {
      const res = await getDownloadMou("paket penerbitan", token, token_type);
      if (res.status === 200 || res.status === 201) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        saveAs(blob, `filemou_penerbitan.pdf`);

        toast.update(loading, {
          render: "Berhasil Download File MOU",
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
    <section>
      <section className="mb-8">
        <h1
          className={`${lusitana.className} text-2xl font-semibold text-center`}
        >
          Paket Penerbitan
        </h1>
      </section>
      <section className="flex flex-col lg:flex-row justify-between gap-8">
        <section className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
            Jasa Tambahan Kami
          </h2>
          <div className="flex flex-col gap-4">
            {dataJasaTambahan
              .slice(0, showAll ? dataJasaTambahan.length : 5)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row justify-between bg-white border border-gray-200 rounded-lg min-w-full"
                >
                  <div className="flex items-center p-4">
                    <input
                      id={item.id}
                      type="checkbox"
                      value={item.harga}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 gap-2">
                    <h2 className="text-sm font-light">{item.nama}</h2>
                    <p className="text-xl font-bold text-gray-900 ">
                      {formatCurrency(item.harga)}
                    </p>
                  </div>
                </div>
              ))}
            {!showAll && dataJasaTambahan.length > 5 && (
              <Button className="mt-4" onClick={() => setShowAll(true)}>
                Lihat Lebih Banyak
              </Button>
            )}
            {showAll && dataJasaTambahan.length > 5 && (
              <Button className="mt-4" onClick={() => setShowAll(false)}>
                Lihat Lebih Sedikit
              </Button>
            )}
          </div>
        </section>
        <section className="flex-1 h-fit flex flex-col sticky top-16 space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg min-w-full p-6">
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-blackColor">
                {dataPaket.nama}
              </h2>
              <div className="w-fit flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-extrabold tracking-tight">
                  {formatCurrency(dataPaket.harga)}
                </span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  / terbitan
                </span>
              </div>
              <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                {dataPaket.deskripsi}
              </p>
              <ul role="list" className="space-y-5 my-7">
                {dataPaket.jasa_paket_penerbitan.map((data, index) => (
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
                ))}
              </ul>
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
                  {dataPaket.nama}
                </h3>
                <h3 className="text-base font-semibold tracking-tight text-blackColor">
                  {formatCurrency(dataPaket.harga)}
                </h3>
              </div>
              {dataJasaTambahan
                .filter((data) => selectedId.includes(data.id))
                .map((data, index) => (
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
                  {formatCurrency(total)}
                </h3>
              </div>
              <Button className="mt-4" onClick={() => setOpenModal(true)}>
                Beli
              </Button>
            </div>
          </div>
        </section>
      </section>
      <ModalUpload
        show={openModal}
        setShow={() => setOpenModal(false)}
        handleUploadFile={handleUploadFile}
        handleDownload={handleDownload}
        setFile={setFile}
        setFileMou={setFileMou}
        errorMessageFile={errorMessageFile}
        errorMessageFileMou={errorMessageFileMou}
        judulRef={judulRef}
        errorMessageJudul={errorMessageJudul}
        deskripsiRef={deskripsiRef}
        errorMessageDeskripsi={errorMessageDeskripsi}
      />
      {successUpload && (
        <Flowbite theme={{ theme: customTheme }}>
          <Modal show={true}>
            <Modal.Header>Berhasil Melakukan Pengajuan Penerbitan</Modal.Header>
            <Modal.Body>
              Silahkan menunggu kami untuk review draft buku Anda, setelah tahap
              review kami akan memberikan notifikasi kepada anda dan silahkan
              untuk melanjutkan tahapan berikutnya
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">
                <Link href="/profil/koleksi-buku-penerbitan-saya">
                  Menuju Transaksi Paket Penerbitan
                </Link>
              </Button>
            </Modal.Footer>
          </Modal>
        </Flowbite>
      )}
    </section>
  );
}

function ModalUpload({
  show,
  setShow,
  handleUploadFile,
  handleDownload,
  setFile,
  setFileMou,
  errorMessageFile,
  errorMessageFileMou,
  judulRef,
  errorMessageJudul,
  deskripsiRef,
  errorMessageDeskripsi,
}: {
  show: boolean;
  setShow: () => void;
  handleUploadFile: (e: FormEvent<HTMLFormElement>) => void;
  handleDownload: () => void;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setFileMou: React.Dispatch<React.SetStateAction<File | undefined>>;
  errorMessageFile: string;
  errorMessageFileMou: string;
  judulRef: RefObject<HTMLInputElement>;
  errorMessageJudul: string;
  deskripsiRef: RefObject<HTMLTextAreaElement>;
  errorMessageDeskripsi: string;
}) {
  return (
    <Modal show={show} onClose={setShow} popup>
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={handleUploadFile} className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-blackColor text-center">
            Upload Data-Data Buku Yang Ingin Diterbitkan
          </h1>
          <div>
            <label
              htmlFor="judul"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Judul Buku
            </label>
            <input
              type="text"
              id="judul"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Judul buku anda"
              ref={judulRef}
              required
            />
            {errorMessageJudul && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessageJudul}</p>
              </div>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="deskripsi"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Deskripsi Buku
            </label>
            <textarea
              id="deskripsi"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Berikan Deskripsi..."
              ref={deskripsiRef}
              required
            ></textarea>
            {errorMessageDeskripsi && (
              <div
                className="flex h-8 items-center space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessageDeskripsi}
                </p>
              </div>
            )}
          </div>
          <div className="bg-white border border-primaryColor rounded-lg min-w-full">
            <div className="flex flex-col m-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                  Upload MOU
                </h2>
                {/* download button file mou */}
                <Button onClick={handleDownload}>
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </Button>
              </div>
              <p className="mt-4 text-base font-light tracking-tight text-blackColor">
                Silahkan download terlebih dahulu, lalu isikan data yang
                diperlukan dan upload kembali
              </p>
              <input
                className="mt-4"
                id="file"
                type="file"
                accept=".pdf"
                name="file"
                placeholder="Masukan File Mou Anda"
                max={2048}
                onChange={(e) => {
                  setFileMou(e.target.files?.[0]);
                }}
              />
              {errorMessageFileMou && (
                <div
                  className="flex h-8 items-center space-x-1 mt-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">
                    {errorMessageFileMou}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white border border-primaryColor rounded-lg min-w-full">
            <div className="flex flex-col m-6">
              <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
                Upload Draft Buku
              </h2>
              <p className="text-base font-light tracking-tight text-blackColor">
                Silakan upload draft buku yang ingin akan terbitkan, kami akan
                melakukan review terlebih dahulu
              </p>
              <input
                className="mt-4"
                id="file"
                type="file"
                accept=".pdf"
                name="file"
                placeholder="Masukan File Draft Anda"
                max={2048}
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
                  <p className="text-sm text-dangerColor">{errorMessageFile}</p>
                </div>
              )}
            </div>
          </div>
          <Button className="mt-4 w-full" type="submit">
            Prosess
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
