import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="font-mono text-sm tabular-nums text-ink-muted">404</p>
      <h1 className="type-h1 mt-3 max-w-2xl text-balance">This page wandered off</h1>
      <p className="type-body mt-4 text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
        you back on track.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" size="lg">
          Back home
        </ButtonLink>
        <ButtonLink href="/projects" variant="secondary" size="lg">
          Explore projects
        </ButtonLink>
      </div>
    </Container>
  );
}
