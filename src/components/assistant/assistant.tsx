"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { Mascot } from "@/components/assistant/mascot";
import { assistant } from "@/data/assistant";
import { cn } from "@/lib/utils";
import type { ChatReply, ChatTurn } from "@/types";

const MAX_QUESTION = 500;

// Browser storage: where the visitor dropped the mascot, and whether the
// speech bubble has done its job (chat opened, or bubble dismissed).
const SPOT_KEY = "assistant-spot";
const NUDGE_KEY = "assistant-nudge";
const NUDGE_DELAY_MS = 1500;

/**
 * Where the mascot sits, as 0–1 across the space it can move in, so it keeps
 * its place when the window is resized. (1, 1) is the bottom-right corner.
 */
type Spot = { fx: number; fy: number };
const CORNER: Spot = { fx: 1, fy: 1 };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function readSpot(): Spot | null {
  try {
    const saved = JSON.parse(localStorage.getItem(SPOT_KEY) ?? "null") as Partial<Spot> | null;
    if (typeof saved?.fx === "number" && typeof saved.fy === "number") {
      return { fx: clamp01(saved.fx), fy: clamp01(saved.fy) };
    }
  } catch {
    // Storage blocked or garbled: use the corner.
  }
  return null;
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked: it just won't be remembered.
  }
}

/**
 * Distance from the edge the mascot is anchored to. In a fixed element `100%`
 * is the viewport, so this follows the window without any resize handling.
 * --dock-m (gutter) and --dock-size (mascot) are set per breakpoint.
 */
