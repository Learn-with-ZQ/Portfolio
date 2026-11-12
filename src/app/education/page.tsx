import { createPageMetadata } from "@/lib/metadata";
import { educationList } from "@/data/education";
import { formatDateRange } from "@/lib/format";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";
import { Badge, Status } from "@/components/ui/badge";

export const metadata = createPageMetadata({
  title: "Education",
  description:
    "Academic background of Muhammad Zaid Qasim — MS Data Science at NED University and BS Computer Science at PAF-KIET, Karachi.",
  path: "/education",
});

export default function EducationPage() {
  return (
    <>
      <PageHeader
        title="Education"
        description="Degrees, coursework, and the academic foundation behind my engineering work."
      />
      <Section>
        <ol>
          {educationList.map((education) => (
            <RecordRow
              as="li"
              key={education.id}
              className="first:border-t-0 first:pt-0"
              aside={
                <div className="space-y-2">
                  <p className="font-mono text-sm tabular-nums text-ink">
                    {formatDateRange(education.startDate, education.endDate)}
                  </p>
                  {education.endDate === null ? (
                    <Status tone="pending">In progress</Status>
                  ) : (
                    <Status tone="verified">Completed</Status>
                  )}
                </div>
              }
              side={
                <>
                  <h3 className="type-h3">Relevant coursework</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {education.coursework.map((course) => (
                      <li key={course}>
                        <Badge>{course}</Badge>
                      </li>
                    ))}
                  </ul>
                </>
              }
            >
              <h2 className="type-h2">{education.degree}</h2>
              <p className="type-body mt-2 text-ink">{education.institute}</p>
              <p className="type-meta mt-1 text-ink-muted">{education.location}</p>

              {education.cgpa ? (
                <dl className="mt-6 flex items-baseline gap-3">
                  <dt className="type-meta text-ink-muted">CGPA</dt>
                  <dd className="font-mono tabular-nums text-ink">{education.cgpa}</dd>
                </dl>
              ) : null}
            </RecordRow>
          ))}
        </ol>
      </Section>
    </>
  );
}
