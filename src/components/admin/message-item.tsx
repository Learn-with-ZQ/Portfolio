import { Mail, Phone } from "lucide-react";
import type { AdminMessage } from "@/types/admin";
import { markMessage, removeMessage } from "@/app/admin/actions";
import { ActionButton } from "./action-button";
import { formatDateTime } from "./format";
import { cn } from "@/lib/utils";

export function MessageItem({ message }: { message: AdminMessage }) {
  const unread = !message.isRead;
  return (
    <article
      className={cn(
        "rounded-lg border p-5 sm:p-6",
        unread ? "border-rule-strong bg-surface-elevated" : "border-rule",
      )}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="flex min-w-0 items-center gap-2 text-base font-semibold text-ink">
          {unread ? (
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-cta" />
          ) : null}
          <span className="break-words">{message.name}</span>
          {unread ? <span className="sr-only">(unread)</span> : null}
        </h2>
        <time dateTime={message.createdAt} className="font-mono text-xs tabular-nums text-ink-muted">
          {formatDateTime(message.createdAt)}
        </time>
      </header>

      <p className="type-meta mt-1 flex flex-wrap gap-x-4 gap-y-1 text-ink-muted">
        <a href={`mailto:${message.email}`} className="link inline-flex min-w-0 items-center gap-1.5 break-all">
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {message.email}
        </a>
        {message.phone ? (
          <a href={`tel:${message.phone}`} className="inline-flex items-center gap-1.5 hover:text-ink">
            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {message.phone}
          </a>
        ) : null}
      </p>

      {message.subject ? (
        <p className="mt-4 font-medium break-words text-ink">{message.subject}</p>
      ) : null}
      <p className="type-body mt-2 break-words whitespace-pre-wrap text-ink-muted">{message.message}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <ActionButton action={markMessage.bind(null, message.id, unread)}>
          {unread ? "Mark read" : "Mark unread"}
        </ActionButton>
        <ActionButton
          action={removeMessage.bind(null, message.id)}
          confirmLabel="Click again to delete"
        >
          Delete
        </ActionButton>
      </div>
    </article>
  );
}
