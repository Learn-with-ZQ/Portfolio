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
        "inline-flex items-center rounded-md border border-rule px-2 py-0.5 text-[0.8125rem] leading-5 text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type StatusTone = "verified" | "pending" | "neutral";

const dotStyles: Record<StatusTone, string> = {
  verified: "bg-primary",
  pending: "bg-pending",
  neutral: "bg-ink-muted",
};

const emphasisStyles: Record<StatusTone, string> = {
  verified: "text-primary",
  pending: "text-pending-text",
  neutral: "text-ink",
};

interface StatusProps {
  /** verified = shipped / completed / live; pending = in progress; neutral = everything else. */
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
