import UserForm from "@/app/ui/profile/crud-user-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
};
export default function LoginPage() {
  return <UserForm />;
}
