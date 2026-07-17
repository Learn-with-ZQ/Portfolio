import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Globe,
  Lightbulb,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";
import { services } from "@/data/services";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Services offered by Muhammad Zaid Qasim — backend and API development, database optimization, enterprise web applications, cross-platform mobile apps, and production support.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  server: Server,
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  shield: Shield,
  lightbulb: Lightbulb,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What I Offer"
        title="Services"
        description="Practical engineering services grounded in real enterprise delivery — from APIs and databases to mobile apps and production support."
      />
      <Section className="pt-0 sm:pt-0">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Server;
            return (
              <StaggerItem
                key={service.id}
                className="card-surface flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-bold tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-muted">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <p className="text-base text-muted">
            Need something built — or rescued in production?
          </p>
          <ButtonLink href="/contact" size="lg" className="mt-4">
            Start a Conversation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
