import { cn } from "@/lib/utils";

interface RecordRowProps {
  /** The narrow index column: year, dates, status, category. */
  aside: React.ReactNode;
  children: React.ReactNode;
  /**
   * Secondary content. Below `xl` it follows the main content; from `xl` it
   * becomes a third column. Body text stops at 68ch, so on a wide screen a
   * two-column row left half the width empty (user report, 2026-11-11).
   */
  side?: React.ReactNode;
  /** Spacing above `side` while it is stacked under the main content. */
  sideClassName?: string;
  as?: "div" | "li" | "article";
  /**
   * Fade the row in as one block (default). Turn off when the row's own items
   * reveal one by one instead (Skills), so they don't fade twice.
   */
  reveal?: boolean;
  className?: string;
}

/**
 * The core layout pattern: a narrow index rail beside a wide content column,
 * separated from the previous row by a rule. Stacks on small screens.
 */
export function RecordRow({
  aside,
  children,
  side,
  sideClassName = "mt-8",
  as: Tag = "div",
  reveal = true,
  className,
}: RecordRowProps) {
  return (
    <Tag
      className={cn(
        // last:pb-0 — the section's own padding closes the list; adding the
        // row's 32px on top left a tall empty band under the last record.
        "grid gap-3 border-t border-rule py-8 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]",
        reveal && "reveal",
        side && "xl:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)] xl:gap-x-12",
        className,
      )}
    >
      <div className="min-w-0">{aside}</div>
      {side ? (
        // `xl:contents` lifts the two blocks into the row's grid as its 2nd
        // and 3rd columns; below xl they stack in the content column.
        <div className="min-w-0 xl:contents">
          <div className="min-w-0">{children}</div>
          <div className={cn("min-w-0 xl:mt-0", sideClassName)}>{side}</div>
        </div>
      ) : (
        <div className="min-w-0">{children}</div>
      )}
    </Tag>
  );
}
