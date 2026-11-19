import Link from "next/link";
import { AdminApiError, getConversations, getMessages } from "@/lib/admin-api";
import { ErrorPanel } from "@/components/admin/error-panel";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MessageItem } from "@/components/admin/message-item";
import { formatDateTime } from "@/components/admin/format";
import type { AdminMessage, MessageFilter } from "@/types/admin";
import type { AdminConversationSummary } from "@/types/conversation";
import { cn } from "@/lib/utils";

export const metadata = { title: "Messages" };

interface MessagesPageProps {
  searchParams: Promise<{ tab?: string; filter?: string }>;
}

function ConversationRow({ c }: { c: AdminConversationSummary }) {
  const unread = c.adminUnread > 0;
  return (
    <Link
      href={`/admin/messages/conversations/${c.id}`}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 transition-colors hover:border-ink",
        unread ? "border-rule-strong bg-surface-elevated" : "border-rule",
      )}
    >
      {c.profileImageUrl ? (
        <span
          aria-hidden="true"
          className="h-9 w-9 shrink-0 rounded-full bg-surface bg-cover bg-center"
          style={{ backgroundImage: `url(${c.profileImageUrl})` }}
        />
      ) : (
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-ink-muted">
          {c.name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span className={cn("break-words text-ink", unread && "font-semibold")}>{c.name}</span>
          <time dateTime={c.lastMessageAt} className="font-mono text-xs tabular-nums text-ink-muted">
            {formatDateTime(c.lastMessageAt)}
          </time>
        </span>
        <span className="type-meta block break-all text-ink-muted">{c.email}</span>
        {c.lastMessage ? (
          <span className="type-meta mt-1 block truncate text-ink-muted">
            {c.lastMessage.sender === "admin" ? "You: " : ""}
            {c.lastMessage.body}
          </span>
        ) : null}
      </span>
      {unread ? (
        <span className="shrink-0 rounded-full bg-cta px-2 font-mono text-xs leading-5 tabular-nums text-primary-foreground">
          {c.adminUnread}
          <span className="sr-only"> unread</span>
        </span>
      ) : null}
    </Link>
  );
}

export default async function AdminMessagesPage({ searchParams }: MessagesPageProps) {
  const params = await searchParams;
  const tab = params.tab === "anonymous" ? "anonymous" : "conversations";
  const filter: MessageFilter = params.filter === "unread" ? "unread" : "all";

  let conversations: AdminConversationSummary[] = [];
  let messages: AdminMessage[] = [];
  let error = "";
  try {
    if (tab === "conversations") conversations = await getConversations();
    else messages = await getMessages(filter);
  } catch (e) {
    if (!(e instanceof AdminApiError)) throw e;
    error = e.message;
  }

  return (
    <>
      <AdminPageHeader
        trail={[{ href: "/admin", label: "Dashboard" }, { label: "Inbox" }]}
        title={tab === "conversations" ? "Conversations" : "Anonymous messages"}
        description={
          tab === "conversations"
            ? "Chats with visitors who signed in with Google. Open one to read and reply."
            : "One-off messages from the contact form. Reply by email or phone."
        }
        actions={
          tab === "anonymous" ? (
            <div className="flex rounded-full border border-rule p-0.5">
              {(["all", "unread"] as const).map((f) => (
                <Link
                  key={f}
                  href={`/admin/messages?tab=anonymous${f === "unread" ? "&filter=unread" : ""}`}
                  aria-current={filter === f ? "page" : undefined}
                  className={cn(
                    "inline-flex h-8 items-center rounded-full px-3.5 text-sm",
                    filter === f ? "bg-surface font-medium text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {f === "all" ? "All" : "Unread"}
                </Link>
              ))}
            </div>
          ) : null
        }
      />

      <div className="mt-8">
        {error ? (
          <ErrorPanel message={error} />
        ) : tab === "conversations" ? (
          conversations.length === 0 ? (
            <p className="type-body text-ink-muted">
              No conversations yet. Visitors who sign in on the Contact page can start one.
            </p>
          ) : (
            <ul className="grid max-w-3xl gap-2">
              {conversations.map((c) => (
                <li key={c.id}>
                  <ConversationRow c={c} />
                </li>
              ))}
            </ul>
          )
        ) : messages.length === 0 ? (
          <p className="type-body text-ink-muted">
            {filter === "unread" ? "No unread messages. You're all caught up." : "No messages yet."}
          </p>
        ) : (
          <ul className="grid max-w-3xl gap-4">
            {messages.map((message) => (
              <li key={message.id}>
                <MessageItem message={message} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
