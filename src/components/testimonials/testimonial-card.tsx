import Link from "next/link";
import { Paperclip } from "lucide-react";
import type { Testimonial } from "@/types";
import { Status } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="surface reveal flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Rating value={testimonial.rating} />
        <Status tone="verified" emphasis>
          Verified
        </Status>
      </div>

      <div className="mt-5 flex-1">
        <h3 className="type-h3">{testimonial.subject}</h3>
        <blockquote className="mt-3">
          <p className="type-body line-clamp-5 text-ink-muted">
            &ldquo;{testimonial.message}&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-rule pt-5">
        {testimonial.profileImageUrl ? (
          <span
            role="img"
            aria-label={`${testimonial.name}'s profile image`}
            className="h-10 w-10 shrink-0 rounded-full border border-rule bg-cover bg-center"
            style={{ backgroundImage: `url(${testimonial.profileImageUrl})` }}
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule bg-surface text-sm font-semibold text-ink-muted"
          >
            {initialsOf(testimonial.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{testimonial.name}</p>
          {testimonial.createdAt ? (
            <p className="type-meta text-ink-muted">{testimonial.createdAt}</p>
          ) : null}
        </div>
      </div>

      <div className="type-meta mt-4 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/testimonials/${testimonial.id}`} className="link font-medium">
          Read full testimonial
          <span className="sr-only"> from {testimonial.name}</span>
        </Link>
        {testimonial.referenceDocumentUrl ? (
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
            Reference attached
          </span>
        ) : null}
      </div>
    </article>
  );
}
