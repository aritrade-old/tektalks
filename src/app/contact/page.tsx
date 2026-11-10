import { ContactOptions } from "@/components/sections/ContactOptions";
import { FAQ } from "@/components/sections/FAQ";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact — Start a Business Development Conversation",
  description:
    "Contact RevEx Consultancy about B2B lead generation, outbound sales, appointment setting or go-to-market support. Send a business enquiry or book a 20-minute discovery call.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="dark relative isolate overflow-hidden bg-navy pt-36 pb-44 text-white sm:pt-44">
        <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden="true" className="glow-electric absolute -top-40 right-0 -z-10 size-[40rem] opacity-60" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-electric-300">
            <span aria-hidden="true" className="h-px w-6 bg-electric-300/60" />
            Contact
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s Explore How We Can Grow Together.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel">
            Tell us about your business, target customers and growth objectives. We&apos;ll explore whether
            RevEx is the right business development partner for you.
          </p>
        </div>
      </section>

      <section className="relative -mt-28 pb-24 sm:pb-32" aria-labelledby="contact-options-heading">
        <h2 id="contact-options-heading" className="sr-only">
          Ways to get in touch
        </h2>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ContactOptions />
        </div>
      </section>

      <FAQ />
    </>
  );
}
