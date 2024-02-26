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
          <li>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex grow items-center rounded-md px-3 text-sm font-medium hover:text-primaryColor ",
                {
                  "text-primaryColor": pathname === link.href,
                }
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
}
