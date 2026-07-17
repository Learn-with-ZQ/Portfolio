import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="bg-grid flex min-h-[70vh] items-center pt-16">
      <Container className="py-20 text-center">
        <p className="text-gradient font-mono text-7xl font-bold sm:text-8xl">404</p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          This page wandered off
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-gradient-brand inline-flex h-12 items-center gap-2 rounded-full px-8 text-base font-medium text-white transition-all hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-8 text-base font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Explore Projects
          </Link>
        </div>
      </Container>
    </div>
  );
}
