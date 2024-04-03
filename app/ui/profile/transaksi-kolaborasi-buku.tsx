"use client";
import React, { useRef, useState, FormEvent } from "react";
import { Tabs } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { toast } from "react-toastify";
import { Button } from "@/app/ui/button";
import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { gantiPassword, updateUser, uploadFileMember } from "@/app/lib/actions";
import useGetCookie from "@/app/lib/useGetCookies";
import { User } from "@/app/lib/definitions";
import Link from "next/link";
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
    tabpanel: "py-4",
  },
};

export default function TransaksiPembelianBuku() {
  const { token, token_type, clearCookie } = useGetCookie();
  const router = useRouter();

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Kolaborasi Buku"></Tabs.Item>
      </Tabs>
    </Flowbite>
  );
}
