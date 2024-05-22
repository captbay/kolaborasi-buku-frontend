import "./../ui/globals.css";
import { inter } from "@/app/ui/fonts";

import { Metadata } from "next";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/app/ui/penerbitan-buku-logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Arunika Budi Agung Abadi",
    default: "Arunika Budi Agung Abadi",
  },
  description: "Website Arunika Budi Agung Abadi",
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
            <Logo />
          </Link>
        </section>
        <main className="px-14 lg:px-28 py-16">{children}</main>
      </body>
    </html>
  );
}
