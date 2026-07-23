import type { Testimonial } from "@/types";

/**
 * Approved testimonials shown publicly on the site.
 *
 * IMPORTANT: the site renders ONLY this array — it does NOT read the Google
 * Sheet. Deleting rows in the sheet has no effect here, and adding an entry
 * here is what makes a testimonial appear on the site.
 *
 * Workflow: submissions land in the "Portfolio Testimonials" Google Sheet with
 * Approval Status = Pending. To publish one, review it, then add an entry below.
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
