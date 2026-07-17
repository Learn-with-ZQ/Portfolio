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
    <div className="bg-grid flex min-h-[70vh] items-center pt-16">
      <Container className="py-20 text-center">
        <p className="text-gradient font-mono text-6xl font-bold">Oops</p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          An unexpected error occurred while rendering this page. Try again — if it
          keeps happening, please let me know.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      </Container>
    </div>
  );
}
