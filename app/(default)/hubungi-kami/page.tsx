import { lusitana } from "@/app/ui/fonts";

import { Metadata } from "next";
import Jumbotron from "@/app/ui/jumbotron";
import { Button } from "@/app/ui/button";

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
      <section className="flex flex-col md:flex-row md:justify-between px-14 md:px-28 py-16">
        <div className="py-8 lg:py-16 px-4 w-full max-w-screen-md">
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email Anda
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subjek
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Beritahu Kami Tentang Ketertarikan Anda"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Pesan Anda
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Berikan Commentar..."
              ></textarea>
            </div>
            <Button type="submit">Kirim</Button>
          </form>
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
