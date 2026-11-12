import { createPageMetadata } from "@/lib/metadata";
import { experiences } from "@/data/experience";
import { formatDateRange, formatDuration } from "@/lib/format";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";
import { Badge, Status } from "@/components/ui/badge";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Professional experience of Muhammad Zaid Qasim — Software Developer at E-Creatorz, deployed as Resident Engineer at IoBM, building ERP, CMS, and banking systems.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Experience"
        description="A timeline of roles, responsibilities, and impact — enterprise systems serving thousands of users."
      />
      <Section>
        <ol>
          {experiences.map((experience) => (
            <RecordRow
              as="li"
              key={experience.id}
              className="first:border-t-0 first:pt-0"
              aside={
                <div className="space-y-2">
                  <p className="font-mono text-sm tabular-nums text-ink">
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </p>
                  <p className="font-mono text-sm tabular-nums text-ink-muted">
                    {formatDuration(experience.startDate, experience.endDate)}
                  </p>
                  {experience.endDate === null ? <Status>Current role</Status> : null}
                </div>
              }
              sideClassName="mt-10"
              side={
                <>
                  <h3 className="type-h3">Key responsibilities</h3>
                  <ul className="list-rule mt-4 space-y-3">
                    {experience.responsibilities.map((item) => (
                      <li key={item} className="type-body reveal text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              }
            >
              <h2 className="type-h2">{experience.role}</h2>
              <p className="type-body mt-2">
                <span className="text-ink">{experience.company}</span>
                <span className="text-ink-muted">, {experience.location}</span>
              </p>
              {experience.deployment ? (
                <p className="type-meta mt-1 text-ink-muted">{experience.deployment}</p>
              ) : null}

              <p className="type-body mt-6 text-ink-muted">{experience.summary}</p>

              <h3 className="type-h3 mt-10">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </RecordRow>
          ))}
        </ol>
      </Section>
    </>
  );
}