const along = (f: number) =>
  `calc(var(--dock-m) + ${f.toFixed(4)} * (100% - var(--dock-size) - 2 * var(--dock-m)))`;

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
 * The mascot on every page (bottom-right until the visitor drags it somewhere
 * else). Clicking it opens a chat that answers questions about Zaid (POST
 * /api/chat → Gemini, grounded in src/data/knowledge.md) and suggests
 * questions to ask. A chat badge and, until first use, a speech bubble say so.
 */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(assistant.starterQuestions);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spot, setSpot] = useState<Spot>(CORNER);
  const [dragging, setDragging] = useState(false);
  const [nudge, setNudge] = useState(false);

  const panelId = useId();
  const titleId = useId();
  const inputId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const spotRef = useRef<Spot>(CORNER);
  const stopDragRef = useRef<(() => void) | null>(null);
  const draggedRef = useRef(false);

  // Before the first paint, so a moved mascot never flashes in the corner.
  useLayoutEffect(() => {
    const saved = readSpot();
    if (saved) {
      spotRef.current = saved;
      setSpot(saved);
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(NUDGE_KEY) !== null;
    } catch {
      // Storage blocked: show the bubble.
    }
    if (seen) return;
    const timer = window.setTimeout(() => setNudge(true), NUDGE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    // Start at the greeting; once there is a conversation, follow the latest turn.
    const log = logRef.current;
    if (log) log.scrollTop = turns.length || loading || error ? log.scrollHeight : 0;
  }, [turns, loading, error, open]);

  useEffect(
    () => () => {
      requestRef.current?.abort();
      stopDragRef.current?.();
    },
    [],
  );

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const retireNudge = () => {
    setNudge(false);
    store(NUDGE_KEY, "seen");
  };

  const openChat = () => {
    setOpen(true);
    retireNudge();
  };

  // Dragging: a press on the mascot that travels a few pixels becomes a move,
  // not a click. The spot is kept as fractions (see `Spot`) and remembered.
  // Listens on the window for the rest of the press: a quick drag leaves the
  // mascot before it has moved, and pointer capture would retarget the click.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    draggedRef.current = false;
    if (event.button !== 0 || !launcherRef.current?.contains(event.target as Node)) return;
    stopDragRef.current?.();

    const dock = event.currentTarget;
    const box = dock.getBoundingClientRect();
    const size = dock.offsetWidth;
    const margin = parseFloat(getComputedStyle(dock).getPropertyValue("--dock-m")) || 12;
    const { pointerId, clientX: startX, clientY: startY } = event;
    const grabX = startX - box.left;
    const grabY = startY - box.top;
    const slop = event.pointerType === "touch" ? 10 : 5;
    let moved = false;

    const move = (e: globalThis.PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      if (!moved) {
        if (Math.hypot(e.clientX - startX, e.clientY - startY) < slop) return;
        moved = true;
        setDragging(true);
      }
      const freeX = document.documentElement.clientWidth - size - 2 * margin;
      const freeY = window.innerHeight - size - 2 * margin;
      const next = {
        fx: freeX > 0 ? clamp01((e.clientX - grabX - margin) / freeX) : 1,
        fy: freeY > 0 ? clamp01((e.clientY - grabY - margin) / freeY) : 1,
      };
      spotRef.current = next;
      setSpot(next);
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      stopDragRef.current = null;
    };

    const end = (e: globalThis.PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      stop();
      if (!moved) return;
      draggedRef.current = true;
      setDragging(false);
      store(SPOT_KEY, JSON.stringify(spotRef.current));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    stopDragRef.current = stop;
  };

  // Anchor to the nearest edges, so the panel and bubble open towards the
  // middle of the screen, wherever the mascot is.
  const right = spot.fx >= 0.5;
  const bottom = spot.fy >= 0.5;
  const placement = {
    "--dock-x": along(right ? 1 - spot.fx : spot.fx),
    "--dock-y": along(bottom ? 1 - spot.fy : spot.fy),
    // Room for the panel between the mascot and the far edge (header clear).
    "--panel-max": `calc(100% - var(--dock-y) - var(--dock-size) - 0.75rem - ${bottom ? "5rem" : "var(--dock-m)"})`,
    // Room for the bubble between the mascot and the near edge.
    "--bubble-max": `calc(var(--dock-m) + ${(right ? spot.fx : 1 - spot.fx).toFixed(4)} * (100vw - var(--dock-size) - 2 * var(--dock-m)) - 1.5rem)`,
  } as CSSProperties;
  const dockEdges: CSSProperties = {
    ...(right ? { right: "var(--dock-x)" } : { left: "var(--dock-x)" }),
    ...(bottom ? { bottom: "var(--dock-y)" } : { top: "var(--dock-y)" }),
  };
  const panelEdge = "calc(var(--dock-y) + var(--dock-size) + 0.75rem)";

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
    // Mascot 64px with 12px gutters on phones, 96px with 16px from md.
    <div
      style={placement}
      className="contents [--dock-m:12px] [--dock-size:64px] md:[--dock-m:16px] md:[--dock-size:96px] print:hidden"
    >
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          onKeyDown={onKeyDown}
          style={bottom ? { bottom: panelEdge } : { top: panelEdge }}
          className={cn(
            "surface fixed right-3 left-3 z-30 flex max-h-(--panel-max) flex-col overflow-hidden md:w-[24rem] md:max-h-[min(36rem,var(--panel-max))]",
            right ? "md:right-(--dock-x) md:left-auto" : "md:right-auto md:left-(--dock-x)",
          )}
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

      <div
        style={dockEdges}
        onPointerDown={onPointerDown}
        onClickCapture={(event) => {
          // The click that ends a drag must not toggle the chat.
          if (!draggedRef.current) return;
          draggedRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
        className="rise-in fixed z-30 h-(--dock-size) w-(--dock-size) [--rise-delay:500ms]"
      >
        {nudge && !open && !dragging ? (
          <div
            className={cn(
              "surface rise-in absolute top-1/2 flex w-max max-w-[min(16rem,var(--bubble-max))] -translate-y-1/2 items-start",
              right ? "right-full mr-3" : "left-full ml-3",
            )}
          >
            <button type="button" onClick={openChat} className="min-w-0 flex-1 py-2 pl-3 text-left">
              <span className="type-meta block text-ink">{assistant.nudge.text}</span>
              <span className="mt-0.5 block text-xs text-ink-muted">{assistant.nudge.hint}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                retireNudge();
                launcherRef.current?.focus();
              }}
              aria-label={assistant.nudge.dismissLabel}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            {/* The bubble's tail, pointing at the mascot. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-rule bg-surface-elevated",
                right ? "-right-[6px] border-t border-r" : "-left-[6px] border-b border-l",
              )}
            />
          </div>
        ) : null}

        {/* 96px, scaled to 64px on phones; touch-none so a drag doesn't scroll the page. */}
        <Mascot
          ref={launcherRef}
          directions={assistant.mascot.directions}
          reactions={assistant.mascot.reactions}
          size={96}
          className="touch-none max-md:origin-top-left max-md:scale-[0.6667]"
          ariaLabel={open ? `Close chat: ${assistant.launcherLabel}` : assistant.launcherLabel}
          expanded={open}
          controls={open ? panelId : undefined}
          dragging={dragging}
          onActivate={() => {
            if (open) close();
            else openChat();
          }}
        />

        {/* Chat badge on the corner facing the page, so the mascot reads as a chat. */}
        {!open ? (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-0 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ground bg-primary text-primary-foreground md:h-7 md:w-7",
              right ? "left-0" : "right-0",
            )}
          >
            <MessageCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
