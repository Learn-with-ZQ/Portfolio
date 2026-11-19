import Link from "next/link";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  label: string;
  tabs: { href: string; label: string; active: boolean }[];
}

/** Links styled as tabs; each is a real URL, so a filtered view can be bookmarked. */
export function FilterTabs({ label, tabs }: FilterTabsProps) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-1 border-b border-rule">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          className={cn(
            "-mb-px inline-flex h-10 items-center border-b-2 px-3 text-sm transition-colors",
            tab.active
              ? "border-primary font-medium text-ink"
              : "border-transparent text-ink-muted hover:text-ink",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
