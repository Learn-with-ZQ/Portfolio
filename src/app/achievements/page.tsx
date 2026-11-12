import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { achievements } from "@/data/achievements";
import type { Achievement } from "@/types";
import { PageHeader } from "@/components/common/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";

export const metadata = createPageMetadata({
  title: "Achievements",
  description:
    "Research, competition wins and leadership roles of Muhammad Zaid Qasim — AIIE 2026 conference paper, AWS Hackathon winner, programming competition finalist, and conference leadership.",
  path: "/achievements",
});

function AchievementList({ items }: { items: Achievement[] }) {
  return (
    <ol>
      {items.map((achievement) => (
        <RecordRow
          as="li"
          key={achievement.id}
          aside={
            <p className="font-mono text-sm tabular-nums text-ink-muted">{achievement.year}</p>
          }
          sideClassName="mt-2"
          side={
            achievement.description || achievement.link ? (
              <>
                {achievement.description ? (
                  <p className="type-body text-ink-muted">{achievement.description}</p>
                ) : null}
                {achievement.link ? (
                  <Link
                    href={achievement.link.href}
                    className="link type-meta mt-3 inline-block font-medium"
                  >
                    {achievement.link.label}
                  </Link>
                ) : null}
              </>
            ) : undefined
          }
        >
          <h3 className="type-h3">{achievement.title}</h3>
          <p className="type-body mt-1 text-ink">{achievement.event}</p>
        </RecordRow>
      ))}
    </ol>
  );
}

export default function AchievementsPage() {
  const research = achievements.filter((item) => item.category === "Research");
  const competitions = achievements.filter((item) => item.category === "Competition");
  const leadership = achievements.filter((item) => item.category === "Leadership");

  return (
    <>
      <PageHeader
        title="Achievements"
        description="Research, competition wins, hackathon trophies, and leadership roles across tech and community events."
      />

      <Section labelledBy="research-title">
        <SectionHeading
          id="research-title"
          title="Research"
          description="Conference papers I have co-authored and presented."
        />
        <AchievementList items={research} />
      </Section>

      <Section rule labelledBy="competitions-title">
        <SectionHeading
          id="competitions-title"
          title="Competition wins"
          description="Hackathons and programming contests where I placed."
        />
        <AchievementList items={competitions} />
      </Section>

      <Section rule labelledBy="leadership-title">
        <SectionHeading
          id="leadership-title"
          title="Leadership and community"
          description="Conference leadership, event organization, and community roles."
        />
        <AchievementList items={leadership} />
      </Section>
    </>
  );
}
