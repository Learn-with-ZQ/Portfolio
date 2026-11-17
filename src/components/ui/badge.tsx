import type { StatusTone } from "@/types";
import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

/** A neutral tag — technologies, coursework, skills. Never carries status colour. */
export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        // No `whitespace-nowrap`: long labels must be able to wrap (UI.md R7).
        // 14px (was 13px — audit A5).
        "inline-flex items-center rounded-md border border-rule px-2 py-0.5 text-sm leading-5 text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Status never uses `primary`: gold means "you can act on this" (UI.md §3).
const dotStyles: Record<StatusTone, string> = {
  verified: "bg-live",
  pending: "bg-pending",
  research: "bg-research",
  neutral: "bg-ink-muted",
};

const emphasisStyles: Record<StatusTone, string> = {
  verified: "text-live",
  pending: "text-pending-text",
  research: "text-research",
  neutral: "text-ink",
};

interface StatusProps {
  /** verified = shipped / completed / live (green); pending = in progress (amber);
   *  research = AI, data science, research (violet); neutral = everything else. */
  tone?: StatusTone;
  /** Colour the label too, not just the dot. Use sparingly. */
  emphasis?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** A status label. The text carries the meaning; the dot only reinforces it. */
export function Status({ tone = "neutral", emphasis = false, className, children }: StatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm leading-5",
        emphasis ? cn("font-medium", emphasisStyles[tone]) : "text-ink-muted",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", dotStyles[tone])} />
      {children}
    </span>
  );
}
