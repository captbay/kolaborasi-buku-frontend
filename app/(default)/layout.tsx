import "./../ui/globals.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/navigation";
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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        <div className="p-6 md:p-12 bg-primaryCard">{children} 1</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        <div className="p-6 md:p-12 bg-primaryCard">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
