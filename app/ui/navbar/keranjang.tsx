"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CountKeranjang } from "@/app/lib/definitions";

export default function Keranjang({ data }: { data: CountKeranjang }) {
  return data.count > 0 ? (
    <div className="relative inline-block">
      <ShoppingCartIcon className="text-primaryColor w-auto h-6 m-1" />
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {data.count}
      </span>
    </div>
  ) : (
    <ShoppingCartIcon className="text-primaryColor w-auto h-6" />
  );
}
