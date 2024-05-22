import Link from "next/link";
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from "@heroicons/react/24/outline";
// import { signOut } from '@/auth';
import Logo from "@/app/ui/penerbitan-buku-logo";
import Image from "next/image";
import { Button } from "./button";

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

export default function Footer() {
  return (
    <footer className="flex h-full flex-col py-16 px-14 lg:px-28 bottom-0 bg-whiteColor">
      <div className="flex flex-col lg:flex-row justify-between mb-12">
        <div className="w-full lg:w-1/3">
          <Link href="/">
            <Logo />
          </Link>
          {/* description perusahan */}
          <p className="mt-2 lg:mt-4 text-wrap text-xs">
            Arunika Budi Agung Abadi adalah perusahaan penerbitan buku yang
            berkomitmen untuk membantu membantu pembelian buku, berkolaborasi
            dan menerbitkan buku yang memberi penulis menemukan peluang terbaik.
          </p>
        </div>
        <div className="mt-8 lg:mt-0">
          <h1 className="text-sm font-medium mb-2 lg:mb-4">Fitur-Fitur</h1>
          <nav>
            <ul>
              {links.map((link) => (
                <li key={link.name}>
                  <Link key={link.name} href={link.href}>
                    <p className=" mt-2 text-wrap text-xs">{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <h1 className="text-sm font-medium">Memiliki Pertanyaan ?</h1>
          <p className="mt-2 lg:mt-4 text-wrap text-xs">
            Arunika Budi Agung Abadi akan membantu menjawab seluruh pertanyaan
            Anda. Tekan tombol dibawah ini untuk menemukan jawaban dari
            pertanyaan Anda.
          </p>
          <Link href="/hubungi-kami">
            <Button className="w-full h-8 mt-2">Hubungi Kami</Button>
          </Link>
        </div>
      </div>
      <div className="h-0.5 w-full bg-primaryCard px-14 lg:px-20"></div>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-0 lg:justify-between mt-6">
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
            <Image src="/facebook.svg" alt="facebook" width={24} height={24} />
          </Link>
          <Link href="/">
            <Image src="/tiktok.svg" alt="tiktok" width={24} height={24} />
          </Link>
          <Link href="/">
            <Image
              src="/x-twitter.svg"
              alt="x-twitter"
              width={24}
              height={24}
            />
          </Link>
        </figure>
        <p className="text-xs text-center lg:text-base">
          © 2024 Arunika Budi Agung Abadi
        </p>
      </div>
    </footer>
  );
}

//
// NANTI DI FOOTER ITU PAKE tag footer ya buat ada link nnya
