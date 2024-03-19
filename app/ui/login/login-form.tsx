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
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import Logo from "../penerbitan-buku-logo";

export default function LoginForm() {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <section className="rounded-lg bg-primaryCard px-6 pb-4 pt-8 mx-4 lg:mx-0 lg:w-[400px]">
      <div className="mb-4 flex justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <form
        // action={dispatch}
        className="space-y-3"
      >
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Silahkan Login Terlebih Dahulu
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
                  // required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
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
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Masukan Kata Sandi"
                  // required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryColor"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-sm font-light">
                    Ingatkan Saya
                  </label>
                </div>
              </div>
              <Link
                href="/lupa-password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Lupa Kata Sandi?
              </Link>
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
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:underline"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Masuk <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function RegisButton() {
  return (
    <Link href="/register">
      <Button className="mt-4 w-full">
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </Link>
  );
}
