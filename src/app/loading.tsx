import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading page">
      <Container className="py-24">
        {/* Brass: in progress. Stops moving under reduced motion. */}
        <div className="h-0.5 w-48 overflow-hidden rounded-full bg-rule">
          <div className="loading-bar h-full w-1/3 rounded-full bg-brass" />
        </div>
        <p className="type-meta mt-4 text-ink-muted">Loading…</p>
      </Container>
    </div>
  );
}
