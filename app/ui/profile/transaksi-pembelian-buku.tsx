"use client";
import React from "react";
import { Tabs } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import { getTrxPenjualanBukuResponse } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import EmptyData from "@/app/ui/emptyData";
import Link from "next/link";
import clsx from "clsx";
import TimerOnly from "@/app/ui/profile/timerOnly";
import { formatCurrency } from "../../lib/utils";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        underline: "flex-wrap -mb-px border-b border-gray-200",
      },
      tabitem: {
        base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "text-primaryColor rounded-t-lg border-b-2 border-primaryColor active",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "",
  },
};

export default function TransaksiPembelianBuku({
  dataPROGRESS,
  dataUPLOADED,
  dataFAILED,
  dataDONE,
}: {
  dataPROGRESS: getTrxPenjualanBukuResponse[];
  dataUPLOADED: getTrxPenjualanBukuResponse[];
  dataFAILED: getTrxPenjualanBukuResponse[];
  dataDONE: getTrxPenjualanBukuResponse[];
}) {
  const { token, token_type, clearCookie } = useGetCookie();
  const router = useRouter();

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Proses">
          {dataPROGRESS.length < 1 ? (
            <div className="m-8">
              <EmptyData
                title="Data Kosong"
                value="Silahkan menambahkan transaksi"
              />
            </div>
          ) : (
            <ListTrxProgress data={dataPROGRESS} />
          )}
        </Tabs.Item>
        <Tabs.Item active title="Menunggu Verifikasi">
          {dataUPLOADED.length < 1 ? (
            <div className="m-8">
              <EmptyData
                title="Data Kosong"
                value="Silahkan menambahkan transaksi"
              />
            </div>
          ) : (
            <ListTrxProgress data={dataUPLOADED} />
          )}
        </Tabs.Item>
        <Tabs.Item active title="Gagal">
          {dataFAILED.length < 1 ? (
            <div className="m-8">
              <EmptyData
                title="Data Kosong"
                value="Silahkan menambahkan transaksi"
              />
            </div>
          ) : (
            <ListTrxProgress data={dataFAILED} />
          )}
        </Tabs.Item>
        <Tabs.Item active title="Selesai">
          {dataDONE.length < 1 ? (
            <div className="m-8">
              <EmptyData
                title="Data Kosong"
                value="Silahkan menambahkan transaksi"
              />
            </div>
          ) : (
            <ListTrxProgress data={dataDONE} />
          )}
        </Tabs.Item>
      </Tabs>
    </Flowbite>
  );
}

function ListTrxProgress({ data }: { data: getTrxPenjualanBukuResponse[] }) {
  return (
    <section className="space-y-4">
      {data.map((trx, index) => (
        <Link href={"/pembelian-buku?token_trx=" + trx.trx_id} key={index}>
          <div className="bg-white p-4 m-4 rounded-lg shadow-md flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="p-2 bg-primaryColor text-whiteColor rounded-md flex items-center">
                  <p className="text-xs font-semibold tracking-tight text-whiteColor">
                    {trx.no_transaksi}
                  </p>
                </div>
                <div
                  className={clsx(
                    "p-2 text-whiteColor rounded-md flex items-center",
                    {
                      "bg-red-600": trx.status === "FAILED",
                      "bg-green-600": trx.status === "DONE",
                      "bg-yellow-600": trx.status === "PROGRESS",
                      "bg-primaryColor": trx.status === "UPLOADED",
                    }
                  )}
                >
                  <p className="text-xs font-semibold tracking-tight text-whiteColor">
                    {trx.status}
                  </p>
                </div>
                {trx.date_time_lunas && (
                  <div className="p-2 bg-primaryColor text-whiteColor rounded-md flex items-center">
                    <p className="text-xs font-semibold tracking-tight text-whiteColor">
                      Lunas : {trx.date_time_lunas}
                    </p>
                  </div>
                )}
                {trx.date_time_exp && (
                  <TimerOnly msTime={Date.parse(trx.date_time_exp)} />
                )}
              </div>
              <div className="p-2 flex items-center">
                <p className="text-xs font-semibold tracking-tight text-blackColor">
                  {trx.created_at}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div>
                <p className="text-sm font-medium text-bl">
                  Jumlah Pembelian: {trx.jumlah_buku} Buku
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-blackColor">
                  Total Harga: {formatCurrency(trx.total_harga)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
