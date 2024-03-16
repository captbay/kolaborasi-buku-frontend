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

// import { signOut } from '@/auth';

export default function TopNav() {
  return (
    <div className="sticky top-0 w-full bg-whiteColor px-28 z-20">
      <div className="flex flex-col">
        <div className="flex justify-between py-4 items-center">
          <Link href="/">
            <Logo />
          </Link>
          {/* searchbox */}
          <Search placeholder="Cari koleksi buku berdasarkan judul atau penulis..." />
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
