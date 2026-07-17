import type { Metadata } from "next";
import { MessageSquareQuote, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What managers, colleagues, mentors, and clients say about working with Muhammad Zaid Qasim.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kind Words"
        title="Testimonials"
        description="What managers, colleagues, mentors, and clients say about working with me."
      />
      <Section className="pt-0 sm:pt-0">
        {testimonials.length > 0 ? (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <StaggerItem
                key={testimonial.id}
                className="card-surface flex h-full flex-col rounded-2xl p-6 sm:p-8"
              >
                <Quote className="h-8 w-8 text-primary opacity-60" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </footer>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <div className="card-surface mx-auto flex max-w-xl flex-col items-center rounded-3xl px-6 py-16 text-center sm:px-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <MessageSquareQuote className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight">
                Testimonials are on their way
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                I&apos;m currently collecting words from the managers, mentors, and
                teammates I&apos;ve worked with. In the meantime, my work speaks for
                itself.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/projects">Browse My Projects</ButtonLink>
                <ButtonLink href="/experience" variant="outline">
                  See My Experience
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        )}
      </Section>
    </>
  );
}
