import Link from "next/link";
import { nowSection } from "@/data/home";
import { Section, SectionHeading } from "@/components/ui/section";
import { Status } from "@/components/ui/badge";

/**
 * Work, teaching and study, side by side, on the light ground after the
 * journey. Rules, not cards (UI.md §5). The status dot carries the colour
 * meaning: violet for AI / data science / research, green for live work.
 */
export function NowSection() {
  return (
    <Section rule labelledBy="now-title">
      <SectionHeading id="now-title" title={nowSection.title} description={nowSection.description} />
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {nowSection.items.map((item) => (
          <li key={item.title} className="reveal min-w-0 border-t border-rule pt-5">
            <Status tone={item.tone}>{item.kind}</Status>
            <h3 className="type-h3 mt-3">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-ink"
                  aria-label={`${item.title} (opens in a new tab)`}
                >
                  {item.title}
                </a>
              ) : (
                <Link href={item.href} className="link text-ink">
                  {item.title}
                </Link>
              )}
            </h3>
            <p className="type-meta mt-2 text-ink-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
