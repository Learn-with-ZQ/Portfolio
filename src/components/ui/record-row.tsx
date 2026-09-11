import { cn } from "@/lib/utils";

interface RecordRowProps {
  /** The narrow index column: year, dates, status, category. */
  aside: React.ReactNode;
  children: React.ReactNode;
  as?: "div" | "li" | "article";
  className?: string;
}

/**
 * The core layout pattern: a narrow index rail beside a wide content column,
 * separated from the previous row by a rule. Stacks on small screens.
 */
export function RecordRow({ aside, children, as: Tag = "div", className }: RecordRowProps) {
  return (
    <Tag
      className={cn(
        "grid gap-3 border-t border-rule py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]",
        className,
      )}
    >
      <div className="min-w-0">{aside}</div>
      <div className="min-w-0">{children}</div>
    </Tag>
  );
}
