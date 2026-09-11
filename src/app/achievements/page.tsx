import { createPageMetadata } from "@/lib/metadata";
import { achievements } from "@/data/achievements";
import type { Achievement } from "@/types";
import { PageHeader } from "@/components/common/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";

export const metadata = createPageMetadata({
  title: "Achievements",
  description:
    "Competition wins and leadership roles of Muhammad Zaid Qasim — AWS Hackathon winner, programming competition finalist, and conference leadership.",
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
        >
          <h3 className="type-h3">{achievement.title}</h3>
          <p className="type-body mt-1 text-ink">{achievement.event}</p>
          {achievement.description ? (
            <p className="type-body mt-2 text-ink-muted">{achievement.description}</p>
          ) : null}
        </RecordRow>
      ))}
    </ol>
  );
}

export default function AchievementsPage() {
  const competitions = achievements.filter((item) => item.category === "Competition");
  const leadership = achievements.filter((item) => item.category === "Leadership");

  return (
    <>
      <PageHeader
        title="Achievements"
        description="Competition wins, hackathon trophies, and leadership roles across tech and community events."
      />

      <Section labelledBy="competitions-title">
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
