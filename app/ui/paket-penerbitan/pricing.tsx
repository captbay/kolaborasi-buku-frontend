import React from "react";

import { lusitana } from "@/app/ui/fonts";

import PriceCards from "@/app/ui/price-cards";

export default function pricing() {
  return (
    <div className="flex justify-between flex-wrap gap-8">
      <PriceCards />
      <PriceCards />
      <PriceCards />
    </div>
  );
}
