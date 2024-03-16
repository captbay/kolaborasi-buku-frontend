import React, { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

import { getFaq } from "@/app/lib/actions";
import { faqData } from "@/app/lib/definitions";
import EmptyData from "../emptyData";

export default async function faq() {
  const faq: faqData[] = await getFaq();

  if (faq.length < 1) {
    return (
      <section className="p-4">
        <EmptyData title="Belum ada Data" value="Tunggu Data nya ya!" />
      </section>
    );
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Accordion className="bg-white">
        {faq.map((faq, index) => (
          <AccordionPanel key={index} className="bg-white">
            <AccordionTitle className="bg-white focus:ring-primaryColor focus:ring-2 text-black">
              {faq.judul}
            </AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-sm font-light">{faq.answer}</p>
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </Suspense>
  );
}
