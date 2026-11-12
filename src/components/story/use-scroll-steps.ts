"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/** Height of the sticky site header (`top-16`). */
const HEADER = 64;

/**
 * Scrollytelling step tracking. The active step is the one whose centre is
 * nearest the middle of the reading space, so the step being read always sits
 * beside the middle of the diagram. Scrolling only drives state — it is never
 * intercepted, snapped, or slowed down.
 *
 * The reading space is the viewport below the header; on small screens, where
 * the stage is pinned across the top, it starts below the stage instead.
 *
 * It also publishes the pinned diagram's height as `--stage-h` on the layout,
 * which the desktop CSS uses to pin the diagram centred on screen and to pad
 * the step column so the last step can line up with it (`.scrolly-*` in
 * globals.css).
 */
export function useScrollSteps(count: number) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stepElements = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const stepRefs = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => (element: HTMLElement | null) => {
        stepElements.current[index] = element;
      }),
    [count],
  );

  useEffect(() => {
    const layout = layoutRef.current;
    const pin = pinRef.current;
    if (!layout || !pin) return;
    const observer = new ResizeObserver(() => {
      layout.style.setProperty("--stage-h", `${pin.offsetHeight}px`);
    });
    observer.observe(pin);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 1023.98px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      let readingTop = HEADER;
      const stage = stageRef.current;
      if (stage && compact.matches && getComputedStyle(stage).position === "sticky") {
        readingTop = Math.max(HEADER, stage.getBoundingClientRect().bottom);
      }
      const line = readingTop + (viewport - readingTop) / 2;

      let next = 0;
      let nearest = Infinity;
      stepElements.current.forEach((element, index) => {
        if (!element) return;
        const { top, height } = element.getBoundingClientRect();
        const distance = Math.abs(top + height / 2 - line);
        if (distance < nearest) {
          nearest = distance;
          next = index;
        }
      });
      setActive(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { active, layoutRef, stageRef, pinRef, stepRefs };
}
