import Logo from "@/app/ui/penerbitan-buku-logo";
import LoginForm from "@/app/ui/login/login-form";
import Image from "next/image";
import BackgroundLogin from "./../background_login.jpg";

import "../ui/globals.css";
import { inter } from "@/app/ui/fonts";
import Nav from "@/app/ui/navbar/navigation";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Arunika Budi Agung Abadi",
    default: "Arunika Budi Agung Abadi",
  },
  description: "Website Arunika Budi Agung Abadi",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ToastContainer position="bottom-right" />
        <main className="min-w-screen min-h-screen lg:static lg:flex overflow-y-auto">
          <section className="w-full">
            <figure className="w-full h-full items-center justify-center lg:static absolute z-10">
              <Image
                src={BackgroundLogin}
                alt="Book Images"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              ></Image>
            </figure>
          </section>
          <section className="lg:mx-28 my-2 md:my-auto lg:flex lg:items-center lg:justify-center lg:align-middle">
            <div className="w-full h-full absolute lg:static z-20 my-auto">
              <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
