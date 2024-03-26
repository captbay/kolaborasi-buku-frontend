import UserForm from "@/app/ui/profile/crud-user-form";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { User } from "@/app/lib/definitions";
import { getUser } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Edit Profile",
};
export default async function LoginPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, id, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        id: null,
        token_type: null,
      };
  const user: User = await getUser(id, token, token_type);

  return <UserForm data={user} />;
}
