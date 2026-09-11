import { ArrowRight, Mail } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CallToAction() {
  return (
    <Section>
      <Reveal>
        <div className="page-shell relative overflow-hidden rounded-[2.2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">
              Ready to build something memorable?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              Let&apos;s design the next chapter of your product.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m available for product engineering, thoughtful collaboration, and polished digital experiences that perform well in the real world.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact" size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get In Touch
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="lg">
                What I Offer
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
