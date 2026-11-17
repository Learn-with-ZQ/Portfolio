"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Weighted, smooth scrolling on desktop, and a gentle settle in the story
 * chapters (user requests, 2026-11-17).
 *
 * History: native scrolling felt too free through the story chapters; CSS
 * proximity snapping then felt "like ticks, like a combination lock" — every
 * wheel notch that stopped near a step was pulled onto it. What was wanted:
 * smooth, but with resistance, and when the reader stops inside a chapter the
 * nearest step ends up level with the middle of the diagram, even after a
 * hard flick.
 *
 * So:
 * 1. Lenis damps the wheel: each notch moves less (WHEEL_MULTIPLIER) and the
 *    page glides to it (LERP) instead of jumping — the resistance.
 * 2. Once scrolling has been quiet for SETTLE_MS inside a chapter's step
 *    column, the nearest step glides once to the reading centre line (the
 *    same line the story engine uses, so it becomes the active step). One
 *    settle per stop, never per notch — no ticking.
 *
 * Desktop with a mouse/trackpad only (`pointer: fine`, lg+): touch scrolling
 * stays native. Off entirely under prefers-reduced-motion. Elements that
 * scroll on their own (the chat log) carry `data-lenis-prevent`. Lenis sets
 * the position with `behavior: "instant"`, so it doesn't fight the native
 * smooth scrolling of anchor links (`html { scroll-behavior: smooth }`).
 */
const LERP = 0.08; // lower = heavier, longer glide (Lenis default 0.1)
const WHEEL_MULTIPLIER = 0.7; // < 1: each wheel notch moves less
const SETTLE_MS = 180; // quiet time before the nearest step settles
const SETTLE_DURATION = 0.7; // seconds for that one glide
const HEADER = 64; // sticky header height, as in use-scroll-steps.ts

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Distance (px) from the reading centre line to the nearest step's centre,
 *  if the line is inside a chapter's step column; otherwise null. */
function nearestStepOffset(): number | null {
  const line = HEADER + (window.innerHeight - HEADER) / 2;
  for (const list of document.querySelectorAll<HTMLElement>(".scrolly-steps")) {
    const steps = [...list.querySelectorAll<HTMLElement>(":scope > li")];
    if (steps.length === 0) continue;
    const first = steps[0].getBoundingClientRect();
    const last = steps[steps.length - 1].getBoundingClientRect();
    if (line < first.top || line > last.bottom) continue;
    let best: number | null = null;
    for (const step of steps) {
      const { top, height } = step.getBoundingClientRect();
      const offset = top + height / 2 - line;
      if (best === null || Math.abs(offset) < Math.abs(best)) best = offset;
    }
    return best;
  }
  return null;
}

export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

    const lenis = new Lenis({ lerp: LERP, wheelMultiplier: WHEEL_MULTIPLIER, autoRaf: true });

    let timer: number | undefined;
    const settle = () => {
      const offset = nearestStepOffset();
      if (offset === null || Math.abs(offset) < 2) return;
      lenis.scrollTo(lenis.scroll + offset, { duration: SETTLE_DURATION, easing: easeOutCubic });
    };
    const off = lenis.on("scroll", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, SETTLE_MS);
    });

    return () => {
      window.clearTimeout(timer);
      off();
      lenis.destroy();
    };
  }, []);

  return null;
}
