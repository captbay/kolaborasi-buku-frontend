import React from "react";
import { lusitana } from "@/app/ui/fonts";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";
import {
  getTrxBabKolaborasiResponse,
  rekeningData,
} from "@/app/lib/definitions";
import clsx from "clsx";
import BankPenerbitan from "@/app/ui/bankPenerbitan";
import FormUploadBuktiBayarKolaborasi from "./formUploadBuktiBayarKolaborasi";
import CountdownHandleKolaborasi from "./countdownHandleKolaborasi";

export default function ringkasanPembelianBabKolaborasi({
  data,
  rekening,
}: {
  data: getTrxBabKolaborasiResponse;
  rekening: rekeningData;
}) {
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
          {data.date_time_exp && <CountdownHandleKolaborasi data={data} />}
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
            <FormUploadBuktiBayarKolaborasi data={data} />
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
    </section>
  );
}
