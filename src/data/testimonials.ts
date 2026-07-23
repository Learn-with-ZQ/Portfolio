import type { Testimonial } from "@/types";

/**
 * Approved testimonials shown publicly on the site.
 *
 * Workflow: submissions land in the "Portfolio Testimonials" Google Sheet with
 * Approval Status = Pending. To publish one, review it, then copy its row into
 * an entry below. Only entries in THIS array appear on the site — the page does
 * not read the sheet directly (static generation, no exposed sheet API).
 *
 * Field mapping (Sheet column -> field):
 *   Name            -> name
 *   Subject         -> subject
 *   Message         -> message
 *   Rating          -> rating (1-5)
 *   Timestamp       -> createdAt (format however you like)
 *   Uploaded File URL -> referenceDocumentUrl (optional; the Drive file must be
 *                        shared "anyone with the link" to be viewable)
 *   Profile picture -> profileImageUrl (optional; falls back to initials)
 *
 * The entries below are the currently-approved rows from your sheet. They look
 * like test submissions — replace them with real testimonials when you have them.
 */
export const testimonials: Testimonial[] = [
  {
    id: "mzq-review",
    name: "Muhammad Zaid Qasim",
    subject: "Review",
    message: "testimonial Message for m.zq",
    rating: 5,
    createdAt: "July 19, 2026",
    verificationStatus: "Verified",
    // referenceDocumentUrl: "https://drive.google.com/file/d/1hSH-.../view",
  },
  {
    id: "mzq-reference-1",
    name: "Muhammad Zaid Qasim",
    subject: "Subject",
    message: "Upload reference letter",
    rating: 5,
    createdAt: "July 19, 2026",
    verificationStatus: "Verified",
  },
  {
    id: "mzq-reference-2",
    name: "Muhammad Zaid Qasim",
    subject: "Subject",
    message: "Reference letter",
    rating: 5,
    createdAt: "July 19, 2026",
    verificationStatus: "Verified",
  },
];
