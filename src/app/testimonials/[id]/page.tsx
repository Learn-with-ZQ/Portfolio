import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { getTestimonials } from "@/lib/testimonials";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Status } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Section } from "@/components/ui/section";

interface TestimonialDetailProps {
  params: Promise<{ id: string }>;
}

// Testimonials are read live from the sheet; allow ids not known at build time.
export const dynamicParams = true;

export async function generateStaticParams() {
  const testimonials = await getTestimonials();
  return testimonials.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: TestimonialDetailProps) {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((entry) => entry.id === id);
  return createPageMetadata({
    title: testimonial ? `${testimonial.name}'s Testimonial` : "Testimonial",
    description: testimonial?.subject ?? "Verified testimonial",
    path: `/testimonials/${id}`,
  });
}

export default async function TestimonialDetailPage({ params }: TestimonialDetailProps) {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((entry) => entry.id === id);
  if (!testimonial) notFound();
  const initials = testimonial.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <PageHeader
        title={testimonial.subject}
        description={`A recommendation from ${testimonial.name}.`}
        meta={
          <Link
            href="/testimonials"
            className="type-meta inline-flex min-h-9 items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All testimonials
          </Link>
        }
      />
      <Section>
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Rating value={testimonial.rating} size="md" />
            <Status tone="verified" emphasis>
              Verified via Google
            </Status>
            {testimonial.createdAt ? (
              <span className="type-meta text-ink-muted">Submitted {testimonial.createdAt}</span>
            ) : null}
          </div>

          <blockquote className="mt-8 border-l-2 border-verdigris pl-6">
            <p className="type-body text-ink">&ldquo;{testimonial.message}&rdquo;</p>
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            {testimonial.profileImageUrl ? (
              <span
                role="img"
                aria-label={`${testimonial.name}'s profile image`}
                className="h-12 w-12 shrink-0 rounded-full border border-rule bg-cover bg-center"
                style={{ backgroundImage: `url(${testimonial.profileImageUrl})` }}
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rule bg-surface font-semibold text-ink-muted"
              >
                {initials}
              </span>
            )}
            <p className="font-medium text-ink">{testimonial.name}</p>
          </div>

          {testimonial.referenceDocumentUrl ? (
            <a
              href={testimonial.referenceDocumentUrl}
              target="_blank"
              rel="noreferrer"
              className="link type-meta mt-6 inline-flex items-center gap-2 font-medium"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Reference document available
            </a>
          ) : null}
        </article>
      </Section>
    </>
  );
}
