import React from "react";
import { Checkbox, Label } from "flowbite-react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";

export default async function FilterBox() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg min-w-fit sticky top-[182px] ">
      <div className="flex flex-col m-4">
        <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
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
              // required
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
          <div className="flex items-center gap-2">
            <Checkbox id="accept" />
            <Label htmlFor="accept" className="flex">
              Nama Kategori
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="flex">
              Nama Kategori
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="flex">
              Nama Kategori
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="flex">
              Nama Kategori
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="flex">
              Nama Kategori
            </Label>
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
              // required
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
              // required
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
