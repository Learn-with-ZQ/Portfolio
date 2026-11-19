import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSummary, AdminApiError } from "@/lib/admin-api";
import { ErrorPanel } from "@/components/admin/error-panel";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SECTIONS, SECTION_GROUPS } from "@/components/admin/content/sections";
import type { AdminSummary } from "@/types/admin";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

function Tile({
  href,
  value,
  label,
  attention,
}: {
  href: string;
  value: number;
  label: string;
  attention: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between gap-4 rounded-xl border p-5 transition-colors",
        attention ? "border-cta/70 bg-cta/10 hover:border-cta" : "border-rule hover:border-rule-strong hover:bg-surface",
      )}
    >
      <span className="min-w-0">
        <span className="block font-mono text-3xl font-medium tabular-nums text-ink">{value}</span>
        <span className="mt-1 block text-sm text-ink-muted">{label}</span>
      </span>
      <ArrowRight
        className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
        aria-hidden="true"
      />
    </Link>
  );
}

export default async function AdminOverviewPage() {
  let summary: AdminSummary | null = null;
  let error = "";
  try {
    summary = await getSummary();
  } catch (e) {
    if (!(e instanceof AdminApiError)) throw e;
    error = e.message;
  }

  const waiting = summary
    ? (summary.unreadConversations ?? 0) + summary.unreadMessages + summary.pendingTestimonials
    : 0;

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description={
          summary
            ? waiting
              ? `${waiting} ${waiting === 1 ? "thing needs" : "things need"} you.`
              : "Nothing is waiting for you. Inbox zero."
            : undefined
        }
      />

      {error ? (
        <div className="mt-8">
          <ErrorPanel message={error} />
        </div>
      ) : summary ? (
        <>
          <section aria-labelledby="needs-you" className="mt-8">
            <h2 id="needs-you" className="text-sm font-medium text-ink">
              Needs you
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Tile
                href="/admin/messages"
                value={summary.unreadConversations ?? 0}
                label="Conversations with new messages"
                attention={(summary.unreadConversations ?? 0) > 0}
              />
              <Tile
                href="/admin/messages?tab=anonymous&filter=unread"
                value={summary.unreadMessages}
                label="Unread anonymous messages"
                attention={summary.unreadMessages > 0}
              />
              <Tile
                href="/admin/testimonials?status=Pending"
                value={summary.pendingTestimonials}
                label="Testimonials to review"
                attention={summary.pendingTestimonials > 0}
              />
            </div>
          </section>

          <section aria-labelledby="totals" className="mt-10">
            <h2 id="totals" className="text-sm font-medium text-ink">
              In total
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Tile
                href="/admin/messages?tab=anonymous"
                value={summary.totalMessages}
                label="Anonymous messages"
                attention={false}
              />
              <Tile
                href="/admin/testimonials?status=Approved"
                value={summary.approvedTestimonials}
                label="Published testimonials"
                attention={false}
              />
            </div>
          </section>
        </>
      ) : null}

      <section aria-labelledby="edit-content" className="mt-10">
        <h2 id="edit-content" className="text-sm font-medium text-ink">
          Edit your site
        </h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {SECTION_GROUPS.map((group) => (
            <div key={group} className="rounded-xl border border-rule p-4">
              <p className="text-xs text-ink-muted">{group}</p>
              <ul className="mt-2 grid gap-0.5">
                {SECTIONS.filter((s) => s.group === group).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/admin/content/${s.slug}`}
                      className="-mx-2 flex min-h-8 items-center rounded-md px-2 text-sm text-ink hover:bg-surface"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
