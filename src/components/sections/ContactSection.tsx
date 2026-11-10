import { ContactOptions } from "@/components/sections/ContactOptions";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-24 sm:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact Us"
          title="Let's Explore How We Can Grow Together."
          description="Book a 20-minute discovery call, email us, or tell us about your business, target customers and growth objectives below."
          className="mb-14"
        />
        <ContactOptions />
      </div>
    </section>
  );
}
