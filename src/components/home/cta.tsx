import { Mail } from "lucide-react";
import { closingCall } from "@/data/home";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

/** The closing call to action: dark in both themes, copy in data/home.ts. */
export function CallToAction() {
  return (
    <Section rule labelledBy="cta-title" className="band-dark">
      <div className="reveal mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 id="cta-title" className="type-h2 text-balance">
          {closingCall.title}
        </h2>
        <p className="type-body mt-4 text-ink-muted">{closingCall.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={closingCall.primary.href} size="lg">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {closingCall.primary.label}
          </ButtonLink>
          <ButtonLink href={closingCall.secondary.href} variant="secondary" size="lg">
            {closingCall.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
