import { Metadata } from "next";
import Faq from "@/app/ui/bantuan/faq";

export const metadata: Metadata = {
  title: "Login",
};
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Faq />
    </div>
  );
}
