import { createPageMetadata } from "@/lib/metadata";
import { BookOpen, GraduationCap, MapPin, Trophy } from "lucide-react";
import { educationList } from "@/data/education";
import { formatDateRange } from "@/lib/format";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

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
        eyebrow="Academics"
        title="Education"
        description="Degrees, coursework, and the academic foundation behind my engineering work."
      />
      <Section className="pt-0 sm:pt-0">
        <Stagger className="grid gap-6 lg:grid-cols-2">
          {educationList.map((education) => (
            <StaggerItem
              key={education.id}
              className="card-surface flex h-full flex-col rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </span>
                {education.endDate === null ? (
                  <Badge variant="primary">In Progress</Badge>
                ) : (
                  <Badge variant="accent">Completed</Badge>
                )}
              </div>

              <h2 className="mt-5 text-xl font-bold tracking-tight">
                {education.degree}
              </h2>
              <p className="mt-2 text-base font-medium text-muted">
                {education.institute}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {education.location}
                </span>
                <span className="font-mono">
                  {formatDateRange(education.startDate, education.endDate)}
                </span>
              </div>

              {education.cgpa ? (
                <p className="mt-4 inline-flex w-max items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent">
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                  CGPA {education.cgpa}
                </p>
              ) : null}

              <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                Relevant Coursework
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <Badge key={course}>{course}</Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
