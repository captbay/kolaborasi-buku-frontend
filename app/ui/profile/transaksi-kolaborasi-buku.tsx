"use client";
import React, { useState } from "react";
import { Tabs } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import useGetCookie from "@/app/lib/useGetCookies";
import { getTrxBabKolaborasiResponse, User } from "@/app/lib/definitions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EmptyData from "@/app/ui/emptyData";
import { formatCurrency, generatePagination } from "@/app/lib/utils";
import clsx from "clsx";
import TimerOnly from "./timerOnly";

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
    tabpanel: "py-4",
  },
};

export default function TransaksiKolaborasiBuku({
  dataPROGRESS,
  dataUPLOADED,
  dataFAILED,
  dataDONE,
}: {
  dataPROGRESS: getTrxBabKolaborasiResponse[];
  dataUPLOADED: getTrxBabKolaborasiResponse[];
  dataFAILED: getTrxBabKolaborasiResponse[];
  dataDONE: getTrxBabKolaborasiResponse[];
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

function ListTrxProgress({ data }: { data: getTrxBabKolaborasiResponse[] }) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const allPages = generatePagination(currentPage, totalPages);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="space-y-4">
      {paginatedData.map((trx, index) => (
        <Link
          href={"/pembelian-buku-kolaborasi?token_trx=" + trx.trx_id}
          key={index}
        >
          <div className="bg-white p-4 m-4 rounded-lg shadow-md flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center">
                  <p className="text-xs font-semibold tracking-tight text-whiteColor">
                    {trx.no_transaksi}
                  </p>
                </div>
                <div
                  className={clsx(
                    "p-2 text-whiteColor rounded-full flex items-center",
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
                  <div className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center">
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
                <h2 className="text-sm font-light">
                  {trx.buku_kolaborasi.kategori}
                </h2>
                <h3 className="text-lg font-semibold tracking-tight text-blackColor">
                  {trx.buku_kolaborasi.judul}
                </h3>
                <p className="text-sm font-medium">Bab {trx.bab_buku.no_bab}</p>
                <p className="text-sm font-medium">
                  Judul Bab: {trx.bab_buku.judul}
                </p>
                <p className="text-sm font-medium">
                  Deadline {trx.bab_buku.durasi_pembuatan} hari
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-blackColor">
                  Total Harga: {formatCurrency(trx.bab_buku.harga)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className="mt-5 flex w-full justify-center">
        {totalPages > 1 && (
          <div className="flex items-center">
            <PaginationArrow
              onClick={handlePrevPage}
              direction="left"
              isDisabled={currentPage === 1}
            />
            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;

              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={page}
                  onClick={() => {
                    if (typeof page === "number") {
                      handlePageChange(page);
                    }
                  }}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
            <PaginationArrow
              onClick={handleNextPage}
              direction="right"
              isDisabled={currentPage === totalPages}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: () => void;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-primaryColor border-primaryColor text-whiteColor": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={onClick} className={className}>
      {page}
    </button>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}: {
  onClick: () => void;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 lg:mr-4": direction === "left",
      "ml-2 lg:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
}
