import { ExternalLink } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { certifications } from "@/data/certifications";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { Rating } from "@/components/ui/rating";

export const metadata = createPageMetadata({
  title: "Certifications",
  description:
    "Certifications and credentials of Muhammad Zaid Qasim — HackerRank C# certification plus 5-star Python, 4-star Problem Solving, and 3-star SQL badges.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        title="Certifications"
        description="Verified certifications and skill badges earned on HackerRank."
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2">
          {certifications.map((certification) => (
            <li key={certification.id} className="surface reveal flex min-w-0 flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="type-h3">{certification.name}</h2>
                <span className="font-mono text-sm tabular-nums text-ink-muted">
                  {certification.year}
                </span>
              </div>
              <p className="type-meta mt-1 text-ink-muted">
                Issued by{" "}
                <a
                  href={certification.issuerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {certification.issuer}
                </a>
              </p>

              {certification.stars ? (
                <Rating value={certification.stars} className="mt-4" />
              ) : null}

              {certification.credentialUrl ? (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link type-meta mt-auto inline-flex items-center gap-1.5 self-start pt-6 font-medium"
                >
                  View credential
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
