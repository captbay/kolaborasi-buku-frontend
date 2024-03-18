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
    <footer className="flex h-full flex-col py-16 px-14 md:px-28 bottom-0">
      <div className="flex flex-col md:flex-row justify-between mb-12">
        <div className="w-full md:w-1/3">
          <Link href="/">
            <Logo />
          </Link>
          {/* description perusahan */}
          <p className="mt-2 md:mt-4 text-wrap text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            tincidunt, nunc vitae. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc tincidunt, nunc vitae.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
          <h1 className="text-sm font-medium">Fitur-Fitur</h1>
          <nav>
            <ul className="mt-2 md:mt-4">
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
        <div className="mt-8 md:mt-0">
          <h1 className="text-sm font-medium">Fitur-Fitur</h1>
          <nav>
            <ul className="mt-2 md:mt-4">
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
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h1 className="text-sm font-medium">Memiliki Pertanyaan ?</h1>
          <p className="mt-2 md:mt-4 text-wrap text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            tincidunt, nunc vitae.
          </p>
          <Link href="/hubungi-kami">
            <Button className="w-full h-8 mt-2">Hubungi Kami</Button>
          </Link>
        </div>
      </div>
      <div className="h-0.5 w-full bg-primaryCard px-14 md:px-20"></div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-0 md:justify-between mt-6">
        <figure className="flex gap-8 items-center justify-center">
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
            />
          </Link>
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
            />
          </Link>
        </figure>
        <p className="text-xs text-center md:text-base">
          © 2024 Penerbitan Buku
        </p>
      </div>
    </footer>
  );
}

//
// NANTI DI FOOTER ITU PAKE tag footer ya buat ada link nnya
