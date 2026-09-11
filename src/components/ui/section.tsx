import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface SectionProps {
  id?: string;
  className?: string;
  /** Adds a top rule — use for every section after the first on a page. */
  rule?: boolean;
  spacing?: "default" | "tight";
  labelledBy?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  className,
  rule = false,
  spacing = "default",
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        spacing === "tight" ? "py-12 sm:py-14" : "py-16 sm:py-20 lg:py-24",
        rule && "border-t border-rule",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  /** A link or control aligned with the heading, e.g. "All projects". */
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  id,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 id={id} className="type-h2 text-balance">
          {title}
        </h2>
        {description ? (
          <p className="type-body mt-3 text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
