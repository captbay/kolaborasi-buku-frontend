import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

import { getFaq } from "@/app/lib/actions";
import { faqData } from "@/app/lib/definitions";

export default async function faq() {
  const faq: faqData[] = await getFaq();

  return (
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
  );
}
