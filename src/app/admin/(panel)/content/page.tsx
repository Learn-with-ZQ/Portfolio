import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SECTIONS, SECTION_GROUPS } from "@/components/admin/content/sections";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export const metadata = { title: "Content" };

export default function AdminContentPage() {
  return (
    <>
      <AdminPageHeader
        trail={[{ href: "/admin", label: "Dashboard" }, { label: "Content" }]}
        title="Content"
        description="Everything the public pages show. Saving a section updates the live site straight away."
      />
      {SECTION_GROUPS.map((group) => (
        <section key={group} aria-labelledby={`group-${group}`} className="mt-8">
          <h2 id={`group-${group}`} className="text-sm font-medium text-ink">
            {group}
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {SECTIONS.filter((s) => s.group === group).map((section) => (
              <li key={section.slug}>
                <Link
                  href={`/admin/content/${section.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-xl border border-rule p-4 transition-colors hover:border-rule-strong hover:bg-surface"
                >
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{section.title}</span>
                    <span className="mt-0.5 block text-sm text-ink-muted">{section.description}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted group-hover:text-ink" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
