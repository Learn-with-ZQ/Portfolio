import { notFound } from "next/navigation";
import { BadgeCheck, FileText, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

interface TestimonialDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return testimonials.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: TestimonialDetailProps) {
  const { id } = await params;
  const testimonial = testimonials.find((entry) => entry.id === id);
  return createPageMetadata({
    title: testimonial ? `${testimonial.name}'s Testimonial` : "Testimonial",
    description: testimonial?.subject ?? "Verified testimonial",
    path: `/testimonials/${id}`,
  });
}

export default async function TestimonialDetailPage({ params }: TestimonialDetailProps) {
  const { id } = await params;
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
        eyebrow="Verified testimonial"
        title={testimonial.subject}
        description={`A recommendation from ${testimonial.name}.`}
      />
      <Section className="pt-0">
        <Card className="mx-auto max-w-3xl p-6 sm:p-10">
          <div className="flex items-center gap-4">
            {testimonial.profileImageUrl ? (
              <span
                role="img"
                aria-label={`${testimonial.name}'s profile image`}
                className="h-14 w-14 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${testimonial.profileImageUrl})` }}
              />
            ) : (
              <span className="bg-primary-soft text-primary flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold">
                {initials}
              </span>
            )}
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <Badge className="mt-1">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Verified via Google
              </Badge>
            </div>
          </div>
          <div
            className="mt-7 flex items-center gap-1"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={
                  index < testimonial.rating
                    ? "h-5 w-5 fill-amber-400 text-amber-400"
                    : "text-border h-5 w-5"
                }
                aria-hidden="true"
              />
            ))}
            <span className="text-muted ml-2 text-sm">{testimonial.rating}/5</span>
          </div>
          <blockquote className="text-muted mt-7 text-lg leading-relaxed">
            &ldquo;{testimonial.message}&rdquo;
          </blockquote>
          {testimonial.createdAt && (
            <p className="text-muted mt-6 text-sm">Submitted {testimonial.createdAt}</p>
          )}
          {testimonial.referenceDocumentUrl && (
            <a
              href={testimonial.referenceDocumentUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Reference document available
            </a>
          )}
          <div className="mt-8">
            <ButtonLink href="/testimonials" variant="outline">
              Back to testimonials
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </>
  );
}
