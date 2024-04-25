"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CountKeranjang, User } from "@/app/lib/definitions";
import ProfileCircle from "@/app/ui/navbar/profile-cirlce";
import Notification from "@/app/ui/navbar/notification";
import Keranjang from "@/app/ui/navbar/keranjang";
import Search from "@/app/ui/search";
import Logo from "@/app/ui/penerbitan-buku-logo";
import clsx from "clsx";
import { Button } from "@/app/ui/button";
import { usePathname } from "next/navigation";

const links = [
  { name: "Beranda", href: "/" },
  { name: "Koleksi", href: "/koleksi-buku" },
  { name: "Kolaborasi", href: "/kolaborasi" },
  { name: "Paket Penerbitan", href: "/paket-penerbitan" },
  { name: "Bantuan", href: "/bantuan" },
  {
    name: "Hubungi Kami",
    href: "/hubungi-kami",
  },
];

export default function HamburgerBtn({
  dataKeranjang,
  dataUser,
  token,
}: {
  dataKeranjang: CountKeranjang | null;
  dataUser: User | null;
  token: any;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-between py-4 items-center">
        {/* hamburger */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <Link href="/">
          <Logo />
        </Link>
        {/* searchbox */}
        <div className="hidden lg:flex relative flex-1 flex-shrink-0 mx-16">
          <Search placeholder="Cari koleksi buku berdasarkan judul atau penulis..." />
        </div>
        <div className="flex items-center">
          {/* logo cart */}
          <Link className="px-1 ml-4" href="/keranjang">
            <Keranjang data={dataKeranjang} />
          </Link>
          {/* notification */}
          {token && (
            <div className="hidden px-1 ml-4 lg:inline-flex">
              <Notification />
            </div>
          )}
          {/* login */}
          {!token && (
            <Link className="ml-4 inline-flex" href="/login">
              <Button className="w-full">Masuk</Button>
            </Link>
          )}
          {/* profile */}
          {token && (
            <div className="hidden ml-5 lg:inline-flex">
              <ProfileCircle
                fotoProfil={dataUser?.foto_profil}
                namaLengkap={dataUser?.nama_lengkap}
                email={dataUser?.email}
              />
            </div>
          )}
        </div>
      </div>
      {open && (
        <NavSmallScreen
          pathname={pathname}
          onClick={() => setOpen(!open)}
          dataUser={dataUser}
        />
      )}
    </>
  );
}

function NavSmallScreen({
  pathname,
  onClick,
  dataUser,
}: {
  pathname: string;
  onClick: () => void;
  dataUser: User | null;
}) {
  return (
    <div className="w-full lg:hidden" id="navbar-search">
      <div className="relative mt-3">
        <Search placeholder="Cari koleksi buku berdasarkan judul atau penulis..." />
      </div>
      <nav>
        <ul className="flex flex-col lg:p-0 my-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white ">
          {links.map((link) => (
            <li key={link.name} onClick={onClick}>
              <Link
                key={link.name}
                href={link.href}
                className={clsx("block py-2 px-3 text-gray-900 rounded", {
                  "text-white": pathname === link.href,
                  "bg-primaryColor": pathname === link.href,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex justify-around my-4">
        <Notification />
        <ProfileCircle
          fotoProfil={dataUser?.foto_profil}
          namaLengkap={dataUser?.nama_lengkap}
          email={dataUser?.email}
        />
      </div>
    </div>
  );
}
