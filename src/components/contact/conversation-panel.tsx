"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Loader2, LogIn, Send, TriangleAlert } from "lucide-react";
import type { ConversationMessage, MyConversation } from "@/types/conversation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** How often an open conversation checks for Zaid's replies (Zaid: 30 s). */
const POLL_MS = 30_000;
const MAX_BODY = 5000;
/** Unsent text, kept across a forced sign-in. Per tab; cleared once restored. */
const DRAFT_KEY = "conversation-draft";

interface ConversationPanelProps {
  firstName: string;
  initial: MyConversation | null;
  needsReauth: boolean;
  loadFailed: boolean;
  signInAction: () => Promise<void>;
}

function Time({ iso }: { iso: string }) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  // The visitor's own time zone; the server can't know it, hence the warning opt-out.
  return (
    <time dateTime={iso} suppressHydrationWarning className="font-mono text-[0.6875rem] tabular-nums opacity-70">
      {date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
    </time>
  );
}

export function ConversationPanel({
  firstName,
  initial,
  needsReauth,
  loadFailed,
  signInAction,
}: ConversationPanelProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>(initial?.messages ?? []);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(loadFailed ? "Your earlier messages couldn't be loaded. They'll appear when the connection is back." : "");
  const [reauth, setReauth] = useState(needsReauth);
  const [draftKept, setDraftKept] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  // Restore text kept before a forced sign-in.
  useEffect(() => {
    if (reauth) return;
    try {
      const kept = window.sessionStorage.getItem(DRAFT_KEY);
      if (kept) {
        window.sessionStorage.removeItem(DRAFT_KEY);
        setDraft(kept);
      }
    } catch {
      // Storage blocked: nothing to restore.
    }
  }, [reauth]);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/conversation", { cache: "no-store" });
      const result = (await response.json().catch(() => null)) as {
        conversation?: MyConversation | null;
        reauth?: boolean;
      } | null;
      if (response.status === 401 && result?.reauth) {
        setReauth(true);
        return;
      }
      if (response.ok && result) {
        setMessages(result.conversation?.messages ?? []);
        setError((current) => (current.startsWith("Your earlier messages") ? "" : current));
      }
    } catch {
      // Offline for a moment; the next check tries again.
    }
  }, []);

  // Check for replies every 30 s while the tab is visible, and on return to it.
  useEffect(() => {
    if (reauth) return;
    const tick = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const timer = window.setInterval(tick, POLL_MS);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [reauth, refresh]);

  // Keep the newest message in view.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages.length]);

  async function send(event?: FormEvent) {
    event?.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const result = (await response.json().catch(() => null)) as {
        conversation?: MyConversation;
        error?: string;
        reauth?: boolean;
      } | null;
      if (response.status === 401 && result?.reauth) {
        try {
          window.sessionStorage.setItem(DRAFT_KEY, draft);
          setDraftKept(true);
        } catch {
          // Storage blocked: the panel then makes no promise about the text.
        }
        setReauth(true);
        return;
      }
      if (!response.ok || !result?.conversation) throw new Error(result?.error ?? "Your message couldn't be sent.");
      setMessages(result.conversation.messages);
      setDraft("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Your message couldn't be sent.");
    } finally {
      setSending(false);
    }
  }

  function handleKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) void send();
  }

  if (reauth)
    return (
      <div className="flex flex-col gap-4 rounded-lg border border-dashed border-rule-strong p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="type-meta text-ink">
          {draftKept
            ? "Your sign-in has expired. Sign in again and your message will be waiting."
            : "Sign in with Google again to see your conversation. A sign-in here lasts 30 days."}
        </p>
        <form action={signInAction} className="shrink-0">
          <Button type="submit">
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in with Google
          </Button>
        </form>
      </div>
    );

  return (
    <div>
      {messages.length ? (
        <ol
          ref={listRef}
          data-lenis-prevent
          aria-label="Your conversation"
          className="flex max-h-[28rem] flex-col gap-3 overflow-y-auto overscroll-contain rounded-lg border border-rule p-3 sm:p-4"
        >
          {messages.map((message) => {
            const mine = message.sender === "visitor";
            return (
              <li key={message.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5",
                    mine ? "rounded-br-md bg-cta text-primary-foreground" : "rounded-bl-md bg-surface text-ink",
                  )}
                >
                  <p className="sr-only">{mine ? "You" : "Zaid"}:</p>
                  <p className="break-words whitespace-pre-wrap text-[0.9375rem] leading-relaxed">{message.body}</p>
                  <p className="mt-1">
                    <Time iso={message.createdAt} />
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="type-meta rounded-lg border border-dashed border-rule-strong p-4 text-ink-muted">
          Hi {firstName}. Write your first message below. I&apos;ll reply here, and you&apos;ll get an
          email when there&apos;s a reply to read.
        </p>
      )}

      <form onSubmit={send} className="mt-4">
        <label htmlFor="conversation-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="conversation-message"
          rows={4}
          maxLength={MAX_BODY}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Write a message…"
          className="field resize-y"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="type-meta text-ink-muted">Ctrl + Enter sends. New replies appear here on their own.</p>
          <Button type="submit" disabled={sending || !draft.trim()}>
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            Send
          </Button>
        </div>
        {error ? (
          <p role="alert" className="type-meta mt-3 flex items-start gap-2 text-error">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
