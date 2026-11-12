import { Mail } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export function CallToAction() {
  return (
    <Section rule labelledBy="cta-title" className="bg-surface">
      <div className="reveal mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 id="cta-title" className="type-h2 text-balance">
          Let&apos;s design the next chapter of your product.
        </h2>
        <p className="type-body mt-4 text-ink-muted">
          I&apos;m available for product engineering, thoughtful collaboration, and polished
          digital experiences that perform well in the real world.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact" size="lg">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Get in touch
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">
            What I offer
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
