"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import { ArrowUp, X } from "lucide-react";
import { Mascot } from "@/components/assistant/mascot";
import { assistant } from "@/data/assistant";
import { cn } from "@/lib/utils";
import type { ChatReply, ChatTurn } from "@/types";

const MAX_QUESTION = 500;

// Site paths, the résumé, web links and email addresses in an answer become links.
const LINK_PATTERN =
  /(https?:\/\/[^\s<>()]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\/(?:about|experience|projects|skills|services|education|certifications|achievements|testimonials|contact|privacy)(?:\/[a-z0-9-]+)*|\/Muhammad_Zaid_Qasim_Resume\.pdf)/g;

const linkClass = "link break-words";

function closeOnSmallScreens(close: () => void) {
  // On phones the panel covers the page the link leads to.
  if (!window.matchMedia("(min-width: 48rem)").matches) close();
}

function renderText(text: string, onNavigate: () => void): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    let value = match[0];
    const start = match.index ?? 0;
    // Sentence punctuation is not part of the link.
    const trailing = value.match(/[.,;:!?]+$/)?.[0] ?? "";
    value = value.slice(0, value.length - trailing.length);
    if (start > last) parts.push(text.slice(last, start));

    if (value.startsWith("http")) {
      parts.push(
        <a key={start} href={value} target="_blank" rel="noopener noreferrer" dir="ltr" className={linkClass}>
          {value.replace(/^https?:\/\//, "")}
        </a>,
      );
    } else if (value.includes("@")) {
      parts.push(
        <a key={start} href={`mailto:${value}`} dir="ltr" className={linkClass}>
          {value}
        </a>,
      );
    } else if (value.endsWith(".pdf")) {
      parts.push(
        <a key={start} href={value} download dir="ltr" className={linkClass}>
          résumé (PDF)
        </a>,
      );
    } else {
      parts.push(
        <Link key={start} href={value} onClick={onNavigate} dir="ltr" className={linkClass}>
          {value}
        </Link>,
      );
    }
    if (trailing) parts.push(trailing);
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Bubble({ role, children }: { role: ChatTurn["role"]; children: ReactNode }) {
  return (
    <li
      dir="auto"
      className={cn(
        "type-meta max-w-[88%] rounded-[10px] px-3 py-2 whitespace-pre-line",
        role === "user"
          ? "self-end bg-primary text-primary-foreground"
          : "self-start border border-rule bg-surface text-ink",
      )}
    >
      {role === "user" ? <span className="sr-only">You: </span> : null}
      {children}
    </li>
  );
}

/**
 * The mascot in the bottom-right corner of every page. Clicking it opens a
 * chat that answers questions about Zaid (POST /api/chat → Gemini, grounded
 * in src/data/knowledge.md) and suggests questions to ask.
 */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(assistant.starterQuestions);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelId = useId();
  const titleId = useId();
  const inputId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    // Start at the greeting; once there is a conversation, follow the latest turn.
    const log = logRef.current;
    if (log) log.scrollTop = turns.length || loading || error ? log.scrollHeight : 0;
  }, [turns, loading, error, open]);

  useEffect(() => () => requestRef.current?.abort(), []);

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  async function ask(question: string) {
    const text = question.trim().slice(0, MAX_QUESTION);
    if (!text || loading) return;

    const asked: ChatTurn[] = [...turns, { role: "user", text }];
    setTurns(asked);
    setDraft("");
    setSuggestions([]);
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    requestRef.current = controller;

    const offered = suggestions;
    const fail = (message: string) => {
      // Take the question back out so asking again doesn't send it twice.
      setTurns(turns);
      setDraft(text);
      setSuggestions(offered);
      setError(message);
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: asked }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as
        | (Partial<ChatReply> & { error?: string })
        | null;

      if (!response.ok || typeof data?.answer !== "string") {
        const reason = data?.error;
        fail(
          reason === "unavailable"
            ? assistant.errors.unavailable
            : reason === "busy"
              ? assistant.errors.busy
              : assistant.errors.failed,
        );
        return;
      }

      setTurns([...asked, { role: "assistant", text: data.answer }]);
      setSuggestions(data.suggestions ?? []);
    } catch (caught) {
      if ((caught as Error).name !== "AbortError") fail(assistant.errors.failed);
    } finally {
      if (requestRef.current === controller) setLoading(false);
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void ask(draft);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
    }
  };

  const navigate = () => closeOnSmallScreens(close);

  return (
    <div className="pointer-events-none fixed right-3 bottom-3 z-30 flex flex-col items-end gap-3 md:right-4 md:bottom-4 print:hidden">
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          onKeyDown={onKeyDown}
          className="surface pointer-events-auto flex max-h-[calc(100svh-11rem)] w-[calc(100vw-1.5rem)] flex-col overflow-hidden md:max-h-[min(36rem,calc(100svh-13rem))] md:w-[24rem]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-rule py-2 pr-2 pl-4">
            <div className="py-1">
              <h2 id={titleId} className="type-h3 text-ink">
                {assistant.title}
              </h2>
              <p className="type-meta text-ink-muted">{assistant.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div ref={logRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <ul role="log" aria-live="polite" aria-label="Conversation" className="flex flex-col gap-3">
              <Bubble role="assistant">{assistant.greeting}</Bubble>
              {turns.map((turn, index) => (
                <Bubble key={index} role={turn.role}>
                  {turn.role === "assistant" ? renderText(turn.text, navigate) : turn.text}
                </Bubble>
              ))}
              {loading ? (
                <li className="type-meta self-start text-ink-muted motion-safe:animate-pulse">
                  Thinking…
                </li>
              ) : null}
              {error ? (
                <li className="type-meta self-start rounded-[10px] border border-rule px-3 py-2 text-ink">
                  {renderText(error, navigate)}
                </li>
              ) : null}
            </ul>

            {suggestions.length > 0 && !loading ? (
              <div className="mt-4">
                <p className="type-meta text-ink-muted">
                  {turns.length ? "You could also ask" : "Try asking"}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((question) => (
                    <li key={question}>
                      <button
                        type="button"
                        dir="auto"
                        onClick={() => void ask(question)}
                        className="type-meta min-h-10 rounded-md border border-rule-strong px-3 py-1.5 text-left text-ink transition-colors hover:border-ink hover:bg-surface"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="border-t border-rule p-3">
            <label htmlFor={inputId} className="sr-only">
              {assistant.inputLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                dir="auto"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={MAX_QUESTION}
                placeholder={assistant.inputPlaceholder}
                autoComplete="off"
                className="field min-w-0 flex-1"
              />
              <button
                type="submit"
                disabled={loading || !draft.trim()}
                aria-label="Send question"
                className="btn-primary inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full disabled:pointer-events-none disabled:opacity-50"
              >
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-xs text-ink-muted">{assistant.disclaimer}</p>
          </form>
        </section>
      ) : null}

      {/* 96px from md up; scaled to 64px on phones, sized so the panel sits right above it. */}
      <div className="rise-in pointer-events-auto [--rise-delay:500ms] max-md:h-16 max-md:w-16 max-md:[&>button]:origin-top-left max-md:[&>button]:scale-[0.6667]">
        <Mascot
          ref={launcherRef}
          directions={assistant.mascot.directions}
          reactions={assistant.mascot.reactions}
          size={96}
          ariaLabel={open ? `Close chat: ${assistant.launcherLabel}` : assistant.launcherLabel}
          expanded={open}
          controls={open ? panelId : undefined}
          onActivate={() => {
            if (open) close();
            else setOpen(true);
          }}
        />
      </div>
    </div>
  );
}
