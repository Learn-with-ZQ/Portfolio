/*
 * Adapted from page-mascot 0.1.0 (https://github.com/nilbuild/page-mascot),
 * src/mascot.tsx. Changes: hover and keyboard focus show an expression (a tap
 * on touch screens), a click opens the chat (`onActivate`), `dragging` shows
 * the dizzy face while the visitor moves it, and the button carries its own
 * aria-label / aria-expanded / aria-controls.
 *
 * MIT License
 *
 * Copyright (c) 2026 Kamran Ahmed <https://kamran.fyi>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, Ref } from "react";

const DIRECTIONS = [
  "up-left",
  "up",
  "up-right",
  "left",
  "center",
  "right",
  "down-left",
  "down",
  "down-right",
] as const;

const REACTIONS = [
  "blink",
  "heart",
  "sparkle",
  "surprised",
  "wink",
  "bashful",
  "sleepy",
  "dizzy",
  "delighted",
] as const;

type Direction = (typeof DIRECTIONS)[number];
type Reaction = (typeof REACTIONS)[number];

// Clockwise from the right, matching atan2 with y pointing down.
const CLOCKWISE: Direction[] = [
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
  "up",
  "up-right",
];
const SECTOR = (Math.PI * 2) / CLOCKWISE.length;
const HYSTERESIS = 0.12;
const DEAD_ZONE = 70;

// Hovering (or keyboard focus) shows an expression, a different one each time.
const HOVER_REACTIONS: Reaction[] = ["heart", "sparkle", "delighted", "wink", "bashful", "surprised"];
// A blink first, then the expression lands.
const BLINK_MS = 120;
// Touch screens have no hover, so a tap shows one expression for this long.
const TAP_HOLD_MS = 700;
const SQUASH_MS = 420;

const SQUASH: Keyframe[] = [
  { transform: "scale(1, 1)", easing: "ease-in" },
  { transform: "scale(1.10, 0.86)", offset: 0.18, easing: "ease-out" },
  { transform: "scale(0.95, 1.08)", offset: 0.45, easing: "ease-in-out" },
  { transform: "scale(1.03, 0.97)", offset: 0.72, easing: "ease-in-out" },
  { transform: "scale(1, 1)" },
];

// background-size 300% makes each cell a clean 0/50/100% step on both axes.
function cell(index: number): CSSProperties {
  return { backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%` };
}

function wrap(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

const layer: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundSize: "300% 300%",
  backgroundRepeat: "no-repeat",
};

export interface MascotProps {
  /** The 3x3 sheet of head directions (a served path). */
  directions: string;
  /** The 3x3 sheet of expressions. */
  reactions: string;
  size?: number;
  className?: string;
  /** Accessible name of the button. */
  ariaLabel: string;
  /** Called on every click (opens the chat). Hover and focus only show an expression. */
  onActivate?: () => void;
  expanded?: boolean;
  controls?: string;
  /** Being dragged to a new spot: shows the dizzy face until dropped. */
  dragging?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Mascot({
  directions,
  reactions,
  size = 140,
  className,
  ariaLabel,
  onActivate,
  expanded,
  controls,
  dragging = false,
  ref,
}: MascotProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const squashRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<number[]>([]);
  const nextReactionRef = useRef(0);
  const [direction, setDirection] = useState<Direction>("center");
  const [reaction, setReaction] = useState<Reaction | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let sector = -1;
    let pointer: { x: number; y: number } | null = null;

    const aim = () => {
      const button = buttonRef.current;
      if (!button || !pointer) {
        return;
      }

      const box = button.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height / 2);

      if (Math.hypot(dx, dy) < DEAD_ZONE) {
        sector = -1;
        setDirection("center");
        return;
      }

      // Hold the current sector until the pointer is well past its edge.
      const angle = Math.atan2(dy, dx);
      if (sector !== -1 && Math.abs(wrap(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS) {
        return;
      }

      sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
      setDirection(CLOCKWISE[sector]);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      aim();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", aim, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", aim);
    };
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const clearTimers = () => {
    // Emptied in place (not reassigned) so the unmount cleanup holds the live list.
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current.length = 0;
  };

  const later = (ms: number, next: Reaction | null) => {
    timersRef.current.push(window.setTimeout(() => setReaction(next), ms));
  };

  /** Blink, then show the next expression; hold it until `settle`, or for `holdMs`. */
  const react = (holdMs?: number) => {
    clearTimers();
    const next = HOVER_REACTIONS[nextReactionRef.current % HOVER_REACTIONS.length];
    nextReactionRef.current += 1;
    setReaction("blink");
    later(BLINK_MS, next);
    if (holdMs) later(BLINK_MS + holdMs, null);
  };

  const settle = () => {
    clearTimers();
    setReaction(null);
  };

  const onClick = () => {
    if (!window.matchMedia("(hover: hover)").matches) react(TAP_HOLD_MS);

    onActivate?.();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Per-keyframe easing with the effect itself linear: an easing on the effect
    // would reinterpret every offset and front-load the whole bounce.
    squashRef.current?.animate(SQUASH, { duration: SQUASH_MS, easing: "linear" });
  };

  const setButton = (node: HTMLButtonElement | null) => {
    buttonRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const shown: Reaction | null = dragging ? "dizzy" : reaction;

  // Inline styles so the file drops into any project without a CSS framework.
  return (
    <button
      ref={setButton}
      type="button"
      onClick={onClick}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") react();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") settle();
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) react();
      }}
      onBlur={settle}
      aria-label={ariaLabel}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-haspopup={expanded === undefined ? undefined : "dialog"}
      className={className}
      style={{
        position: "relative",
        display: "block",
        flexShrink: 0,
        width: size,
        height: size,
        padding: 0,
        border: 0,
        background: "transparent",
        appearance: "none",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        ref={squashRef}
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          height: "100%",
          transformOrigin: "50% 78%",
        }}
      >
        <span
          style={{
            ...layer,
            backgroundImage: `url(${directions})`,
            ...cell(DIRECTIONS.indexOf(direction)),
            opacity: shown ? 0 : 1,
          }}
        />
        {/* Always mounted so the sheet is fetched up front, never on the first click. */}
        <span
          style={{
            ...layer,
            backgroundImage: `url(${reactions})`,
            ...cell(REACTIONS.indexOf(shown ?? "blink")),
            opacity: shown ? 1 : 0,
          }}
        />
      </span>
    </button>
  );
}
