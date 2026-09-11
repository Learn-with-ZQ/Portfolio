import Image from "next/image";
import { journey, mission, profile, vision } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
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
        <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          {/* The sticky rail is the aside's only child, so it can't slide over anything. */}
          <aside className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={853}
                sizes="(max-width: 1024px) 18rem, 17rem"
                className="h-auto w-full max-w-72 rounded-[10px] border border-rule object-cover"
              />
              <h2 className="type-meta mt-6 font-semibold text-ink">Focus areas</h2>
              <ul className="mt-2">
                {profile.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="type-meta border-t border-rule py-2.5 text-ink-muted"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="min-w-0">
            <h2 id="bio-title" className="type-h2 text-balance">
              Building reliable systems that serve real people.
            </h2>
            <div className="mt-6 space-y-5">
              {profile.longBio.map((paragraph, index) => (
                <p key={index} className="type-body text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section rule labelledBy="principles-title">
        <h2 id="principles-title" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="type-h3">Mission</h3>
            <p className="type-body mt-3 text-ink-muted">{mission}</p>
          </div>
          <div>
            <h3 className="type-h3">Vision</h3>
            <p className="type-body mt-3 text-ink-muted">{vision}</p>
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
              key={event.year}
              aside={
                <p className="font-mono text-sm tabular-nums text-ink-muted">{event.year}</p>
              }
            >
              <h3 className="type-h3">{event.title}</h3>
              <p className="type-body mt-2 text-ink-muted">{event.description}</p>
            </RecordRow>
          ))}
        </ol>
      </Section>
    </>
  );
}
