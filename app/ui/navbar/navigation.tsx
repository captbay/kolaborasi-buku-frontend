import Link from "next/link";
import NavLinks from "@/app/ui/navbar/nav-links";
import Logo from "@/app/ui/penerbitan-buku-logo";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import ProfileCircle from "@/app/ui/navbar/profile-cirlce";
import Notification from "@/app/ui/navbar/notification";
import Search from "../search";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { User, NotifikasiResponse } from "@/app/lib/definitions";
import { getUser, getNotifikasi } from "@/app/lib/data";
import { revalidateTag } from "next/cache";

export default async function TopNav() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, id, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        id: null,
        token_type: null,
      };

  const user: User = await getUser(id, token, token_type);
  const notifikasi: NotifikasiResponse = await getNotifikasi(token, token_type);

  return (
    <div className="sticky top-0 w-full bg-whiteColor px-14 lg:px-28 z-20">
      <div className="flex flex-col">
        <div className="flex justify-between py-4 items-center">
          {/* hamburger */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
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
            <Suspense fallback={<p>Loading feed...</p>}>
              <Search placeholder="Cari koleksi buku berdasarkan judul atau penulis..." />
            </Suspense>
          </div>
          <div className="flex items-center">
            {/* logo cart */}
            <Link className="px-1 ml-4" href="/keranjang">
              <ShoppingCartIcon className="text-primaryColor w-auto h-6 m-1" />
            </Link>
            {/* notification */}
            {cookie && (
              <div className="hidden px-1 ml-4 lg:inline-flex">
                <Notification
                  data={notifikasi}
                  token={token}
                  token_type={token_type}
                />
              </div>
            )}
            {/* login */}
            {!cookie && (
              <Link className="hidden ml-4 lg:inline-flex" href="/login">
                <LoginButton />
              </Link>
            )}
            {/* profile */}
            {cookie && (
              <Suspense fallback={<div>Loading...</div>}>
                <div className="hidden ml-5 lg:inline-flex">
                  <ProfileCircle
                    fotoProfil={user.foto_profil}
                    namaLengkap={user.nama_lengkap}
                    email={user.email}
                  />
                </div>
              </Suspense>
            )}
          </div>
        </div>
        {/* divider */}
        <div className="hidden lg:block h-0.5 w-full bg-primaryCard px-20"></div>
        <nav>
          <ul className="hidden lg:flex py-4">
            <NavLinks />
          </ul>
        </nav>
      </div>
    </div>
  );
}

function LoginButton() {
  return <Button className="w-full">Masuk</Button>;
}
