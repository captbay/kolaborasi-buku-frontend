import "./../ui/globals.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/navbar/navigation";
import Footer from "@/app/ui/footer";

import { Metadata } from "next";

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
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        <div className="bg-primaryCard">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
