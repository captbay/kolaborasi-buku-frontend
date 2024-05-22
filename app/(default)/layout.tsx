import "./../ui/globals.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/navbar/navigation";
import Footer from "@/app/ui/footer";

import { Metadata } from "next";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body className={`${inter.className} antialiased`}>
        <ToastContainer position="bottom-right" />
        <NavBar />
        <section className="bg-primaryCard">{children}</section>
        <Footer />
      </body>
    </html>
  );
}
