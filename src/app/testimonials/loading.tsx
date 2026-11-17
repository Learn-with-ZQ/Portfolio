import { Container } from "@/components/ui/container";

/**
 * Only this route renders on request (it reads the Google session), so
 * only it gets a loading state. Don't move this back to `app/`: a root
 * `loading.tsx` wraps every page in a Suspense boundary, and the prerendered
 * HTML of every static page then ships this fallback in <main> with the real
 * content in a hidden block that a script swaps in (found 2026-11-16).
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
