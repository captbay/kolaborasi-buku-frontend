import { Metadata } from "next";
import SidebarProfile from "@/app/ui/sidebar-profile/sidebar";
import { Suspense } from "react";
import { getUser } from "@/app/lib/data";
import { cookies } from "next/headers";
import { User } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: {
    template: "%s | Penerbitan Buku",
    default: "Profil Penerbitan Buku",
  },
  description: "Website Penerbitan Buku",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <main id="content">
      <section className="flex flex-col lg:flex-row gap-8 px-14 lg:px-28 py-16">
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <SidebarProfile
              message={user.message}
              fotoProfil={user.foto_profil}
              namaLengkap={user.nama_lengkap}
              role={user.role}
              email={user.email}
            />
          </Suspense>
        </section>
        <section className="w-full rounded-md bg-whiteColor h-fit">
          {children}
        </section>
      </section>
    </main>
  );
}
