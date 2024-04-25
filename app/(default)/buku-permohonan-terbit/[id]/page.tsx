import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { BukuPenerbitanUserDetail } from "@/app/lib/definitions";
import { getDetailBukuPenerbitanUser } from "@/app/lib/data";
import ManagePenerbitanUser from "@/app/ui/buku-permohonan-terbit/managePenerbitanUser";

type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Buku Permohonan Terbit",
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

  const data: BukuPenerbitanUserDetail = await getDetailBukuPenerbitanUser(
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
        <ManagePenerbitanUser data={data} />
      </Suspense>
    </main>
  );
}
