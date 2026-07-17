import { ArrowRight, Mail } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CallToAction() {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border-strong px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-brand opacity-[0.07]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 h-56 w-[28rem] max-w-full -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "linear-gradient(120deg, var(--primary), var(--accent))" }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Have a project in mind? <span className="text-gradient">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m open to roles and collaborations where clean architecture,
              reliability, and real business value matter.
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
