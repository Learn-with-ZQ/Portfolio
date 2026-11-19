"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/app/admin/actions";

type Tone = "primary" | "neutral" | "danger";

const toneStyles: Record<Tone, string> = {
  primary: "btn-primary",
  neutral: "border border-rule-strong text-ink hover:border-ink hover:bg-surface",
  danger: "border border-error/60 text-error hover:bg-error/10",
};

interface ActionButtonProps {
  /** A server action with its arguments bound. */
  action: () => Promise<ActionState>;
  children: React.ReactNode;
  tone?: Tone;
  /**
   * Destructive actions take two clicks: the first arms the button and shows
   * this label; it disarms after 4 seconds or when focus leaves.
   */
  confirmLabel?: string;
}

export function ActionButton({ action, children, tone = "neutral", confirmLabel }: ActionButtonProps) {
  const [pending, startTransition] = useTransition();
  const [armed, setArmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => setArmed(false), 4000);
    return () => window.clearTimeout(timer);
  }, [armed]);

  function handleClick() {
    if (pending) return;
    if (confirmLabel && !armed) {
      setArmed(true);
      return;
    }
    setArmed(false);
    setError("");
    startTransition(async () => {
      const result = await action();
      if (result.error) setError(result.error);
    });
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleClick}
        onBlur={() => setArmed(false)}
        disabled={pending}
        aria-live="polite"
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors disabled:opacity-60",
          toneStyles[armed ? "danger" : tone],
          armed && "bg-error/10",
        )}
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : null}
        {armed ? confirmLabel : children}
      </button>
      {error ? (
        <span role="alert" className="text-xs text-error">
          {error}
        </span>
      ) : null}
    </span>
  );
}
