"use client";

import { KoleksiBukuKolaborasiUser } from "@/app/lib/definitions";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import clsx from "clsx";
import TimerKolaborasi from "@/app/ui/profile/timerKolaborasi";
import TimelinePenulisan from "@/app/ui/kolaborasi/timelinePenulisan";
import { Button } from "@/app/ui/button";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import useGetCookie from "@/app/lib/useGetCookies";
import {
  getDownloadMou,
  updateTimeExpKolaborasiUser,
  uploadBabKolaborasi,
  uploadMouKolaborasi,
} from "@/app/lib/actions";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ManageKolaborasiUser({
  data,
}: {
  data: KoleksiBukuKolaborasiUser;
}) {
  const route = useRouter();
  const { token, token_type } = useGetCookie();

  const fileMouInputRef = useRef<HTMLInputElement>(null);
  const fileBabInputRef = useRef<HTMLInputElement>(null);

  const handleFileBabChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // if file size is more than 20MB
      if (file.size > 20000000) {
        toast.error("Ukuran file terlalu besar, maksimal 20MB");
      } else {
        // hit the upload function
        handleBabUpload(file);
      }
    }
  };

  const handleBabUpload = async (file: File) => {
    if (file) {
      const loading = toast.loading("Silahkan tunggu sebentar...");
      const file_bab = new FormData();
      file_bab.append("file_bab", file);
      // Fetch API
      try {
        const res = await uploadBabKolaborasi(
          data.id,
          file_bab,
          token,
          token_type
        );
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render: "File BAB berhasil diupload",
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
    } else {
      // Handle case where no file is selected
      toast.error("Pilih file terlebih dahulu");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // if file size is more than 2MB
      if (file.size > 2000000) {
        toast.error("Ukuran file terlalu besar, maksimal 2MB");
      } else {
        // hit the upload function
        handleUpload(file);
      }
    }
  };

  const handleUpload = async (file: File) => {
    if (file) {
      const loading = toast.loading("Silahkan tunggu sebentar...");
      const file_mou = new FormData();
      file_mou.append("file_mou", file);
      // Fetch API
      try {
        const res = await uploadMouKolaborasi(
          data.id,
          file_mou,
          token,
          token_type
        );
        if (res.status === 200 || res.status === 201) {
          toast.update(loading, {
            render: "File MOU berhasil diupload",
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
    } else {
      // Handle case where no file is selected
      toast.error("Pilih file terlebih dahulu");
    }
  };

  const handleDownload = async () => {
    const loading = toast.loading("Sedang Download File MOU...");

    try {
      const res = await getDownloadMou("kolaborasi", token, token_type);
      if (res.status === 200 || res.status === 201) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        saveAs(blob, `filemou_${data.judul_buku}.pdf`);

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

  const handleCompleteTime = async () => {
    try {
      const res = await updateTimeExpKolaborasiUser(data.id, token, token_type);
      if (res.status === 200 || res.status === 201) {
        toast.error(res.data.message);
        route.refresh();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="px-14 lg:px-28 py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-16 h-full">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col lg:flex-row justify-between gap-8 h-full">
            <div className="flex flex-col lg:sticky lg:top-[182px] h-fit">
              <Image
                className="h-auto w-full max-w-full rounded-lg object-cover object-center lg:h-[480px]"
                src={
                  "http://kolaborasi-buku-backend.test/storage/" +
                  data.cover_buku
                }
                alt="hero_image"
                width={500}
                height={500}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              {/* tag */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div
                  className={clsx(
                    "px-2 py-4 text-whiteColor rounded-full flex items-center",
                    {
                      "bg-green-600": data.status === "DONE",
                      "bg-yellow-600": data.status === "PROGRESS",
                      "bg-lime-600": data.status === "EDITING",
                      "bg-orange-600": data.status === "REJECTED",
                      "bg-primaryColor": data.status === "UPLOADED",
                      "bg-red-600": data.status === "FAILED",
                    }
                  )}
                >
                  <p className="text-whiteColor text-xs">{data.status}</p>
                </div>
                <div className="px-2 py-4 text-whiteColor rounded-full flex items-center bg-primaryColor">
                  <p className="text-whiteColor text-xs">
                    Mulai Berkolaborasi: {data.created_at}
                  </p>
                </div>
                {data.status == "FAILED" && (
                  <div className="px-2 py-4 text-whiteColor rounded-full flex items-center bg-yellow-600">
                    <p className="text-whiteColor text-xs">
                      Silahkan Melakukan Kolaborasi Ulang!
                    </p>
                  </div>
                )}
                {data.datetime_deadline && (
                  <TimerKolaborasi
                    msTime={Date.parse(data.datetime_deadline)}
                    onComplete={handleCompleteTime}
                  />
                )}
              </div>
              {/* head */}
              <div>
                <p className="text-gray-500">{data.kategori_buku}</p>
                <h1 className={`${lusitana.className} text-4xl font-bold`}>
                  {data.judul_buku}
                </h1>
                <p className={`${lusitana.className} text-xl font-bold`}>
                  {data.judul_bab} - {data.no_bab}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Deskripsi Buku</h2>
                <p className="mt-4 text-gray-500 text-wrap">
                  {data.deskripsi_buku}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Deskripsi Bab</h2>
                <p className="mt-4 text-gray-500 text-wrap">
                  {data.deskripsi_bab}
                </p>
              </div>
              {/* note */}
              {/* file mou */}
              {data.status != "FAILED" && (
                <>
                  <div className="flex flex-col gap-2 w-full p-4 bg-yellow-100 items-center rounded-lg">
                    {/* jumlah halaman */}
                    <h2 className="text-lg font-semibold">Note dari Admin</h2>
                    <p className="text-gray-500">
                      {data.note == null || data.note == ""
                        ? "Tidak ada catatan"
                        : data.note}
                    </p>
                  </div>
                  {data.file_mou == null && (
                    <div>
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">File MOU</h2>
                        {/* download button file mou */}
                        <Button onClick={handleDownload}>
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </Button>
                      </div>
                      <p className="mt-4 text-gray-500 text-wrap">
                        File MOU diperlukan untuk kebutuhan administrasi
                        pembuatan ISBN, silahkan download file MOU dengan
                        menekan logo download lalu isikan data yang diperlukan
                        dan tanda tangan Anda. Setelah itu tolong upload kembali
                        :)
                      </p>
                      {/* upload file mou */}
                      <Button
                        className="mt-4 w-full"
                        onClick={() => fileMouInputRef.current?.click()}
                      >
                        Upload
                      </Button>

                      {/* File input */}
                      <input
                        name="file_mou"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        max={2048}
                        ref={fileMouInputRef}
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">
                      File Bab - {data.judul_bab} - {data.no_bab}
                    </h2>
                    <p className="mt-4 text-gray-500 text-wrap">
                      Silahkan upload file bab Anda di bawah ini, walaupun draft
                      kami akan tetap melayani Anda untuk menyempurnakan buku
                      ini. Jika Anda memerlukan bantuan jangan sungkan untuk
                      mengubungi kami atau kami akan mengubungin Anda melalui
                      note.
                    </p>
                    {/* upload file mou */}
                    {data.file_mou == null ? (
                      <button
                        className="flex w-full mt-4 h-10 items-center justify-center rounded-lg
         bg-red-500 px-4 text-sm font-medium text-whiteColor"
                      >
                        Silahkan Upload Mou Terlebih Dahulu
                      </button>
                    ) : data.status == "UPLOADED" ? (
                      <button
                        className="flex w-full mt-4 h-10 items-center justify-center rounded-lg
           bg-yellow-500 px-4 text-sm font-medium text-whiteColor"
                      >
                        Sudah Upload, silahkan tunggu update dari admin
                      </button>
                    ) : data.status == "EDITING" ? (
                      <button
                        className="flex w-full mt-4 h-10 items-center justify-center rounded-lg
           bg-lime-500 px-4 text-sm font-medium text-whiteColor"
                      >
                        Kolaborasi sudah di tahap editing oleh editor
                      </button>
                    ) : data.status == "DONE" ? (
                      <button
                        className="flex w-full mt-4 h-10 items-center justify-center rounded-lg
           bg-green-500 px-4 text-sm font-medium text-whiteColor"
                      >
                        Kolaborasi selesai, silahkan tunggu kolaborator lainnya
                        menyelesaikan kolaborasi :)
                      </button>
                    ) : (
                      <div>
                        <Button
                          className="mt-4 w-full"
                          onClick={() => fileBabInputRef.current?.click()}
                        >
                          Upload
                        </Button>

                        <input
                          name="file_bab"
                          type="file"
                          accept=".pdf , .doc , .docx"
                          onChange={handleFileBabChange}
                          style={{ display: "none" }}
                          max={2048}
                          ref={fileBabInputRef}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {data.status != "FAILED" && (
          <div className="h-fit flex flex-col items-center sticky top-[182px]">
            <h2 className={`${lusitana.className} text-lg font-semibold`}>
              Timeline
            </h2>
            <div className="w-full mt-8 flex flex-col lg:flex-row justify-center">
              <TimelinePenulisan data={data.timeline_kolaborasi} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
