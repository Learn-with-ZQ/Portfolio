import Link from "next/link";
import { BadgeCheck, ChevronRight, Paperclip, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <Card className="group flex h-full flex-col p-6 sm:p-8">
      <div className="flex items-center gap-3">
        {testimonial.profileImageUrl ? (
          <span
            role="img"
            aria-label={`${testimonial.name}'s profile image`}
            className="h-11 w-11 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${testimonial.profileImageUrl})` }}
          />
        ) : (
          <span className="bg-primary-soft text-primary flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold">{testimonial.name}</p>
          <Badge className="mt-1">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verified
          </Badge>
        </div>
      </div>
      <p className="mt-6 text-lg font-semibold">{testimonial.subject}</p>
      <div
        className="mt-2 flex items-center gap-1"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={
              index < testimonial.rating
                ? "h-4 w-4 fill-amber-400 text-amber-400"
                : "text-border h-4 w-4"
            }
            aria-hidden="true"
          />
        ))}
        <span className="text-muted ml-1 text-sm">{testimonial.rating}/5</span>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          href={`/testimonials/${testimonial.id}`}
          className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Read testimonial{" "}
          <ChevronRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        {testimonial.referenceDocumentUrl && (
          <span
            className="text-muted inline-flex items-center gap-1 text-xs"
            title="Reference document attached"
          >
            <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
            Reference
          </span>
        )}
      </div>
    </Card>
  );
}
