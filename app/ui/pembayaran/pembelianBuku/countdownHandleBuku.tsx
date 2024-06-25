"use client";
import { updateStatusTransaksiBuku } from "@/app/lib/actions";
import { getTrxPenjualanBukuResponse } from "@/app/lib/definitions";
import React from "react";
import { toast } from "react-toastify";
import TimerClock from "../timerClock";
import useGetCookie from "@/app/lib/useGetCookies";
import { useRouter } from "next/navigation";

export default function CountdownHandleBuku({
  data,
}: {
  data: getTrxPenjualanBukuResponse;
}) {
  const { token, token_type } = useGetCookie();
  const router = useRouter();

  const handleCompleteTime = async () => {
    try {
      const res = await updateStatusTransaksiBuku(
        data.trx_id,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        toast.error(res.data.message);
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <TimerClock dateExp={data.date_time_exp} onComplete={handleCompleteTime} />
  );
}
