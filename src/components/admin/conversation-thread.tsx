"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Send, Sparkles, TriangleAlert, CheckCircle2 } from "lucide-react";
import type { AdminConversation } from "@/types/conversation";
import { draftSummary, removeConversation, sendReply, sendSummaryEmail } from "@/app/admin/actions";
import { ActionButton } from "./action-button";
import { cn } from "@/lib/utils";

function Time({ iso }: { iso: string }) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return (
    <time dateTime={iso} suppressHydrationWarning className="font-mono text-[0.6875rem] tabular-nums opacity-70">
      {date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
    </time>
  );
}

export function ConversationThread({ initial }: { initial: AdminConversation }) {
  const router = useRouter();
  const [conversation, setConversation] = useState(initial);
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");
  const [replying, startReply] = useTransition();

  // The summary email: idle → drafting → reviewing (editable) → sending → sent.
  const [draft, setDraft] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [drafting, startDraft] = useTransition();
  const [sendingEmail, startEmail] = useTransition();
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [conversation.messages.length]);

  const pendingReplies = conversation.unemailedReplies.length;

  function submitReply() {
    const text = reply.trim();
    if (!text) return;
    setReplyError("");
    startReply(async () => {
      const result = await sendReply(conversation.id, text);
      if (result.error || !result.conversation) {
        setReplyError(result.error ?? "The reply couldn't be sent.");
        return;
      }
      setConversation(result.conversation);
      setReply("");
      setEmailSent(false);
    });
  }

  function makeDraft() {
    setEmailError("");
    setEmailSent(false);
    startDraft(async () => {
      const result = await draftSummary(conversation.id);
      if (result.error || !result.draft) {
        setEmailError(result.error ?? "No draft came back.");
        return;
      }
      setDraft(result.draft);
    });
  }

  function sendEmail() {
    if (!draft?.trim()) return;
    setEmailError("");
    startEmail(async () => {
      const result = await sendSummaryEmail(conversation.id, draft);
      if (result.error || !result.conversation) {
        setEmailError(result.error ?? "The email couldn't be sent.");
        return;
      }
      setConversation(result.conversation);
      setDraft(null);
      setEmailSent(true);
    });
  }

  return (
    <div className="grid max-w-3xl gap-6">
      <ol
        ref={listRef}
        aria-label={`Conversation with ${conversation.name}`}
        className="flex max-h-[32rem] flex-col gap-3 overflow-y-auto overscroll-contain rounded-lg border border-rule p-3 sm:p-4"
      >
        {conversation.messages.map((message) => {
          const mine = message.sender === "admin";
          return (
            <li key={message.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5",
                  mine ? "rounded-br-md bg-cta text-primary-foreground" : "rounded-bl-md bg-surface text-ink",
                )}
              >
                <p className="sr-only">{mine ? "You" : conversation.name}:</p>
                <p className="break-words whitespace-pre-wrap text-[0.9375rem] leading-relaxed">{message.body}</p>
                <p className="mt-1">
                  <Time iso={message.createdAt} />
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div>
        <label htmlFor="admin-reply" className="field-label">
          Reply
        </label>
        <textarea
          id="admin-reply"
          rows={4}
          maxLength={5000}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submitReply();
          }}
          className="field resize-y"
          placeholder={`Reply to ${conversation.name.split(" ")[0]}…`}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="type-meta text-ink-muted">
            Replies send no email. Use &ldquo;Send email&rdquo; when you&apos;re done.
          </p>
          <button
            type="button"
            onClick={submitReply}
            disabled={replying || !reply.trim()}
            className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium disabled:opacity-50"
          >
            {replying ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            Reply
          </button>
        </div>
        {replyError ? (
          <p role="alert" className="type-meta mt-2 text-error">
            {replyError}
          </p>
        ) : null}
      </div>

      <section aria-labelledby="email-title" className="rounded-lg border border-rule p-4 sm:p-5">
        <h2 id="email-title" className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email {conversation.name.split(" ")[0]}
        </h2>
        <p className="type-meta mt-1 text-ink-muted">
          {pendingReplies
            ? `${pendingReplies} ${pendingReplies === 1 ? "reply hasn't" : "replies haven't"} been emailed yet. Gemini drafts a summary for you to check, then it goes to ${conversation.email} with a link back here.`
            : conversation.visitorNotifiedAt
              ? "Every reply so far has been emailed."
              : "Nothing to email yet: reply first."}
        </p>

        {draft === null ? (
          <button
            type="button"
            onClick={makeDraft}
            disabled={!pendingReplies || drafting}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-rule-strong px-4 text-sm font-medium text-ink hover:border-ink hover:bg-surface disabled:opacity-50"
          >
            {drafting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
            {drafting ? "Drafting summary…" : "Send email"}
          </button>
        ) : (
          <div className="mt-4">
            <label htmlFor="email-draft" className="field-label">
              Check the summary before it goes out
            </label>
            <textarea
              id="email-draft"
              rows={8}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="field resize-y"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={sendEmail}
                disabled={sendingEmail || !draft.trim()}
                className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium disabled:opacity-50"
              >
                {sendingEmail ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Mail className="h-4 w-4" aria-hidden="true" />}
                Send
              </button>
              <button
                type="button"
                onClick={() => setDraft(null)}
                disabled={sendingEmail}
                className="inline-flex h-10 items-center rounded-full px-4 text-sm text-ink-muted hover:bg-surface hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {emailSent ? (
          <p role="status" className="type-meta mt-3 inline-flex items-center gap-1.5 text-live">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Emailed {conversation.email}.
          </p>
        ) : null}
        {emailError ? (
          <p role="alert" className="type-meta mt-3 flex items-start gap-1.5 text-error">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {emailError}
          </p>
        ) : null}
      </section>

      <div>
        <ActionButton
          action={async () => {
            const result = await removeConversation(conversation.id);
            if (!result.error) router.push("/admin/messages");
            return result;
          }}
          confirmLabel="Click again to delete the whole conversation"
        >
          Delete conversation
        </ActionButton>
      </div>
    </div>
  );
}
