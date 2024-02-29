import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

export default async function faq() {
  return (
    <Accordion>
      <AccordionPanel>
        <AccordionTitle>Apa Itu Pembelian Buku?</AccordionTitle>
        <AccordionContent>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Pembelian buku adalah proses pembelian buku yang dilakukan oleh
            pembeli. Pembeli dapat membeli buku dengan cara melakukan pembelian
          </p>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel>
        <AccordionTitle>Buku Apa Saja Dapat Dibeli?</AccordionTitle>
        <AccordionContent>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Pembeli dapat membeli buku apa saja yang tersedia di toko buku
            online kami. Pembeli dapat memilih buku yang diinginkan dan
            melakukan pembelian.
          </p>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel>
        <AccordionTitle>
          Apa Bedanya Dengan Membeli Buku Di Toko Buku Lain?
        </AccordionTitle>
        <AccordionContent>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Pembeli dapat membeli buku dengan harga yang lebih murah di toko
            buku online kami. Pembeli juga dapat membeli buku dengan mudah dan
            nyaman.
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
}
