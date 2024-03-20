"use client";

import React, { useRef, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { login } from "@/app/lib/actions";
import Link from "next/link";
import Logo from "../penerbitan-buku-logo";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageMail, setErrorMessageMail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    // reset error message
    setErrorMessageMail("");
    setErrorMessagePassword("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const email: string = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    try {
      const res = await login(email, password);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: "Login Berhasil!",
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });

        setCookie(
          "token",
          {
            id: res.data.data.id,
            nama_lengkap: res.data.data.nama_lengkap,
            role: res.data.data.role,
            token_type: res.data.data.token_type,
            token: res.data.data.token,
          },
          {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          }
        );
        router.push("/");
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });

      if (error?.response?.data?.message.email !== undefined) {
        setErrorMessageMail(
          error?.response?.data?.message.email[0] || "An error occurred."
        );
      }
      if (error?.response?.data?.message.password !== undefined) {
        setErrorMessagePassword(
          error?.response?.data?.message.password[0] || "An error occurred."
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
      <form onSubmit={handleLogin} className="space-y-3">
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
                  ref={emailRef}
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
              </div>
              {errorMessageMail && (
                <div
                  className="flex h-8 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">{errorMessageMail}</p>
                </div>
              )}
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
                  minLength={6}
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
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryColor"
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
          <Button className="mt-4 w-full" type="submit">
            Masuk <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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
