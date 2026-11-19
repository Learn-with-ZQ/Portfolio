import type { MyTestimonial, Testimonial, TestimonialStatus } from "@/types";
import { testimonials as manualTestimonials } from "@/data/testimonials";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";

/**
 * Testimonials live in the Portfolio database (since 2026-11-17; a Google Sheet
 * before). The API's `GET /api/testimonials` returns approved ones with public
 * fields only (never email, phone or Google id).
 *
 * The list is cached for 10 minutes, so a newly approved testimonial appears
 * within 10 minutes. If the API is unset or unreachable, the page falls back to
 * src/data/testimonials.ts (empty by default).
 */
const LIST_REVALIDATE_SECONDS = 600;
const TIMEOUT_MS = 5000;

interface ApiTestimonial {
  id?: string;
  name?: string;
  subject?: string;
  message?: string;
  rating?: number | string;
  createdAt?: string;
  referenceDocumentUrl?: string | null;
  profileImageUrl?: string | null;
}

function toRating(value: unknown): 1 | 2 | 3 | 4 | 5 {
  const n = Math.round(Number(value));
  if (n >= 1 && n <= 5) return n as 1 | 2 | 3 | 4 | 5;
  return 5;
}

function optional(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalize(rows: ApiTestimonial[]): Testimonial[] {
  return rows
    .filter((r) => r && r.name && r.message)
    .map((r, i) => ({
      id: (r.id && String(r.id).trim()) || `testimonial-${i + 1}`,
      name: String(r.name).trim(),
      subject: r.subject ? String(r.subject).trim() : "Testimonial",
      message: String(r.message).trim(),
      rating: toRating(r.rating),
      createdAt: optional(r.createdAt),
      referenceDocumentUrl: optional(r.referenceDocumentUrl),
      profileImageUrl: optional(r.profileImageUrl),
      verificationStatus: "Verified",
    }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!PORTFOLIO_API_BASE) return manualTestimonials;

  try {
    const res = await fetch(`${PORTFOLIO_API_BASE}/api/testimonials`, {
      headers: { Accept: "application/json" },
      next: { revalidate: LIST_REVALIDATE_SECONDS, tags: ["testimonials"] },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return manualTestimonials;

    const data = (await res.json()) as unknown;
    const live = normalize(Array.isArray(data) ? (data as ApiTestimonial[]) : []);
    return live.length > 0 ? live : manualTestimonials;
  } catch {
    // API down, slow, or answering with something unexpected.
    return manualTestimonials;
  }
}

/** What loading the signed-in visitor's own testimonial came to. */
export type MyTestimonialResult =
  | { kind: "found"; testimonial: MyTestimonial }
  | { kind: "none" }
  /** The API rejected the Google token: the visitor must sign in again. */
  | { kind: "reauth" }
  /** The API is unset, down, or answered something unexpected. */
  | { kind: "unavailable" };

const STATUSES: TestimonialStatus[] = ["Pending", "Approved", "Rejected"];

/** Shapes the API's MyTestimonial JSON; null if it isn't one. */
export function toMyTestimonial(data: unknown): MyTestimonial | null {
  if (typeof data !== "object" || data === null) return null;
  const r = data as Record<string, unknown>;
  if (
    typeof r.id !== "string" ||
    typeof r.name !== "string" ||
    typeof r.message !== "string" ||
    !STATUSES.includes(r.status as TestimonialStatus)
  )
    return null;

  return {
    id: r.id,
    name: r.name,
    email: typeof r.email === "string" ? r.email : "",
    phone: typeof r.phone === "string" ? r.phone : "",
    subject: typeof r.subject === "string" ? r.subject : "",
    message: r.message,
    rating: toRating(r.rating),
    profileImageUrl: optional(r.profileImageUrl),
    documentName: optional(r.documentName),
    status: r.status as TestimonialStatus,
    updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : "",
  };
}

/**
 * The signed-in visitor's own testimonial, read fresh (never cached) with
 * their Google ID token as the bearer token.
 */
export async function getMyTestimonial(visitorToken: string): Promise<MyTestimonialResult> {
  if (!PORTFOLIO_API_BASE) return { kind: "unavailable" };

  try {
    const res = await fetch(`${PORTFOLIO_API_BASE}/api/testimonials/mine`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${visitorToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 404) return { kind: "none" };
    if (res.status === 401) return { kind: "reauth" };
    if (!res.ok) return { kind: "unavailable" };

    const testimonial = toMyTestimonial(await res.json());
    return testimonial ? { kind: "found", testimonial } : { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
}
