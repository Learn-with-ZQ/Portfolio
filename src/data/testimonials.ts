import type { Testimonial } from "@/types";

/**
 * Fallback testimonials.
 *
 * The site normally reads approved testimonials live from the "Portfolio
 * Testimonials" Google Sheet (see src/lib/testimonials.ts). This array is used
 * only when TESTIMONIAL_WEBHOOK_URL is unset, the sheet can't be reached, or it
 * returns no approved rows.
 *
 * To publish a testimonial, set its Approval Status to "Approved" in the
 * sheet — no code change needed. Add entries here only as an offline fallback.
 *
 * Field mapping (Sheet column -> field):
 *   Name              -> name
 *   Subject           -> subject
 *   Message           -> message
 *   Rating            -> rating (1-5)
 *   Timestamp         -> createdAt (format however you like)
 *   Uploaded File URL -> referenceDocumentUrl (optional; the Drive file must be
 *                        shared "anyone with the link" to be viewable)
 *   Profile picture   -> profileImageUrl (optional; falls back to initials)
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
