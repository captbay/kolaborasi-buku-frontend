import React from "react";
import Image from "next/image";

import { Button } from "@/app/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function CardsLanscape() {
  return (
    <div className="flex justify-around bg-white border border-gray-200 rounded-lg min-w-full">
      <Image
        className="p-4 w-32 h-32"
        src={"/books/1.png"}
        alt=""
        width={500}
        height={500}
      />
      <div className="flex flex-1 flex-col p-4 leading-normal">
        <h2 className="text-sm font-light">Sejarah</h2>
        <h3 className="text-base font-semibold tracking-tight text-blackColor">
          Buku Kemerdekaan Indonesia : sejarah dari negeri kuno
        </h3>
        <p className="text-xl font-bold text-gray-900 ">$599</p>
      </div>
      <div className="flex items-end p-4">
        <Button className="w-fit">
          <TrashIcon className="text-whiteColor w-auto h-6" />
        </Button>
      </div>
    </div>
  );
}
