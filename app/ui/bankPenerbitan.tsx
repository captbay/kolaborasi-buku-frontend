import React from "react";
import { getRekening } from "@/app/lib/data";
import { rekeningData } from "@/app/lib/definitions";

export default async function BankPenerbitan({
  rekening,
}: {
  rekening: rekeningData;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg min-w-full">
      <div className="flex flex-col m-6">
        <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
          Transfer Bank
        </h2>
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-base font-light tracking-tight text-blackColor">
            {rekening.no_rek}
          </p>
          <p className="text-base font-medium tracking-tight text-blackColor">
            {rekening.bank_rek}
          </p>
          <p className="text-base font-light tracking-tight text-blackColor">
            Atas Nama: {rekening.nama_rek}
          </p>
        </div>
      </div>
    </div>
  );
}
