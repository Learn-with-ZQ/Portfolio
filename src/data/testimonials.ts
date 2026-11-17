import type { Testimonial } from "@/types";

/**
 * Fallback testimonials.
 *
 * The site normally reads approved testimonials from the Portfolio API
 * (database table PRT_Testimonial; see src/lib/testimonials.ts). This array is
 * used only when PORTFOLIO_API_URL is unset, the API can't be reached, or it
 * has no approved testimonials.
 *
 * To publish a testimonial, approve it in the database
 * (SELECT prt_testimonial_set_status(<id>, 'Approved')) — no code change
 * needed. Add entries here only as an offline fallback.
 *
 * Fields: name, subject, message, rating (1-5), createdAt (any text),
 * referenceDocumentUrl (optional; a Drive file must be shared "anyone with the
 * link"), profileImageUrl (optional; falls back to initials).
 *
 * Example entry:
 *   {
 *     id: "jane-doe",              // becomes /testimonials/<id>, must be unique
 *     name: "Jane Doe",
 *     subject: "Project collaboration",
 *     message: "Zaid delivered our platform ahead of schedule…",
 *     rating: 5,
 *     createdAt: "July 2026",
 *     verificationStatus: "Verified",
 *   },
 */
export const testimonials: Testimonial[] = [];
