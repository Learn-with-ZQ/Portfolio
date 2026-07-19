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
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right">
            <div className="mx-auto max-w-sm lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-border-strong bg-card">
                <Image
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  width={640}
                  height={853}
                  sizes="(max-width: 1024px) 24rem, 26rem"
                  className="h-auto w-full object-cover"
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
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Professional Biography
              </h2>
            </Reveal>
            {profile.longBio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
              <StaggerItem className="card-surface rounded-2xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{mission}</p>
              </StaggerItem>
              <StaggerItem className="card-surface rounded-2xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{vision}</p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="My Journey So Far"
            description="From first semester to enterprise production systems — the milestones that shaped how I build software."
          />
        </Reveal>
        <ol className="relative space-y-10 border-l border-border pl-8 sm:space-y-12">
          {journey.map((event, index) => (
            <Reveal key={event.year} delay={index * 0.05}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[2.45rem] flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <p className="font-mono text-sm font-semibold text-primary">{event.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {event.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
