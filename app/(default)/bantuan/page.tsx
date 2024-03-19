import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import Jumbotron from "@/app/ui/jumbotron";
import Faq from "@/app/ui/bantuan/faq";

export const metadata: Metadata = {
  title: "Bantuan",
};

export default async function Page() {
  return (
    <main id="content">
      <section>
        <Jumbotron
          judul="Bantuan Yang Anda Perlukan"
          deskripsi="Kami siap membantu Anda dalam menyelesaikan masalah yang Anda hadapi. Silahkan pilih FAQ yang sesuai dengan masalah Anda."
        />
      </section>
      <section className="px-14 lg:px-28 py-16">
        <div className="flex flex-col justify-center items-center px-8">
          <h2 className={`${lusitana.className} text-lg font-semibold`}>FAQ</h2>
          <p className="text-center text-sm font-light">
            Seluruh pertanyaan yang sering diajukan
          </p>
        </div>
        <div className="mt-4">
          <Faq />
        </div>
      </section>
    </main>
  );
}
