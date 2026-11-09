import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/config/content";

export function FAQ() {
  return (
    <section className="bg-mist py-24 sm:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Questions, Answered."
          description="RevEx handles business development and customer acquisition. Specialised products and delivery services are provided by the respective partner companies."
          className="lg:sticky lg:top-32 lg:self-start"
        />
        <Accordion className="rounded-2xl border border-border bg-white px-2 sm:px-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border px-3">
              <AccordionTrigger className="py-5 text-base font-semibold text-navy hover:no-underline sm:text-[1.05rem]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-slate-ink">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
