import Link from "next/link";
import NavLinks from "@/app/ui/navbar/nav-links";
import Logo from "@/app/ui/penerbitan-buku-logo";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import ProfileCircle from "@/app/ui/navbar/profile-cirlce";
import Notification from "@/app/ui/navbar/notification";
import Search from "../search";
import { Suspense } from "react";

// import { signOut } from '@/auth';

export default function TopNav() {
  return (
    <div className="sticky top-0 w-full bg-whiteColor px-14 md:px-28 z-20">
      <div className="flex flex-col">
        <div className="flex justify-between py-4 items-center">
          <Link href="/">
            <Logo />
          </Link>
          {/* searchbox */}
          <div className="hidden md:flex relative flex-1 flex-shrink-0 mx-16">
            <Suspense fallback={<p>Loading feed...</p>}>
              <Search placeholder="Cari koleksi buku berdasarkan judul atau penulis..." />
            </Suspense>
          </div>
          <div className="flex items-center">
            {/* logo cart */}
            <Link className="hidden px-1 md:flex" href="/keranjang">
              <ShoppingCartIcon className="text-primaryColor w-auto h-6" />
            </Link>
            <div className="hidden px-1 ml-4 md:inline-flex">
              <Notification />
            </div>
            {/* login */}
            <Link className="hidden ml-4 md:flex" href="/login">
              <LoginButton />
            </Link>
            <div className="ml-4">
              <ProfileCircle />
            </div>
            {/* hamburger */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          </div>
        </div>
        {/* divider */}
        <div className="hidden md:block h-0.5 w-full bg-primaryCard px-20"></div>
        <nav>
          <ul className="hidden md:flex py-4">
            <NavLinks />
          </ul>
        </nav>
      </div>
    </div>
  );
}

function LoginButton() {
  return <Button className="w-full h-8">Masuk</Button>;
}
