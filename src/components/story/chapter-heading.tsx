import Link from "next/link";
import type { StoryChapterMeta } from "@/types";

interface ChapterHeadingProps {
  chapter: StoryChapterMeta;
  headingId: string;
}

export function ChapterHeading({ chapter, headingId }: ChapterHeadingProps) {
  return (
    <header className="reveal max-w-3xl">
      <p className="type-meta flex flex-wrap gap-x-3 text-ink-muted">
        <span className="font-mono tabular-nums text-ink">{chapter.number}</span>
        <span>{chapter.context}</span>
      </p>
      <h2 id={headingId} className="type-h1 mt-3 text-balance">
        {chapter.title}
      </h2>
      {chapter.link ? (
        <Link href={chapter.link.href} className="link type-meta mt-4 inline-block font-medium">
          {chapter.link.label}
        </Link>
      ) : null}
    </header>
  );
}
