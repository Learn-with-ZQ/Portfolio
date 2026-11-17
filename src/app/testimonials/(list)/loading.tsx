import { Container } from "@/components/ui/container";

/**
 * Only the testimonials list renders on request (it reads the Google
 * session), so only it gets a loading state. A `loading.tsx` wraps every page
 * below it in a Suspense boundary:
 * - in `app/`, every static page's prerendered HTML shipped this fallback in
 *   <main>, with the real content hidden until a script swapped it in
 *   (found 2026-11-16);
 * - in `testimonials/`, it also wrapped `testimonials/[id]`, so a missing
 *   testimonial streamed its not-found page with HTTP 200 instead of 404
 *   (fixed 2026-11-18).
 * Hence the `(list)` route group: it holds only the list page and this file,
 * and doesn't change the URL.
 */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading page">
      <Container className="py-24">
        {/* Pending (amber): in progress. Stops moving under reduced motion. */}
        <div className="h-0.5 w-48 overflow-hidden rounded-full bg-rule">
          <div className="loading-bar h-full w-1/3 rounded-full bg-pending" />
        </div>
        <p className="type-meta mt-4 text-ink-muted">Loading…</p>
      </Container>
    </div>
  );
}
