/**
 * Base URL of the Portfolio API (ASP.NET Core + PostgreSQL on the Oracle VM,
 * `D:\API\Portfolio`), from `PORTFOLIO_API_URL`, without a trailing slash; null
 * when unset. Server-side only.
 *
 * Used for the site's content (`lib/content.ts`), the public testimonial list
 * (`lib/testimonials.ts`), and the two writes: contact messages
 * (`/api/contact` → `POST /api/messages`, with `PORTFOLIO_API_SITE_KEY`) and
 * testimonials (`/api/testimonials` → `PUT /api/testimonials/mine`, with the
 * visitor's Google ID token).
 */
export const PORTFOLIO_API_BASE: string | null =
  process.env.PORTFOLIO_API_URL?.trim().replace(/\/+$/, "") || null;
