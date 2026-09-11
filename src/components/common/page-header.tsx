import { Container } from "@/components/ui/container";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Informational context above the title (status, category, back link). */
  meta?: React.ReactNode;
  children?: React.ReactNode;
}

/** One header per page — unbounded, closed by a rule. No decorative eyebrow. */
export function PageHeader({ title, description, meta, children }: PageHeaderProps) {
  return (
    <header className="border-b border-rule">
      <Container className="pt-14 pb-12 sm:pt-16 lg:pt-20 lg:pb-14">
        {meta ? <div className="mb-5">{meta}</div> : null}
        <h1 className="type-h1 max-w-4xl text-balance">{title}</h1>
        {description ? (
          <p className="type-body mt-4 text-ink-muted">{description}</p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
