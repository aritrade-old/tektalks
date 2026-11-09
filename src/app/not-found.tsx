import { CtaLink } from "@/components/shared/CtaLink";
import { PageHero } from "@/components/shared/PageHero";
import { bookingCta } from "@/config/navigation";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page could not be found."
      description="The link may be outdated or the page may have moved. Head back to the homepage or book a discovery call."
      className="min-h-[70vh]"
    >
      <CtaLink href="/" size="lg">
        Back to home
      </CtaLink>
      <CtaLink href={bookingCta.href} size="lg" variant="outlineDark" icon="none">
        {bookingCta.label}
      </CtaLink>
    </PageHero>
  );
}
