import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import Jumbotron from "@/app/ui/jumbotron";
import HubungiKamiPage from "@/app/ui/hubungi-kami/hubungiKamiPage";

export const metadata: Metadata = {
  title: "Hubungi Kami",
};

export default async function Page() {
  return (
    <main id="content">
      <section>
        <Jumbotron
          judul="Hubungi Kami"
          deskripsi="Kami siap membantu Anda dalam menyelesaikan masalah yang Anda hadapi. Silahkan isi form di bawah ini untuk menghubungi kami"
        />
      </section>
      <section className="flex flex-col lg:flex-row lg:justify-between px-14 lg:px-28 py-16">
        <div className="py-8 lg:py-16 px-4 w-full max-w-screen-md">
          <HubungiKamiPage />
        </div>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <div className="space-y-8">
            <div>
              <h2 className={`${lusitana.className} text-lg font-semibold`}>
                Alamat
              </h2>
              <p className="text-sm font-light">
                Jl. Raya Bogor KM 26, RT.3/RW.8, Cimanggis, Kec. Cimanggis, Kota
                Depok, Jawa Barat 16452
              </p>
            </div>
            <div>
              <h2 className={`${lusitana.className} text-lg font-semibold`}>
                Email
              </h2>
              <p className="text-sm font-light">penerbitanbuku@gmail.com</p>
            </div>
            <div>
              <h2 className={`${lusitana.className} text-lg font-semibold`}>
                Telepon
              </h2>
              <p className="text-sm font-light">021-87654321</p>
            </div>
            <div>
              <h2 className={`${lusitana.className} text-lg font-semibold`}>
                Peta Lokasi
              </h2>
              {/* embed maps */}
              <iframe
                className="w-full h-96 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15813.16860370774!2d110.38897544145586!3d-7.758808217890051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59a17e4e49eb%3A0xa864a4f7fe95e090!2sPakuwon%20Mall%20Jogja!5e0!3m2!1sen!2sid!4v1709903007294!5m2!1sen!2sid"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
