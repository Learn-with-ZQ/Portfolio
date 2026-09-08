import Image from "next/image";
import { Compass, Target } from "lucide-react";
import { journey, mission, profile, vision } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Professional biography of Muhammad Zaid Qasim — Software Developer at E-Creatorz, Resident Engineer at IoBM, and MS Data Science student at NED University.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Me"
        title="Engineering with purpose"
        description={profile.shortBio}
      />

      <Section className="pt-0 sm:pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal direction="right">
            <div className="space-y-6">
              <div className="section-shell rounded-[2rem] p-6 sm:p-8 lg:sticky lg:top-28">
                <div className="relative mx-auto max-w-sm">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-border-strong"
                  />
                  <Image
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    width={640}
                    height={853}
                    sizes="(max-width: 1024px) 24rem, 26rem"
                    className="relative h-auto w-full rounded-[2rem] border border-border object-cover"
                  />
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {profile.highlights.map((highlight) => (
                    <Badge key={highlight} variant="primary">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <Stagger className="grid gap-6 sm:grid-cols-2">
                <StaggerItem className="surface-panel rounded-[1.6rem] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      <Target className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">Mission</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                        {mission}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem className="surface-panel rounded-[1.6rem] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Compass className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">Vision</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                        {vision}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>
          </Reveal>

          <Reveal>
            <div className="section-shell rounded-[2rem] p-8 sm:p-10">
              <p className="text-sm font-semibold tracking-[0.28em] text-primary uppercase">
                Professional Biography
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Building reliable systems that serve real people.
              </h2>
              {profile.longBio.map((paragraph, index) => (
                <p key={index} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border/60">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="My Journey So Far"
            description="From first semester to enterprise production systems — the milestones that shaped how I build software."
          />
        </Reveal>
        <ol className="relative space-y-8 border-l border-border/70 pl-8 sm:space-y-10">
          {journey.map((event, index) => (
            <Reveal key={event.year} delay={index * 0.05}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-3 -left-[2.45rem] flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <div className="surface-panel rounded-[1.5rem] p-6 sm:p-8">
                  <p className="font-mono text-sm font-semibold text-primary">{event.year}</p>
                  <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {event.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
