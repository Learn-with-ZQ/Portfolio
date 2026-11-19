import { headers } from "next/headers";
import type { MyTestimonial } from "@/types";
import { getMyTestimonial, getTestimonials } from "@/lib/testimonials";
import { getVisitorToken, hasFreshVisitorToken } from "@/lib/visitor-token";
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

  // A signed-in visitor sees their own testimonial, read with their Google ID
  // token. The token lasts an hour while the session lasts weeks, so a stale
  // (or pre-2026-11-17) session asks them to sign in again instead.
  let existing: MyTestimonial | null = null;
  let needsReauth = false;
  let loadFailed = false;
  if (authedUser) {
    const visitorToken = hasFreshVisitorToken(user?.visitorTokenExpiresAt)
      ? await getVisitorToken(await headers())
      : null;
    if (!visitorToken) {
      needsReauth = true;
    } else {
      const mine = await getMyTestimonial(visitorToken);
      if (mine.kind === "found") existing = mine.testimonial;
      else if (mine.kind === "reauth") needsReauth = true;
      else if (mine.kind === "unavailable") loadFailed = true;
    }
  }

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
          // Mostly seen by people who were sent this link to write one, so the
          // empty state points them at the form.
          <div className="surface-quiet reveal px-6 py-12 sm:px-10">
            <h3 className="type-h3">No testimonials published yet</h3>
            <p className="type-body mt-2 text-ink-muted">
              If we&apos;ve worked together, you can{" "}
              <a href="#share-title" className="link">
                add yours below
              </a>
              . It&apos;s published once your Google sign-in is verified and I&apos;ve approved
              it.
            </p>
          </div>
        )}
      </Section>

      <Section rule labelledBy="share-title" className="bg-surface">
        <div className="reveal grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <h2 id="share-title" className="type-h2">
              Share your experience
            </h2>
            <p className="type-body mt-3 text-ink-muted">
              Your identity is verified through Google before publication. Only approved
              testimonials are published, and you can come back to edit yours.
            </p>
          </div>
          <TestimonialForm
            user={authedUser}
            signInAction={signInWithGoogle}
            existing={existing}
            needsReauth={needsReauth}
            loadFailed={loadFailed}
          />
        </div>
      </Section>
    </>
  );
}
