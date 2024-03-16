import React, { Suspense } from "react";

import Image from "next/image";
import { Carousel } from "flowbite-react";

import { getEvent } from "@/app/lib/actions";
import { Event } from "@/app/lib/definitions";

import type { CustomFlowbiteTheme } from "flowbite-react";
import EmptyData from "../emptyData";

const customTheme: CustomFlowbiteTheme["carousel"] = {
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
  },
};

export default async function Coursell() {
  const data: Event[] = await getEvent();

  if (data.length < 1) {
    return (
      <section className="p-4">
        <EmptyData
          title="Belum ada event"
          value="Tunggu Event-event keren kami ya!"
        />
      </section>
    );
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <section className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={3000} pauseOnHover theme={customTheme}>
          {data?.map((event, index) => (
            <Image
              key={index}
              src={process.env.NEXT_PUBLIC_STORAGE_FILE + event.file}
              alt="Picture of the event"
              width={500}
              height={500}
              priority
              className="w-full h-full"
            />
          ))}
        </Carousel>
      </section>
    </Suspense>
  );
}
