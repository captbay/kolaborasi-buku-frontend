"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/data";
import Logo from "../penerbitan-buku-logo";
import Link from "next/link";

export default function RegisterForm() {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="rounded-lg bg-primaryCard px-6 pb-4 pt-8 mx-4 lg:mx-0 lg:w-[400px]">
      <div className="mb-4 flex justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <form
        //  action={dispatch}
        className="space-y-3"
      >
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Silahkan Mendaftar Untuk Mendapatkan Akun
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="firstName"
              >
                Nama Depan
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Masukan Nama Depan Anda"
                  // required
                />
              </div>
            </div>

            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="lastName"
              >
                Nama Belakang
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Masukan Nama Belakang Anda"
                  // required
                />
              </div>
            </div>

            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="noPhone"
              >
                Nomor Telepon
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                  id="noPhone"
                  type="number"
                  name="noPhone"
                  placeholder="Masukan Nomor Telepon Anda"
                  // required
                />
              </div>
            </div>

            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Masukan Email Anda"
                  // required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Masukan Kata Sandi"
                  // required
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="accept"
                  aria-describedby="accept"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryColor"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accept" className="text-sm font-light">
                  Saya menerima{" "}
                  <Link
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="/syarat-ketentuan"
                  >
                    Syarat dan Ketentuan
                  </Link>
                </label>
              </div>
            </div>
          </div>
          <LoginButton />
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">{errorMessage}</p>
              </>
            )} */}
          </div>
        </div>
        <div className="">
          <p className="text-sm font-light">
            Sudah Punya Akun?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Registrasi
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
