import { storyChapters } from "@/data/story";

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven"];

/**
 * The hero's table of contents. The chapters are a real sequence, so they're
 * numbered — and every one is a plain anchor, so nobody has to scroll through
 * the story to reach a part of it.
 */
export function StoryIndex() {
  const count = numberWords[storyChapters.length] ?? String(storyChapters.length);

  return (
    <nav aria-labelledby="story-index-title" className="rise-in min-w-0 [--rise-delay:220ms]">
      <h2 id="story-index-title" className="type-meta font-semibold text-ink">
        The work, in {count} chapters
      </h2>
      <ol className="mt-3 border-b border-rule">
        {storyChapters.map((chapter) => (
          <li key={chapter.id} className="border-t border-rule">
            <a
              href={`#${chapter.id}`}
              className="group grid min-h-11 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-4"
            >
              <span className="pt-px font-mono text-sm tabular-nums text-ink-muted">
                {chapter.number}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink decoration-1 underline-offset-4 group-hover:underline">
                  {chapter.title}
                </span>
                <span className="type-meta block text-ink-muted">{chapter.context}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
