import Logo from "@/app/ui/penerbitan-buku-logo";
import LoginForm from "@/app/ui/login/login-form";
import Image from "next/image";
import BackgroundLogin from "./../background_login.jpg";

import "../ui/globals.css";
import { inter } from "@/app/ui/fonts";
import Nav from "@/app/ui/navbar/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Penerbitan Buku",
    default: "Penerbitan Buku",
  },
  description: "Website Penerbitan Buku",
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
        <main className="min-w-screen min-h-screen relative lg:static lg:flex lg:flex-row lg:justify-around">
          <section>
            <figure className="w-full h-screen items-center justify-center lg:static absolute z-10">
              <Image
                src={BackgroundLogin}
                alt="Book Images"
                width={1000}
                height={1000}
                className="w-full h-screen lg:h-full object-cover"
              ></Image>
            </figure>
          </section>
          <section>
            <div className="w-full h-screen flex items-center justify-center align-middle absolute lg:static z-20 my-auto">
              <div>{children}</div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
