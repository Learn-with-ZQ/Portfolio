import { pathChapter } from "@/data/story";
import { Container } from "@/components/ui/container";
import { ChapterHeading } from "@/components/story/chapter-heading";
import { JourneyTimeline } from "@/components/story/journey-timeline";
import type { TimelineEvent } from "@/types";

/**
 * The home page's fourth chapter: the journey timeline (rail, markers, scroll
 * fill — `JourneyTimeline`, shared with the About page) under its chapter
 * heading. `journey` comes from the home page, through `lib/content`.
 */
export function PathChapter({ journey }: { journey: TimelineEvent[] }) {
  const headingId = `${pathChapter.id}-title`;

  return (
    <section id={pathChapter.id} aria-labelledby={headingId} className="border-t border-rule">
      <Container className="py-12 lg:py-14">
        <ChapterHeading chapter={pathChapter} headingId={headingId} />
        <JourneyTimeline journey={journey} className="mt-12" />
      </Container>
    </section>
  );
}
