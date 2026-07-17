import type { Metadata } from "next";
import { Award, ExternalLink, Star } from "lucide-react";
import { certifications } from "@/data/certifications";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications and credentials of Muhammad Zaid Qasim — HackerRank C# certification plus 5-star Python, 4-star Problem Solving, and 3-star SQL badges.",
};

function StarRating({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${count} star rating`}
    >
      {Array.from({ length: count }, (_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Credentials"
        title="Certifications"
        description="Verified certifications and skill badges earned on HackerRank."
      />
      <Section className="pt-0 sm:pt-0">
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {certifications.map((certification) => (
            <StaggerItem
              key={certification.id}
              className="card-surface flex h-full flex-col rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Award className="h-6 w-6" aria-hidden="true" />
                </span>
                <Badge variant="outline">{certification.year}</Badge>
              </div>

              <h2 className="mt-5 text-xl font-bold tracking-tight">
                {certification.name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                Issued by{" "}
                <a
                  href={certification.issuerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {certification.issuer}
                </a>
              </p>

              {certification.stars ? (
                <div className="mt-3">
                  <StarRating count={certification.stars} />
                </div>
              ) : null}

              {certification.credentialUrl ? (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary hover:underline"
                >
                  View Credential
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
