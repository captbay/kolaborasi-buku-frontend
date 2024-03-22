"use client";

import React, { Suspense, useRef, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import Logo from "@/app/ui/penerbitan-buku-logo";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  // params
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // if dont have token or email
  if (!token || !email) {
    return (
      <Suspense fallback={<p>Loading feed...</p>}>
        <section className="rounded-lg bg-primaryCard px-6 pb-4 pt-8 mx-4 lg:mx-0 lg:w-[400px] flex flex-col gap-2 items-center">
          <div className="mb-4 flex justify-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className={`${lusitana.className} self-start mb-3 text-2xl`}>
            Terjadi Kesalahan
          </h1>
          <p className="text-sm text-blackColor">
            Terjadi kesalahan saat mengakses halaman ini, silahkan coba lagi
          </p>
          <Link href="/">
            <Button>Kembali</Button>
          </Link>
        </section>
      </Suspense>
    );
  }

  // refs
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // route
  const router = useRouter();

  // state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessagePasswordConfirm, setErrorMessagePasswordConfirm] =
    useState<string>("");

  // handle reset password
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    // reset error message
    setErrorMessage("");
    setErrorMessagePassword("");
    setErrorMessagePasswordConfirm("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const password = passwordRef.current?.value as string;
    const passwordConfirm = passwordConfirmRef.current?.value as string;
    try {
      const res = await resetPassword(
        token as string,
        email as string,
        password,
        passwordConfirm
      );
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });

        // add delay to show toast
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });

      if (error?.response?.data?.message.password !== undefined) {
        setErrorMessagePassword(
          error?.response?.data?.message.password[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.confirm_password !== undefined) {
        setErrorMessagePasswordConfirm(
          error?.response?.data?.message.confirm_password[0] ||
            "An error occurred."
        );
      }

      if (error?.response?.data?.success === false) {
        setErrorMessage(
          error?.response?.data?.message || "Invalid credentials"
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
      <form onSubmit={handleResetPassword} className="space-y-3">
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Ganti Kata Sandi
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="newPassword"
              >
                Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Masukan Kata Sandi"
                  ref={passwordRef}
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
              </div>
              {errorMessagePassword && (
                <div
                  className="flex h-8 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">
                    {errorMessagePassword}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-blackColor"
                htmlFor="confirmPassword"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Masukan Ulang Kata Sandi"
                  ref={passwordConfirmRef}
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
              </div>
              {errorMessagePasswordConfirm && (
                <div
                  className="flex h-8 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">
                    {errorMessagePasswordConfirm}
                  </p>
                </div>
              )}
            </div>
          </div>
          <Button className="mt-4 w-full" type="submit">
            Reset Kata Sandi{" "}
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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
