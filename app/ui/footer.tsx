import Link from "next/link";
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from "@heroicons/react/24/outline";
// import { signOut } from '@/auth';
import Logo from "@/app/ui/penerbitan-buku-logo";
import Image from "next/image";
import { Button } from "./button";

export default function Footer() {
  return (
    <footer className="flex h-full flex-col py-16 px-28 bottom-0">
      <div className="flex justify-between mb-12">
        <div className="w-1/3">
          <Link href="/">
            <Logo />
          </Link>
          {/* description perusahan */}
          <p className="mt-4 text-wrap text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            tincidunt, nunc vitae. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc tincidunt, nunc vitae.
          </p>
        </div>
        <div>
          <h1 className="text-sm font-medium">Fitur-Fitur</h1>
          <nav>
            <ul className="mt-4">
              <li>
                <Link href="/">
                  <p className="text-wrap text-xs">Kolaborasi</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p className="mt-2 text-wrap text-xs">Penerbitan</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h1 className="text-sm font-medium">Fitur-Fitur</h1>
          <nav>
            <ul className="mt-4">
              <li>
                <Link href="/">
                  <p className="text-wrap text-xs">Kolaborasi</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p className="mt-2 text-wrap text-xs">Penerbitan</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-1/3">
          <h1 className="text-sm font-medium">Memiliki Pertanyaan ?</h1>
          <p className="mt-4 text-wrap text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            tincidunt, nunc vitae.
          </p>
          <Button className="w-full h-8 mt-2">Hubungi Kami</Button>
        </div>
      </div>
      <div className="h-0.5 w-full bg-primaryCard px-20"></div>
      <div className="flex justify-between mt-6">
        <p>© 2024 Penerbitan Buku</p>
        <figure className="flex">
          <Link href="/">
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/">
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={24}
              height={24}
              className="ml-6"
            />
          </Link>
          <Link href="/">
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={24}
              height={24}
              className="ml-6"
            />
          </Link>
          <Link href="/">
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={24}
              height={24}
              className="ml-6"
            />
          </Link>
        </figure>
      </div>
    </footer>
  );
}

//
// NANTI DI FOOTER ITU PAKE tag footer ya buat ada link nnya
