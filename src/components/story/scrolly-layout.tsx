import type { ReactNode, RefObject } from "react";
import type { StoryChapter } from "@/types";
import { Container } from "@/components/ui/container";
import { ChapterHeading } from "@/components/story/chapter-heading";
import { cn } from "@/lib/utils";

interface ScrollyLayoutProps {
  chapter: StoryChapter;
  active: number;
  stage: ReactNode;
  layoutRef: RefObject<HTMLDivElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
  stepRefs: Array<(element: HTMLElement | null) => void>;
  stageSide?: "left" | "right";
}

/**
 * A pinned diagram beside a column of scrolling steps.
 *
 * Small screens: flex column — heading, stage, steps. The stage is a sticky
 * flex item, so it stays pinned below the header while the steps scroll
 * underneath it — a deliberate overlap (UI.md R5 is about accidental ones),
 * hence its opaque background. Phones shorter than 700px don't pin at all.
 *
 * Desktop: two-track grid. The heading tops the text column and the steps
 * follow it directly; the stage spans both rows in its own column, so it
 * can't slide over anything. It starts level with the heading and pins
 * centred on screen (`.scrolly-pin`), so there is no empty band between the
 * heading and the first step, nor above or below the diagram.
 *
 * Each step's text is centred in its slot and the engine activates the step
 * nearest the middle of the screen, so the step being read sits beside the
 * middle of the diagram.
 */
export function ScrollyLayout({
  chapter,
  active,
  stage,
  layoutRef,
  stageRef,
  pinRef,
  stepRefs,
  stageSide = "right",
}: ScrollyLayoutProps) {
  const headingId = `${chapter.id}-title`;
  const stageLeft = stageSide === "left";
  const textColumn = stageLeft ? "lg:col-start-2" : "lg:col-start-1";

  return (
    <section id={chapter.id} aria-labelledby={headingId} className="border-t border-rule">
      <Container className="pt-12 lg:pt-14">
        <div
          ref={layoutRef}
          className={cn(
            "flex flex-col lg:grid lg:grid-rows-[auto_1fr] lg:gap-x-16",
            stageLeft
              ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
              : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
          )}
        >
          <div className={cn("lg:row-start-1", textColumn)}>
            <ChapterHeading chapter={chapter} headingId={headingId} />
          </div>

          <div
            ref={stageRef}
            className={cn(
              "sticky top-16 z-10 -mx-5 mt-8 border-b border-rule bg-ground px-5 py-3 sm:-mx-8 sm:px-8",
              "max-lg:[@media(max-height:699px)]:static",
              "lg:static lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:border-0 lg:bg-transparent lg:p-0",
              stageLeft ? "lg:col-start-1" : "lg:col-start-2",
            )}
          >
            <div ref={pinRef} className="scrolly-pin">
              {stage}
            </div>
          </div>

          <ol className={cn("scrolly-steps max-lg:pt-8 max-lg:pb-[25svh] lg:row-start-2", textColumn)}>
            {chapter.steps.map((step, index) => (
              <li
                key={step.title}
                ref={stepRefs[index]}
                data-active={index === active}
                className="group/step flex min-h-[36svh] flex-col justify-center lg:min-h-[26svh]"
              >
                <div className="border-l-2 border-rule py-1 pl-5 transition-colors duration-300 group-data-[active=true]/step:border-ink">
                  <h3 className="type-h3 text-ink-muted transition-colors duration-300 group-data-[active=true]/step:text-ink">
                    {step.title}
                  </h3>
                  <p className="type-body mt-2 text-ink-muted transition-colors duration-300 group-data-[active=true]/step:text-ink">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
