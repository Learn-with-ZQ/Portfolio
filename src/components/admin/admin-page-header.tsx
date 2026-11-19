import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface AdminPageHeaderProps {
  /** Where this page sits, outermost first; the last crumb is this page. */
  trail?: { href?: string; label: string }[];
  title: string;
  description?: React.ReactNode;
  /** Buttons or tabs on the right (wraps below on narrow screens). */
  actions?: React.ReactNode;
}

/** The same header on every admin page: where you are, what this is, what you can do. */
export function AdminPageHeader({ trail, title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="border-b border-rule pb-6">
      {trail?.length ? (
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-muted">
            {trail.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1">
                {i > 0 ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-ink">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">{title}</h1>
          {description ? <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
