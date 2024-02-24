"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Beranda", href: "/" },
  { name: "Kolaborasi", href: "/kolaborasi" },
  { name: "Penerbitan", href: "/paket-penerbitan" },
  { name: "Bantuan", href: "/bantuan" },
  {
    name: "Hubungi Kami",
    href: "/hubungi-kami",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <nav>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              <p className="block">{link.name}</p>
            </Link>
          </nav>
        );
      })}
    </>
  );
}
