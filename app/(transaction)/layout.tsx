import "./../ui/globals.css";
import { inter } from "@/app/ui/fonts";

import { Metadata } from "next";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Penerbitan Buku",
    default: "Penerbitan Buku",
  },
  description: "Website Penerbitan Buku",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-primaryCard`}>
        <ToastContainer position="bottom-right" />
        <section className="w-full justify-center flex pt-8">
          <Link href="/">
            <div
              className={`${lusitana.className} flex items-center leading-none text-primaryColor`}
            >
              <GlobeAltIcon className="h-8 w-8 rotate-[15deg]" />
              <div>
                <p className="text-xl lg:text-2xl">PT Penerbitan Buku</p>
              </div>
            </div>
          </Link>
        </section>
        <main className="px-14 lg:px-28 py-16">{children}</main>
      </body>
    </html>
  );
}
