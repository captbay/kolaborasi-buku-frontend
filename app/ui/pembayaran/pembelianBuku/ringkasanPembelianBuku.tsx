import React from "react";
import { lusitana } from "@/app/ui/fonts";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";
import {
  getTrxPenjualanBukuResponse,
  rekeningData,
} from "@/app/lib/definitions";
import clsx from "clsx";
import BankPenerbitan from "@/app/ui/bankPenerbitan";
import CountdownHandle from "./countdownHandleBuku";
import FormUploadBuktiBayarBuku from "./formUploadBuktiBayarBuku";

export default function ringkasanPembelianBuku({
  data,
  rekening,
}: {
  data: getTrxPenjualanBukuResponse;
  rekening: rekeningData;
}) {
  return (
    <section>
      <section className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <h1 className={`${lusitana.className} text-2xl font-semibold`}>
          Detail Transaksi Pembelian Buku
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
          {data.date_time_exp && <CountdownHandle data={data} />}
        </div>
      </section>
      <section className="flex flex-col lg:flex-row justify-between gap-8">
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {data.list_transaksi_buku.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-between bg-white border border-gray-200 rounded-lg min-w-full"
              >
                <Image
                  className="p-2 w-full lg:w-32 h-full"
                  src={process.env.NEXT_PUBLIC_STORAGE_FILE + item.cover_buku}
                  alt="Gambar Buku"
                  width={500}
                  height={500}
                  priority
                />
                <div className="flex flex-1 flex-col p-4 gap-2">
                  <h2 className="text-sm font-light">{item.kategori}</h2>
                  <h3 className="text-lg font-semibold tracking-tight text-blackColor">
                    {item.judul}
                  </h3>
                  <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-sm font-light">ISBN : {item.isbn}</p>
                      <p className="text-sm font-light">
                        {item.jumlah_halaman} halaman - {item.bahasa}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900 ">
                      {formatCurrency(item.harga)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {data.status == "PROGRESS" ? (
          <section className="flex-1 h-fit flex flex-col sticky top-16 space-y-3">
            <BankPenerbitan rekening={rekening} />
            <FormUploadBuktiBayarBuku data={data} />
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
                    Jumlah Buku
                  </h3>
                  <h3 className="text-base font-semibold tracking-tight text-blackColor">
                    {data.jumlah_buku}
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
