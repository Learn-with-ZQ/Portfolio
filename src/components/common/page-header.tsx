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
      <Container className="pt-10 pb-10 lg:pt-14 lg:pb-12">
        {meta ? <div className="rise-in mb-5">{meta}</div> : null}
        <h1 className="type-h1 rise-in max-w-4xl text-balance [--rise-delay:60ms]">{title}</h1>
        {description ? (
          <p className="type-body rise-in mt-4 text-ink-muted [--rise-delay:140ms]">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
