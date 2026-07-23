import { MessageSquareQuote } from "lucide-react";
import { getTestimonials } from "@/lib/testimonials";
import { auth, signIn } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { Section } from "@/components/ui/section";

export const metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "What managers, colleagues, mentors, and clients say about working with Muhammad Zaid Qasim.",
  path: "/testimonials",
});

async function signInWithGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/testimonials" });
}

export default async function TestimonialsPage() {
  const [user, testimonials] = await Promise.all([
    auth().then((session) => session?.user),
    getTestimonials(),
  ]);
  const authedUser =
    user?.id && user.email
      ? {
          name: user.name?.trim() || user.email.split("@")[0],
          email: user.email,
          image: user.image,
        }
      : null;

  return (
    <>
      <PageHeader
        eyebrow="Kind Words"
        title="Testimonials"
        description="What managers, colleagues, mentors, and clients say about working with me."
      />
      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left: view testimonials — compact sidebar, scrolls internally when long */}
          <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1">
            {testimonials.length > 0 ? (
              <Stagger className="grid gap-6">
                {testimonials.map((testimonial) => (
                  <StaggerItem key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <div className="card-surface flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center sm:px-12">
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
            )}
          </div>

          {/* Right: give a testimonial */}
          <div>
            <TestimonialForm user={authedUser} signInAction={signInWithGoogle} />
          </div>
        </div>
      </Section>
    </>
  );
}
