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
      Waktu Pembuatan Habis!
    </span>
  </section>
);

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
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
        className="p-2 bg-primaryColor text-whiteColor rounded-full flex flex-col md:flex-row items-center"
        suppressHydrationWarning={true}
      >
        <span className="text-xs" suppressHydrationWarning={true}>
          {zeroPad(days)} hari
        </span>
        <span className="text-xs" suppressHydrationWarning={true}>
          : {zeroPad(hours)} jam
        </span>
        <span className="text-xs" suppressHydrationWarning={true}>
          : {zeroPad(minutes)} menit
        </span>
        <span className="text-xs" suppressHydrationWarning={true}>
          : {zeroPad(seconds)} detik
        </span>
      </section>
    );
  }
};

export default function TimerKolaborasi({
  msTime,
  onComplete,
}: {
  msTime: number;
  onComplete?: () => void;
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
