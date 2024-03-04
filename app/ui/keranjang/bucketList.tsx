import React from "react";
import CardsLanscape from "@/app/ui/cards-lanscape";

import { Button } from "@/app/ui/button";

export default async function bucketList() {
  return (
    <div className="flex justify-between">
      <div className="ml-8 flex-1 flex flex-col gap-4">
        <CardsLanscape />
        <CardsLanscape />
        <CardsLanscape />
        <CardsLanscape />
        <CardsLanscape />
      </div>
      <div className="mx-8 flex-[0.5]">
        <div className="bg-white border border-gray-200 rounded-lg min-w-full sticky top-[182px]">
          <div className="flex flex-col m-6">
            <h2 className="text-2xl font-semibold tracking-tight text-blackColor">
              Ringkasan Belanja
            </h2>
            <div className="flex justify-between mt-4">
              <h3 className="text-base font-light tracking-tight text-blackColor">
                Total Harga
              </h3>
              <h3 className="text-base font-semibold tracking-tight text-blackColor">
                Rp 100.000
              </h3>
            </div>
            <Button className="mt-4">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
