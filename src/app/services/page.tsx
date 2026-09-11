import { createPageMetadata } from "@/lib/metadata";
import { services } from "@/data/services";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Services offered by Muhammad Zaid Qasim — backend and API development, database optimization, enterprise web applications, cross-platform mobile apps, and production support.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Practical engineering services grounded in real enterprise delivery — from APIs and databases to mobile apps and production support."
      />
      <Section>
        {/* Three across only from xl: at lg it left 222px of measure. */}
        <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <li key={service.id} className="min-w-0 border-t border-rule pt-6">
              <h2 className="type-h3">{service.title}</h2>
              <p className="type-body mt-3 text-ink-muted">{service.description}</p>
              <ul className="list-rule mt-5 space-y-2">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="type-meta text-ink">
                    {deliverable}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section rule labelledBy="services-cta-title" className="bg-surface">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 id="services-cta-title" className="type-h2 max-w-xl text-balance">
            Need something built — or rescued in production?
          </h2>
          <ButtonLink href="/contact" size="lg">
            Start a conversation
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
