import Image from "next/image";
import { journey, mission, profile, vision } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Stats } from "@/components/home/stats";
import { Section, SectionHeading } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Professional biography of Muhammad Zaid Qasim — Software Developer at E-Creatorz, Resident Engineer at IoBM, and MS Data Science student at NED University.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Engineering with purpose" description={profile.shortBio} />

      <Section labelledBy="bio-title">
        {/*
          Three tracks from 2xl: portrait rail, biography, then mission, vision
          and figures. The biography stops at 68ch, so with two tracks a wide
          screen left half the page empty (user report, 2026-11-11). At xl the
          biography would shrink to ~390px, so the third track waits for 2xl.
          Below 2xl
          the third block drops under the biography, and the rail spans both
          rows so it stays sticky beside them.
        */}
        <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-x-16 2xl:grid-cols-[17rem_minmax(0,1fr)_minmax(0,1fr)]">
          {/* The sticky rail is the aside's only child, so it can't slide over anything. */}
          <aside className="min-w-0 lg:row-span-2 2xl:row-span-1">
            <div className="lg:sticky lg:top-24">
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={853}
                sizes="(max-width: 1024px) 18rem, 17rem"
                className="h-auto w-full max-w-72 rounded-[10px] border border-rule object-cover"
              />
              <h2 className="type-meta reveal mt-6 font-semibold text-ink">Focus areas</h2>
              <ul className="mt-2">
                {profile.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="type-meta reveal border-t border-rule py-2.5 text-ink-muted"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="min-w-0">
            <h2 id="bio-title" className="type-h2 reveal text-balance">
              Building reliable systems that serve real people.
            </h2>
            <div className="mt-6 space-y-5">
              {profile.longBio.map((paragraph, index) => (
                <p key={index} className="type-body reveal text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal min-w-0 lg:col-start-2 2xl:col-start-3 2xl:row-start-1">
            <h2 className="sr-only">Mission, vision and figures</h2>
            {/* Side by side only where the block is wide enough: full width
                at md, beside the rail at xl. Stacked at lg and in the 2xl column. */}
            <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1 lg:gap-10 xl:grid-cols-2 xl:gap-12 2xl:grid-cols-1 2xl:gap-10">
              <div>
                <h3 className="type-h3">Mission</h3>
                <p className="type-body mt-3 text-ink-muted">{mission}</p>
              </div>
              <div>
                <h3 className="type-h3">Vision</h3>
                <p className="type-body mt-3 text-ink-muted">{vision}</p>
              </div>
            </div>
            <div className="mt-12">
              <Stats compact />
            </div>
          </div>
        </div>
      </Section>

      <Section rule labelledBy="journey-title">
        <SectionHeading
          id="journey-title"
          title="My journey so far"
          description="From first semester to enterprise production systems — the milestones that shaped how I build software."
        />
        <ol>
          {journey.map((event) => (
            <RecordRow
              as="li"
              key={`${event.year}-${event.title}`}
              aside={
                <p className="font-mono text-sm tabular-nums text-ink-muted">{event.year}</p>
              }
              sideClassName="mt-2"
              side={<p className="type-body text-ink-muted">{event.description}</p>}
            >
              <h3 className="type-h3">{event.title}</h3>
            </RecordRow>
          ))}
        </ol>
      </Section>
    </>
  );
}
