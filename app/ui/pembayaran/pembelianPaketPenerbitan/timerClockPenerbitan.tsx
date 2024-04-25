"use client";
import React from "react";
import Countdown, { zeroPad, calcTimeDelta } from "react-countdown";

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

export default function TimerClockPenerbitan({
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
