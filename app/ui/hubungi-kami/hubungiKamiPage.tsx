"use client";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { hubungiKami } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { FormEvent, useRef, useState } from "react";

export default function HubungiKamiPage() {
  // refs
  const namaRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjekRef = useRef<HTMLInputElement>(null);
  const pesanRef = useRef<HTMLTextAreaElement>(null);

  // state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageNama, setErrorMessageNama] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessageSubjek, setErrorMessageSubjek] = useState<string>("");
  const [errorMessagePesan, setErrorMessagePesan] = useState<string>("");

  // handle ganti email
  const handleHubungiKami = async (e: FormEvent<HTMLFormElement>) => {
    // ganti error message
    setErrorMessage("");
    setErrorMessageNama("");
    setErrorMessageEmail("");
    setErrorMessageSubjek("");
    setErrorMessagePesan("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const nama = namaRef.current?.value as string;
    const email = emailRef.current?.value as string;
    const subjek = subjekRef.current?.value as string;
    const pesan = pesanRef.current?.value as string;
    try {
      const res = await hubungiKami(nama, email, subjek, pesan);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
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

      if (error?.response?.data?.message.nama !== undefined) {
        setErrorMessageEmail(
          error?.response?.data?.message.nama[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.email !== undefined) {
        setErrorMessageEmail(
          error?.response?.data?.message.email[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.subjek !== undefined) {
        setErrorMessageSubjek(
          error?.response?.data?.message.subjek[0] || "An error occurred."
        );
      }

      if (error?.response?.data?.message.pesan !== undefined) {
        setErrorMessagePesan(
          error?.response?.data?.message.pesan[0] || "An error occurred."
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
    <form onSubmit={handleHubungiKami} className="space-y-8">
      <div>
        <label
          htmlFor="nama"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Nama Anda
        </label>
        <input
          type="text"
          id="nama"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="nama"
          ref={namaRef}
          required
        />
        {errorMessageNama && (
          <div
            className="flex h-8 items-center space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
            <p className="text-sm text-dangerColor">{errorMessageNama}</p>
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Email Anda
        </label>
        <input
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
          ref={emailRef}
          required
        />
        {errorMessageEmail && (
          <div
            className="flex h-8 items-center space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
            <p className="text-sm text-dangerColor">{errorMessageEmail}</p>
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Subjek
        </label>
        <input
          type="text"
          id="subject"
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Beritahu Kami Tentang Ketertarikan Anda"
          ref={subjekRef}
          required
        />
        {errorMessageSubjek && (
          <div
            className="flex h-8 items-center space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
            <p className="text-sm text-dangerColor">{errorMessageSubjek}</p>
          </div>
        )}
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Pesan Anda
        </label>
        <textarea
          id="message"
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Berikan Commentar..."
          ref={pesanRef}
          required
        ></textarea>
        {errorMessagePesan && (
          <div
            className="flex h-8 items-center space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
            <p className="text-sm text-dangerColor">{errorMessagePesan}</p>
          </div>
        )}
      </div>
      <Button type="submit">Kirim</Button>
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
    </form>
  );
}
