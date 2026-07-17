import type { Metadata } from "next";
import { Trophy, Users2 } from "lucide-react";
import { achievements } from "@/data/achievements";
import { PageHeader } from "@/components/common/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Competition wins and leadership roles of Muhammad Zaid Qasim — AWS Hackathon winner, programming competition finalist, and conference leadership.",
};

export default function AchievementsPage() {
  const competitions = achievements.filter((item) => item.category === "Competition");
  const leadership = achievements.filter((item) => item.category === "Leadership");

  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Achievements"
        description="Competition wins, hackathon trophies, and leadership roles across tech and community events."
      />

      <Section className="pt-0 sm:pt-0">
        <Reveal>
          <SectionHeading
            eyebrow="Competitions"
            title="Competition Wins"
            description="Hackathons and programming contests where I placed."
          />
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {competitions.map((achievement) => (
            <StaggerItem
              key={achievement.id}
              className="card-surface rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Trophy className="h-6 w-6" aria-hidden="true" />
                </span>
                <Badge variant="outline">{achievement.year}</Badge>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">
                {achievement.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {achievement.event}
              </p>
              {achievement.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {achievement.description}
                </p>
              ) : null}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            eyebrow="Leadership"
            title="Leadership & Community"
            description="Conference leadership, event organization, and community roles."
          />
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {leadership.map((achievement) => (
            <StaggerItem
              key={achievement.id}
              className="card-surface rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Users2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <Badge variant="outline">{achievement.year}</Badge>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">
                {achievement.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">{achievement.event}</p>
              {achievement.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {achievement.description}
                </p>
              ) : null}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
