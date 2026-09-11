"use client";

import { RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="type-h1 max-w-2xl text-balance">Something went wrong</h1>
      <p className="type-body mt-4 text-ink-muted">
        An unexpected error occurred while rendering this page. Try again — if it keeps
        happening, please let me know.
      </p>
      <Button size="lg" onClick={reset} className="mt-8">
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    </Container>
  );
}
