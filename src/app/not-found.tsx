import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="rise-in font-mono text-sm tabular-nums text-ink-muted">404</p>
      <h1 className="type-h1 rise-in mt-3 max-w-2xl text-balance [--rise-delay:70ms]">This page wandered off</h1>
      <p className="type-body rise-in mt-4 text-ink-muted [--rise-delay:140ms]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
        you back on track.
      </p>
      <div className="rise-in mt-8 flex flex-wrap gap-3 [--rise-delay:210ms]">
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
