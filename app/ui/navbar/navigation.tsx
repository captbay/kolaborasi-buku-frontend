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

// import { signOut } from '@/auth';

export default function TopNav() {
  return (
    <div className="sticky top-0 w-full bg-whiteColor px-28 z-10">
      <div className="flex flex-col">
        <div className="flex justify-between py-4 items-center">
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
            <div className="px-1 ml-4">
              <Notification />
            </div>
            {/* login */}
            <Link className="ml-4" href="/login">
              <LoginButton />
            </Link>
            <div className="ml-4">
              <ProfileCircle />
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="h-0.5 w-full bg-primaryCard px-20"></div>
        <nav>
          <ul className="flex py-4">
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
