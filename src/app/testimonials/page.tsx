import { getTestimonials } from "@/lib/testimonials";
import { auth, signIn } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
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
        title="Testimonials"
        description="What managers, colleagues, mentors, and clients say about working with me."
      />

      {/* The proof comes first and gets the full width; the form follows. */}
      <Section labelledBy="published-title">
        <h2 id="published-title" className="sr-only">
          Published testimonials
        </h2>
        {testimonials.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id} className="min-w-0">
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface-quiet px-6 py-12 sm:px-10">
            <h3 className="type-h3">Testimonials are on their way</h3>
            <p className="type-body mt-2 text-ink-muted">
              I&apos;m currently collecting words from the managers, mentors, and teammates
              I&apos;ve worked with.
            </p>
          </div>
        )}
      </Section>

      <Section rule labelledBy="share-title" className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <h2 id="share-title" className="type-h2">
              Share your experience
            </h2>
            <p className="type-body mt-3 text-ink-muted">
              Your identity is verified through Google before publication. Only approved
              testimonials are published publicly.
            </p>
          </div>
          <TestimonialForm user={authedUser} signInAction={signInWithGoogle} />
        </div>
      </Section>
    </>
  );
}
