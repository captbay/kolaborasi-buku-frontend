import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { KoleksiBukuKolaborasiUser } from "@/app/lib/definitions";
import { getDetailKolaborasiUser } from "@/app/lib/data";
import ManageKolaborasiUser from "@/app/ui/kolaborasi-saya/manageKolaborasiUser";

type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Kolaborasi",
};

export default async function Page({ params }: Props) {
  const id = params.id;

  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  const { token, token_type } = cookie
    ? JSON.parse(cookie.value)
    : {
        token: null,
        token_type: null,
      };

  const data: KoleksiBukuKolaborasiUser = await getDetailKolaborasiUser(
    id,
    token,
    token_type
  );

  if (!data) {
    notFound();
  }

  return (
    <main id="content">
      <Suspense fallback={<p>Loading feed...</p>}>
        <ManageKolaborasiUser data={data} />
      </Suspense>
    </main>
  );
}
