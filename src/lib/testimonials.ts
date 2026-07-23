import type { Testimonial } from "@/types";
import { testimonials as manualTestimonials } from "@/data/testimonials";

/**
 * Live testimonials come from the "Portfolio Testimonials" Google Sheet via the
 * Apps Script web app's doGet endpoint (same URL as the POST webhook). Only rows
 * with Approval Status = "Approved" are returned, and only public-safe fields
 * (never email / phone / user id).
 *
 * If the endpoint is unset or unreachable, we fall back to the manual list in
 * src/data/testimonials.ts (empty by default).
 */

interface SheetTestimonial {
  id?: string;
  name?: string;
  subject?: string;
  message?: string;
  rating?: number | string;
  createdAt?: string;
  referenceDocumentUrl?: string;
  profileImageUrl?: string;
}

function toRating(value: unknown): 1 | 2 | 3 | 4 | 5 {
  const n = Math.round(Number(value));
  if (n >= 1 && n <= 5) return n as 1 | 2 | 3 | 4 | 5;
  return 5;
}

function normalize(rows: SheetTestimonial[]): Testimonial[] {
  return rows
    .filter((r) => r && r.name && r.message)
    .map((r, i) => ({
      id: (r.id && String(r.id).trim()) || `testimonial-${i + 1}`,
      name: String(r.name).trim(),
      subject: r.subject ? String(r.subject).trim() : "Testimonial",
      message: String(r.message).trim(),
      rating: toRating(r.rating),
      createdAt: r.createdAt ? String(r.createdAt).trim() : undefined,
      referenceDocumentUrl:
        r.referenceDocumentUrl && String(r.referenceDocumentUrl).trim()
          ? String(r.referenceDocumentUrl).trim()
          : undefined,
      profileImageUrl:
        r.profileImageUrl && String(r.profileImageUrl).trim()
          ? String(r.profileImageUrl).trim()
          : undefined,
      verificationStatus: "Verified",
    }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const url = process.env.TESTIMONIAL_WEBHOOK_URL;
  if (!url) return manualTestimonials;

  try {
    const res = await fetch(url, {
      // Re-fetch from the sheet at most once a minute (ISR).
      next: { revalidate: 60 },
      redirect: "follow",
    });
    if (!res.ok) return manualTestimonials;

    const data = (await res.json()) as unknown;
    const rows: SheetTestimonial[] = Array.isArray(data)
      ? (data as SheetTestimonial[])
      : Array.isArray((data as { testimonials?: unknown })?.testimonials)
        ? (data as { testimonials: SheetTestimonial[] }).testimonials
        : [];

    const live = normalize(rows);
    return live.length > 0 ? live : manualTestimonials;
  } catch {
    // Endpoint not deployed yet, non-JSON response, or network error.
    return manualTestimonials;
  }
}
