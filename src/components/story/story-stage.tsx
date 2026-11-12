import { cn } from "@/lib/utils";

interface StoryStageProps {
  /** Summary for assistive tech; the diagram's parts are presentational. */
  label: string;
  caption: string;
  step: number;
  count: number;
  className?: string;
  children: React.ReactNode;
}

const pad = (value: number) => String(value).padStart(2, "0");

/** The pinned diagram panel of a story chapter. */
export function StoryStage({ label, caption, step, count, className, children }: StoryStageProps) {
  return (
    <div role="img" aria-label={label} className={cn("schematic w-full p-4 sm:p-5 lg:p-6", className)}>
      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
        <p className="text-sm font-semibold text-ink">{caption}</p>
        <p className="font-mono text-xs tabular-nums text-ink-muted">
          {pad(step + 1)} / {pad(count)}
        </p>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
