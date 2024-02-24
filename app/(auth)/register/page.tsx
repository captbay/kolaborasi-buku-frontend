import RegisterForm from "@/app/ui/register/register-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function LoginPage() {
  return <RegisterForm />;
}
