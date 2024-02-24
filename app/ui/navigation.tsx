import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import Logo from "@/app/ui/penerbitan-buku-logo";
import {
  ShoppingCartIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./button";
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="sticky top-0 w-full bg-whiteColor">
      <div className="flex flex-col">
        <div className="flex justify-between px-32 py-4">
          <Link href="/">
            <Logo />
          </Link>
          {/* searchbox */}
          <div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-primaryBorder py-[14px] pl-10 text-sm outline-2 placeholder:text-disableColor"
                id="searchbox"
                type="text"
                name="searchbox"
                placeholder="Cari Buku.."
                // required
              />
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-disableColor peer-focus:text-blackColor" />
            </div>
          </div>
          <div className="flex items-center">
            {/* logo cart */}
            <Link className="px-1" href="/keranjang">
              <ShoppingCartIcon className="text-primaryColor w-auto h-6" />
            </Link>
            <Link className="px-1 ml-4" href="/keranjang">
              <BellIcon className="text-primaryColor w-auto h-6" />
            </Link>
            {/* login */}
            <Link className="ml-4" href="/keranjang">
              <LoginButton />
            </Link>
          </div>
        </div>
        {/* divider */}
        <div className="h-0.5 w-full bg-red-500 px-20"></div>
        <div className="flex px-32 py-4">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  return <Button className="w-full">Masuk</Button>;
}
