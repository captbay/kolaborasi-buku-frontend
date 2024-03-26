"use client";

import React, { useRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { lusitana } from "@/app/ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import Logo from "../penerbitan-buku-logo";
import Link from "next/link";
import { register } from "@/app/lib/actions";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const router = useRouter();

  // ref form
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const noTelpRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // error state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageFirstName, setErrorMessageFirstName] =
    useState<string>("");
  const [errorMessageLastName, setErrorMessageLastName] = useState<string>("");
  const [errorMessageNoTelp, setErrorMessageNoTelp] = useState<string>("");
  const [errorMessageMail, setErrorMessageMail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");

  // handle register
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    // reset error message
    setErrorMessage("");
    setErrorMessageFirstName("");
    setErrorMessageLastName("");
    setErrorMessageNoTelp("");
    setErrorMessageMail("");
    setErrorMessagePassword("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const nama_depan: string = firstNameRef.current?.value as string;
    const nama_belakang: string = lastNameRef.current?.value as string;
    const no_telepon: string = noTelpRef.current?.value as string;
    const email: string = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    try {
      const res = await register(
        nama_depan,
        nama_belakang,
        no_telepon,
        email,
        password
      );
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render:
            "Pendaftaran Akun Berhasil! Silahkan cek email Anda untuk verifikasi akun Anda.",
          type: "success",
          autoClose: 10000,
          closeButton: true,
          isLoading: false,
        });
        router.push("/login");
      }
    } catch (error: any) {
      toast.update(loading, {
        render: "Terjadi Kesalahan!",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });

      if (error?.response?.data?.message.nama_depan !== undefined) {
        setErrorMessageFirstName(
          error?.response?.data?.message.nama_depan[0] || "An error occurred."
        );
      }
      if (error?.response?.data?.message.nama_belakang !== undefined) {
        setErrorMessageLastName(
          error?.response?.data?.message.nama_belakang[0] ||
            "An error occurred."
        );
      }
      if (error?.response?.data?.message.no_telepon !== undefined) {
        setErrorMessageNoTelp(
          error?.response?.data?.message.no_telepon[0] || "An error occurred."
        );
      }
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
        setErrorMessage(error?.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="rounded-lg bg-primaryCard px-6 pb-4 pt-8 mx-4 lg:mx-0 lg:w-[400px]">
      <div className="mb-4 flex justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <form onSubmit={handleRegister} className="space-y-3">
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Silahkan Mendaftar Untuk Mendapatkan Akun
          </h1>
          <div className="w-full">
            {/* firstname */}
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
                  ref={firstNameRef}
                  required
                />
              </div>
              {errorMessageFirstName && (
                <div
                  className="flex h-8 items-center space-x-1 mt-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">
                    {errorMessageFirstName}
                  </p>
                </div>
              )}
            </div>

            {/* lastname */}
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
                  ref={lastNameRef}
                  required
                />
              </div>
              {errorMessageLastName && (
                <div
                  className="flex h-8 items-center space-x-1 mt-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">
                    {errorMessageLastName}
                  </p>
                </div>
              )}
            </div>

            {/* no phone */}
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
                  ref={noTelpRef}
                  required
                />
              </div>
              {errorMessageNoTelp && (
                <div
                  className="flex h-8 items-center space-x-1 mt-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                  <p className="text-sm text-dangerColor">
                    {errorMessageNoTelp}
                  </p>
                </div>
              )}
            </div>

            {/* email */}
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
                  ref={emailRef}
                  required
                />
              </div>
              {errorMessageMail && (
                <div
                  className="flex h-8 items-center space-x-1 mt-2"
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
                  className="peer block w-full rounded-md border border-primaryBorder py-[9px] text-sm outline-2 placeholder:text-disableColor"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Masukan Kata Sandi"
                  ref={passwordRef}
                  required
                  minLength={6}
                />
              </div>
              {errorMessagePassword && (
                <div
                  className="flex h-8 items-center space-x-1 mt-2"
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
                    href="#"
                  >
                    Syarat dan Ketentuan
                  </Link>
                </label>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full" type="submit">
            Registrasi
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
          {errorMessage && (
            <div
              className="flex h-8 items-center space-x-1 mt-2"
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
