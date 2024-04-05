"use client";

import React from "react";
import { lusitana } from "@/app/ui/fonts";

import { useDebouncedCallback } from "use-debounce";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { kategoriData } from "../lib/definitions";

export default function FilterBox({
  dataKategori,
}: {
  dataKategori: kategoriData[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // handleSort
  const handleSort = (term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("order", term);
    } else {
      params.delete("order");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  // handleKategori
  const handleKategori = (term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("kategori", term);
    } else {
      params.delete("kategori");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // handlePrice
  const handlePriceStart = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    const order = searchParams.get("order")?.toString() || "terbaru";
    params.set("order", order);

    if (term) {
      params.set("hargaMin", term);
    } else {
      params.delete("hargaMin");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handlePriceEnd = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    const order = searchParams.get("order")?.toString() || "terbaru";
    params.set("order", order);

    if (term) {
      params.set("hargaMax", term);
    } else {
      params.delete("hargaMax");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="bg-white border border-gray-200 rounded-lg min-w-fit sticky top-[190px]">
      <div className="flex flex-col m-4">
        <h2
          className={`${lusitana.className}text-2xl font-semibold tracking-tight text-blackColor`}
        >
          Filter
        </h2>
        {/* urutkan berdasarkan */}
        <div className="flex max-w-md flex-col gap-4 mt-8" id="checkbox">
          <h3 className="text-base font-light tracking-tight text-blackColor">
            Urutkan Berdasarkan
          </h3>
          {/* select option */}
          <div className="relative">
            <select
              className="block w-full rounded-md border border-primaryBorder py-[9px] pl-3 pr-10 text-sm outline-2"
              id="sort-by"
              name="sort-by"
              required
              defaultValue={searchParams.get("order")?.toString() || "terbaru"}
              onChange={(e) => {
                handleSort(e.target.value);
              }}
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlaris">Terlaris</option>
              <option value="termurah">Termurah</option>
              <option value="termahal">Termahal</option>
            </select>
          </div>
        </div>
        <div className="flex max-w-md flex-col gap-4 mt-8" id="checkbox">
          <h3 className="text-base font-light tracking-tight text-blackColor">
            Kategori
          </h3>
          {/* select option */}
          <div className="relative">
            <select
              className="block w-full rounded-md border border-primaryBorder py-[9px] pl-3 pr-10 text-sm outline-2"
              id="sort-by"
              name="sort-by"
              required
              defaultValue={searchParams.get("kategori")?.toString() || "semua"}
              onChange={(e) => {
                handleKategori(e.target.value);
              }}
            >
              <option value="semua">Semua</option>
              {dataKategori.map((kategori) => (
                <option value={kategori.slug} key={kategori.id}>
                  {kategori.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex max-w-md flex-col gap-4 mt-8">
          <h3 className="text-base font-light tracking-tight text-blackColor">
            Harga
          </h3>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
              id="start-money"
              type="number"
              name="start-money"
              placeholder="Mulai dari"
              onChange={(e) => {
                handlePriceStart(e.target.value);
              }}
              defaultValue={searchParams.get("hargaMin")?.toString()}
              required
            />
            <h3 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-disableColor peer-focus:text-blackColor">
              Rp
            </h3>
          </div>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
              id="end-money"
              type="number"
              name="end-money"
              placeholder="Sampai dengan"
              onChange={(e) => {
                handlePriceEnd(e.target.value);
              }}
              defaultValue={searchParams.get("hargaMax")?.toString()}
              required
            />
            <h3 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-disableColor peer-focus:text-blackColor">
              Rp
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
