"use client";

import React from "react";

import { Avatar, Dropdown } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import { logout } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function ProfileCircle({
  fotoProfil,
  namaLengkap,
  email,
}: {
  fotoProfil?: string;
  namaLengkap?: string;
  email?: string;
}) {
  const { token, token_type, clearCookie } = useGetCookie();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (token && token_type) {
      logout(token, token_type)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            clearCookie();
            router.refresh();
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
            src={process.env.NEXT_PUBLIC_STORAGE_FILE + fotoProfil}
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
          "text-primaryColor": pathname === "/profil/transaksi-pembelian-buku",
        })}
        href="/profil/transaksi-pembelian-buku"
      >
        Transaksi Pembelian Buku
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor": pathname === "/profil/transaksi-kolaborasi-buku",
        })}
        href="/profil/transaksi-kolaborasi-buku"
      >
        Transaksi Kolaborasi Buku
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor":
            pathname === "/profil/transaksi-paket-penerbitan",
        })}
        href="/profil/transaksi-paket-penerbitan"
      >
        Transaksi Paket Penerbitan
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor": pathname === "/profil/koleksi-buku-saya",
        })}
        href="/profil/koleksi-buku-saya"
      >
        Koleksi Buku Saya
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor":
            pathname === "/profil/koleksi-buku-kolaborasi-saya",
        })}
        href="/profil/koleksi-buku-kolaborasi-saya"
      >
        Koleksi Buku Kolaborasi Saya
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx("text-sm font-medium hover:text-primaryColor", {
          "text-primaryColor":
            pathname === "/profil/koleksi-buku-penerbitan-saya",
        })}
        href="/profil/koleksi-buku-penerbitan-saya"
      >
        Koleksi Buku Penerbitan Saya
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
