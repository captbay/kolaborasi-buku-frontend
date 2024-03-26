"use client";

import React from "react";

import { Avatar, Dropdown } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import { logout } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function ProfileCircle({
  fotoProfil,
  namaLengkap,
  email,
}: {
  fotoProfil: string;
  namaLengkap: string;
  email: string;
}) {
  const { token, token_type, clearCookie } = useGetCookie();
  const pathname = usePathname();

  const handleLogout = () => {
    if (token && token_type) {
      logout(token, token_type)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            clearCookie();
            window.location.reload();
            toast.success("Berhasil Keluar");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dropdown
      label={
        fotoProfil == null ? (
          <Image
            alt="Gambar Profil"
            height="500"
            src="/default_profile.jpg"
            width="500"
            className="w-10 h-10 rounded-full shadow-lg"
          />
        ) : (
          <Image
            alt="Gambar Profil"
            height="500"
            src={"http://kolaborasi-buku-backend.test/storage/" + fotoProfil}
            width="500"
            className="w-10 h-10 rounded-full shadow-lg"
          />
        )
      }
      arrowIcon={false}
      placement="bottom"
      inline
    >
      <Dropdown.Header>
        <span className="block text-base">{namaLengkap}</span>
        <span className="block truncate text-sm font-bold">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor": pathname === "/profil/akun",
        })}
        href="/profil/akun"
      >
        Akun
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor": pathname === "/profil/transaksi",
        })}
        href="/profil/transaksi"
      >
        Transaksi
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor": pathname === "/profil/koleksi-buku-saya",
        })}
        href="/profil/koleksi-buku-saya"
      >
        Koleksi Buku Saya
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        className="text-sm font-medium hover:text-primaryColor hover:cursor-pointer"
        onClick={handleLogout}
      >
        Keluar
      </Dropdown.Item>
    </Dropdown>
  );
}
