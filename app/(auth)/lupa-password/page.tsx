"use client";

import React, { useRef, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import Logo from "@/app/ui/penerbitan-buku-logo";
import { sendEmailForgotPassword } from "@/app/lib/actions";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function LupaPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    // reset error message
    setErrorMessage("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const email: string = emailRef.current?.value as string;
    try {
      const res = await sendEmailForgotPassword(email);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render:
            res.data.message ||
            "Jika Benar Email Terdaftar, Link Reset Password Akan Dikirim Ke Email Anda!",
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });

      if (error?.response?.data?.success === false) {
        setErrorMessage(
          error?.response?.data?.message?.email[0] !== undefined
            ? error?.response?.data?.message?.email[0]
            : error?.response?.data?.message
        );
      }
    }
  };

  return (
    <section className="rounded-lg bg-primaryCard px-6 pb-4 pt-8 mx-4 lg:mx-0 lg:w-[400px]">
      <div className="mb-4 flex justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <form onSubmit={handleSendEmail} className="space-y-3">
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Kirim Email Untuk Reset Password
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Masukan Email Anda"
                  ref={emailRef}
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full" type="submit">
            Kirim <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
          {errorMessage && (
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
              <p className="text-sm text-dangerColor">{errorMessage}</p>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
