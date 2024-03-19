"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import Logo from "@/app/ui/penerbitan-buku-logo";

export default function LupaPassword() {
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
            Ganti Kata Sandi
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
          </div>
          <SendButton />
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
      </form>
    </section>
  );
}

function SendButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Kirim <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
