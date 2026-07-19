import { LogIn, MessageSquareQuote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { auth } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "What managers, colleagues, mentors, and clients say about working with Muhammad Zaid Qasim.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const user = (await auth())?.user;
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
              <StaggerItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <div className="card-surface mx-auto flex max-w-xl flex-col items-center rounded-3xl px-6 py-16 text-center sm:px-12">
              <span className="bg-primary-soft text-primary flex h-14 w-14 items-center justify-center rounded-2xl">
                <MessageSquareQuote className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight">
                Testimonials are on their way
              </h2>
              <p className="text-muted mt-3 max-w-md text-base leading-relaxed">
                I&apos;m currently collecting words from the managers, mentors, and
                teammates I&apos;ve worked with.
              </p>
            </div>
          </Reveal>
        )}
      </Section>
      <Section className="pt-0">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            {user?.id && user.email ? (
              <TestimonialForm
                user={{
                  name: user.name?.trim() || user.email.split("@")[0],
                  email: user.email,
                  image: user.image,
                }}
              />
            ) : (
              <div className="card-surface flex flex-col items-start gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 className="text-xl font-bold">Worked with me?</h2>
                  <p className="text-muted mt-1">
                    Sign in with Google to leave a testimonial for review.
                  </p>
                </div>
                <ButtonLink href="/api/auth/signin?callbackUrl=%2Ftestimonials">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Sign in with Google
                </ButtonLink>
              </div>
            )}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
