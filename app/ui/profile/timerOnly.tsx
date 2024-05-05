"use client";
import React from "react";
import Countdown, { zeroPad, calcTimeDelta } from "react-countdown";

// Random component
const Completionist = () => (
  <section
    className="p-2 bg-red-600 text-whiteColor rounded-full flex items-center"
    suppressHydrationWarning={true}
  >
    <span className="text-xs" suppressHydrationWarning={true}>
      Waktu Pembayaran Habis
    </span>
  </section>
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
        <span className="text-xs" suppressHydrationWarning={true}>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      </section>
    );
  }
};

export default function TimerOnly({
  // msTime,
  dateExp,
}: {
  // msTime: number;
  dateExp: string;
}) {
  // const timer = calcTimeDelta(msTime);

  return <Countdown date={dateExp} renderer={renderer} />;
}
