import { FileText, Mail, Phone } from "lucide-react";
import type { AdminTestimonial } from "@/types/admin";
import type { StatusTone, TestimonialStatus } from "@/types";
import { changeTestimonialStatus, removeTestimonial } from "@/app/admin/actions";
import { Status } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ActionButton } from "./action-button";
import { formatDateTime } from "./format";

// UI.md R19: green = live, teal = in progress.
const statusView: Record<TestimonialStatus, { label: string; tone: StatusTone }> = {
  Pending: { label: "Waiting for review", tone: "pending" },
  Approved: { label: "Published", tone: "verified" },
  Rejected: { label: "Rejected", tone: "neutral" },
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialItem({ testimonial: t }: { testimonial: AdminTestimonial }) {
  const view = statusView[t.status];
  const rating = Math.min(5, Math.max(1, Math.round(t.rating))) as 1 | 2 | 3 | 4 | 5;

  return (
    <article className="rounded-lg border border-rule p-5 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {t.profileImageUrl ? (
            <span
              role="img"
              aria-label={`${t.name}'s photo`}
              className="h-10 w-10 shrink-0 rounded-full bg-surface bg-cover bg-center"
              style={{ backgroundImage: `url(${t.profileImageUrl})` }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-ink-muted"
            >
              {initials(t.name)}
            </span>
          )}
          <div className="min-w-0">
            <h2 className="text-base font-semibold break-words text-ink">{t.name}</h2>
            <p className="type-meta flex flex-wrap gap-x-4 text-ink-muted">
              <a href={`mailto:${t.email}`} className="link inline-flex items-center gap-1.5 break-all">
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {t.email}
              </a>
              {t.phone ? (
                <a href={`tel:${t.phone}`} className="inline-flex items-center gap-1.5 hover:text-ink">
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {t.phone}
                </a>
              ) : null}
            </p>
          </div>
        </div>
        <Status tone={view.tone} emphasis>
          {view.label}
        </Status>
      </header>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
        <p className="font-medium break-words text-ink">{t.subject}</p>
        <Rating value={rating} />
      </div>
      <p className="type-body mt-2 break-words whitespace-pre-wrap text-ink-muted">{t.message}</p>

      {t.documentUrl ? (
        <a
          href={t.documentUrl}
          target="_blank"
          rel="noreferrer"
          className="link type-meta mt-4 inline-flex max-w-full items-center gap-1.5"
        >
          <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{t.documentName ?? "Reference letter"}</span>
        </a>
      ) : null}

      <p className="mt-4 font-mono text-xs tabular-nums text-ink-muted">
        Sent {formatDateTime(t.createdAt)}
        {t.updatedAt !== t.createdAt ? ` · edited ${formatDateTime(t.updatedAt)}` : ""}
        {t.approvedAt ? ` · published ${formatDateTime(t.approvedAt)}` : ""}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {t.status !== "Approved" ? (
          <ActionButton tone="primary" action={changeTestimonialStatus.bind(null, t.id, "Approved")}>
            Approve
          </ActionButton>
        ) : null}
        {t.status !== "Rejected" ? (
          <ActionButton action={changeTestimonialStatus.bind(null, t.id, "Rejected")}>
            {t.status === "Approved" ? "Unpublish" : "Reject"}
          </ActionButton>
        ) : null}
        {t.status !== "Pending" ? (
          <ActionButton action={changeTestimonialStatus.bind(null, t.id, "Pending")}>
            Back to review
          </ActionButton>
        ) : null}
        <ActionButton
          action={removeTestimonial.bind(null, t.id)}
          confirmLabel="Click again to delete"
        >
          Delete
        </ActionButton>
      </div>
    </article>
  );
}
