"use client";
import React, { useRef, useState, FormEvent } from "react";
import { Tabs } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { toast } from "react-toastify";
import { Button } from "@/app/ui/button";
import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { gantiPassword } from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { useRouter } from "next/navigation";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        underline: "flex-wrap -mb-px border-b border-gray-200",
      },
      tabitem: {
        base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "text-primaryColor rounded-t-lg border-b-2 border-primaryColor active",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  },
};

export default function CrudUserForm() {
  const { token, token_type, clearCookie } = useGetCookie();
  const router = useRouter();

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Edit Profil">
          <FormEdit router={router} token={token} token_type={token_type} />
        </Tabs.Item>
        <Tabs.Item title="Ganti Kata Sandi">
          <FormGantiPassword
            router={router}
            token={token}
            token_type={token_type}
            clearCookie={clearCookie}
          />
        </Tabs.Item>
        {/* <Tabs.Item disabled title="Disabled">
          Disabled content
        </Tabs.Item> */}
      </Tabs>
    </Flowbite>
  );
}

function FormEdit({
  router,
  token,
  token_type,
}: {
  router: any;
  token: string;
  token_type: string;
}) {
  return (
    <section>
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
              // ref={emailRef}
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FormGantiPassword({
  router,
  token,
  token_type,
  clearCookie,
}: {
  router: any;
  token: string;
  token_type: string;
  clearCookie: () => void;
}) {
  // refs
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordNewRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessagePasswordNew, setErrorMessagePasswordNew] =
    useState<string>("");
  const [errorMessagePasswordConfirm, setErrorMessagePasswordConfirm] =
    useState<string>("");

  // handle ganti password
  const handleGantiPassword = async (e: FormEvent<HTMLFormElement>) => {
    // ganti error message
    setErrorMessage("");
    setErrorMessagePassword("");
    setErrorMessagePasswordNew("");
    setErrorMessagePasswordConfirm("");

    // toast loading register
    const loading = toast.loading("Silahkan tunggu sebentar...");

    e.preventDefault();
    const password = passwordRef.current?.value as string;
    const passwordNew = passwordNewRef.current?.value as string;
    const passwordConfirm = passwordConfirmRef.current?.value as string;
    try {
      const res = await gantiPassword(
        password,
        passwordNew,
        passwordConfirm,
        token,
        token_type
      );
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render: res.data.message,
          type: "success",
          autoClose: 5000,
          closeButton: true,
          isLoading: false,
        });

        // clear cookie
        clearCookie();

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

      if (error?.response?.data?.message.new_password !== undefined) {
        setErrorMessagePasswordNew(
          error?.response?.data?.message.new_password[0] || "An error occurred."
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
    <section className="px-8">
      <form onSubmit={handleGantiPassword} className="space-y-3">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-blackColor"
              htmlFor="oldPassword"
            >
              Kata Sandi Lama
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
              htmlFor="newPassword"
            >
              Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[9px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Masukan Ulang Kata Sandi"
                ref={passwordNewRef}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
            </div>
            {errorMessagePasswordNew && (
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-dangerColor" />
                <p className="text-sm text-dangerColor">
                  {errorMessagePasswordNew}
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
          Ganti Kata Sandi
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
      </form>
    </section>
  );
}
