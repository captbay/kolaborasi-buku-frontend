"use client";

import { Sidebar } from "flowbite-react";
import useGetCookie from "@/app/lib/useGetCookies";
import { logout } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";

export default function SidebarProfile({
  fotoProfil,
  namaLengkap,
  role,
  email,
}: {
  fotoProfil: string;
  namaLengkap: string;
  role: string;
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
            setTimeout(() => window.location.reload(), 2000);
            toast.success("Berhasil Keluar");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Sidebar aria-label="Sidebar Profil" className="h-fit bg-whiteColor">
      <Sidebar.Items className="bg-whiteColor">
        <section className="max-w-sm">
          <div className="flex flex-col items-center">
            {fotoProfil == null ? (
              <Image
                alt="Gambar Profil"
                height="500"
                src="/default_profile.jpg"
                width="500"
                className="mb-3 w-28 h-28 rounded-full shadow-lg"
              />
            ) : (
              <Image
                alt="Gambar Profil"
                height="500"
                src={
                  "http://kolaborasi-buku-backend.test/storage/" + fotoProfil
                }
                width="500"
                className="mb-3 w-28 h-28 rounded-full shadow-lg"
              />
            )}
            <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {namaLengkap}
            </h1>
            <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {email}
            </span>
            <div className="bg-primaryColor rounded-full px-2 py-1">
              <p className="text-whiteColor text-xs">{role}</p>
            </div>
          </div>
        </section>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor": pathname === "/profil/akun",
            })}
            href="/profil/akun"
          >
            Akun
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor": pathname === "/profil/transaksi",
            })}
            href="/profil/transaksi"
          >
            Transaksi
          </Sidebar.Item>
          <Sidebar.Item
            className={clsx("text-sm font-medium hover:text-primaryColor", {
              "text-primaryColor": pathname === "/profil/koleksi-buku-saya",
            })}
            href="/profil/koleksi-buku-saya"
          >
            Koleksi Buku Saya
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className="text-sm font-medium hover:text-primaryColor hover:cursor-pointer"
            onClick={handleLogout}
          >
            Keluar
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
