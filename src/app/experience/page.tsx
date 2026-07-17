import { createPageMetadata } from "@/lib/metadata";
import { Building2, CheckCircle2, MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { formatDateRange, formatDuration } from "@/lib/format";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

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
        eyebrow="Career"
        title="Experience"
        description="A timeline of roles, responsibilities, and impact — enterprise systems serving thousands of users."
      />
      <Section className="pt-0 sm:pt-0">
        <ol className="relative space-y-12 border-l border-border pl-8">
          {experiences.map((experience, index) => (
            <Reveal key={experience.id} delay={index * 0.05}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[2.45rem] flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>

                <div className="card-surface rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="font-mono text-sm font-semibold text-primary">
                      {formatDateRange(experience.startDate, experience.endDate)}
                    </p>
                    <Badge variant="accent">
                      {formatDuration(experience.startDate, experience.endDate)}
                    </Badge>
                    {experience.endDate === null ? (
                      <Badge variant="primary">Current</Badge>
                    ) : null}
                  </div>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight">
                    {experience.role}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                      {experience.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {experience.location}
                    </span>
                  </div>
                  {experience.deployment ? (
                    <p className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                      {experience.deployment}
                    </p>
                  ) : null}

                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {experience.summary}
                  </p>

                  <h3 className="mt-6 text-sm font-semibold tracking-wider uppercase">
                    Key Responsibilities
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {experience.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-muted sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-6 text-sm font-semibold tracking-wider uppercase">
                    Technologies
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
