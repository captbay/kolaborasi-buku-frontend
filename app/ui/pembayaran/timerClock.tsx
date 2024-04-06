"use client";
import React from "react";
import Countdown, { zeroPad, calcTimeDelta } from "react-countdown";
import { Button } from "@/app/ui/button";
import { Modal } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import Link from "next/link";

const customTheme: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: "relative h-fit w-fit p-4 md:h-auto",
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      popup: "border-b-0 p-2",
      title: "text-xl font-medium text-gray-900 dark:text-white",
      close: {
        base: "hidden ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
  },
};

// Random component
const Completionist = () => (
  <>
    <section
      className="p-2 bg-red-600 text-whiteColor rounded-full"
      suppressHydrationWarning={true}
    >
      <span className="text-xl" suppressHydrationWarning={true}>
        Waktu Habis!
      </span>
    </section>
    <Flowbite theme={{ theme: customTheme }}>
      <Modal show={true}>
        <Modal.Header>Batas Pembayaran Sudah Habis</Modal.Header>
        <Modal.Body>Silahkan Melakukan Pemesanan Kembali</Modal.Body>
        <Modal.Footer>
          <Button className="w-full">
            <Link href="/">Menuju Beranda</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </Flowbite>
  </>
);

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <section
        className="p-2 bg-primaryColor text-whiteColor rounded-full flex items-center"
        suppressHydrationWarning={true}
      >
        <span className="text-xl" suppressHydrationWarning={true}>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      </section>
    );
  }
};

export default function TimerClock({
  msTime,
  onComplete,
}: {
  msTime: number;
  onComplete: () => void;
}) {
  const timer = calcTimeDelta(msTime);

  return (
    <Countdown
      date={Date.now() + timer.total}
      renderer={renderer}
      onComplete={onComplete}
    />
  );
}
