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
      <h1 className="type-h1 rise-in max-w-2xl text-balance">Something went wrong</h1>
      <p className="type-body rise-in mt-4 text-ink-muted [--rise-delay:80ms]">
        An unexpected error occurred while rendering this page. Try again — if it keeps
        happening, please let me know.
      </p>
      <Button size="lg" onClick={reset} className="rise-in mt-8 [--rise-delay:160ms]">
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    </Container>
  );
}
