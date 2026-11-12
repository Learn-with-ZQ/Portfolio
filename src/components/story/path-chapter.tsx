"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/profile";
import { pathChapter } from "@/data/story";
import { Container } from "@/components/ui/container";
import { Status } from "@/components/ui/badge";
import { ChapterHeading } from "@/components/story/chapter-heading";

/**
 * The timeline chapter. A rail fills as you read; each milestone takes its
 * status colour once the rail reaches it — primary for done, pending for the
 * one still in progress. With reduced motion it shows the finished state.
 */
export function PathChapter() {
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    const rail = railRef.current;
    if (!list || !rail) return;

    // The rail runs from the first marker's centre to the last one's.
    const center = (marker: HTMLSpanElement) => {
      const rect = marker.getBoundingClientRect();
      return rect.top + rect.height / 2;
    };
    const layoutRail = () => {
      const markers = markerRefs.current.filter((marker): marker is HTMLSpanElement => Boolean(marker));
      if (markers.length < 2) return;
      const top = center(markers[0]) - list.getBoundingClientRect().top;
      const bottom = center(markers[markers.length - 1]) - list.getBoundingClientRect().top;
      rail.style.top = `${top}px`;
      rail.style.height = `${bottom - top}px`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      layoutRail();
      list.style.setProperty("--fill", "1");
      setReached(journey.length);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.6;
      const markers = markerRefs.current;
      const first = markers[0];
      const last = markers[markers.length - 1];
      if (first && last) {
        const start = center(first);
        const span = center(last) - start;
        const fill = span > 0 ? Math.min(1, Math.max(0, (line - start) / span)) : 0;
        list.style.setProperty("--fill", fill.toFixed(4));
      }
      setReached(markers.filter((marker) => marker && center(marker) <= line).length);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      layoutRail();
      schedule();
    };

    layoutRail();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const headingId = `${pathChapter.id}-title`;

  return (
    <section id={pathChapter.id} aria-labelledby={headingId} className="border-t border-rule">
      <Container className="py-12 lg:py-14">
        <ChapterHeading chapter={pathChapter} headingId={headingId} />

        {/* From xl each milestone reads year | title | description across the
            page, rather than leaving the right half empty beside a 3xl column. */}
        <ol ref={listRef} className="relative mt-12 max-w-3xl xl:max-w-none">
          <span
            ref={railRef}
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[6.5px] w-px bg-rule-strong"
          >
            <span className="absolute inset-0 origin-top scale-y-[var(--fill,0)] bg-ink" />
          </span>

          {journey.map((event, index) => {
            const isReached = index < reached;
            return (
              <li
                key={`${event.year}-${event.title}`}
                className="relative pb-12 pl-10 last:pb-0 md:grid md:grid-cols-[6rem_minmax(0,1fr)] md:gap-x-8 xl:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)] xl:gap-x-12"
              >
                <span
                  ref={(marker) => {
                    markerRefs.current[index] = marker;
                  }}
                  aria-hidden="true"
                  data-reached={isReached}
                  data-status={event.inProgress ? "pending" : "done"}
                  className="absolute top-[0.3rem] left-0 h-3.5 w-3.5 rounded-full border-2 border-rule-strong bg-ground transition-colors duration-300 data-[reached=true]:data-[status=done]:border-primary data-[reached=true]:data-[status=done]:bg-primary data-[reached=true]:data-[status=pending]:border-pending data-[reached=true]:data-[status=pending]:bg-pending"
                />
                <p className="font-mono text-sm leading-6 tabular-nums text-ink-muted">
                  {event.year}
                </p>
                <div className="mt-1 md:mt-0 xl:contents">
                  <div>
                    <h3 className="type-h3">{event.title}</h3>
                    {event.inProgress ? (
                      <Status tone="pending" emphasis className="mt-2">
                        In progress
                      </Status>
                    ) : null}
                  </div>
                  <p className="type-body mt-2 text-ink-muted xl:mt-0">{event.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
