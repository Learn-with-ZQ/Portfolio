import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { contactInfo } from "@/data/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the portfolio website of Muhammad Zaid Qasim — no cookies, no tracking, no data collection.",
};

const sections = [
  {
    title: "What this site collects",
    body: "Almost nothing. This portfolio has no analytics scripts, no cookies, and no tracking of any kind. Your visit is not recorded. The only data this site ever receives is what you type into the contact form yourself.",
  },
  {
    title: "Contact form",
    body: "When you submit the contact form, the details you provide (name, email, optional phone number, subject, and message) are stored in a private spreadsheet that only I can access, so I can read and reply to your message. They are used for nothing else — no marketing, no sharing with third parties — and you can ask me to delete them at any time.",
  },
  {
    title: "External links",
    body: "This site links to external platforms such as GitHub, LinkedIn, and HackerRank. Those sites have their own privacy policies, and I encourage you to review them when you visit.",
  },
  {
    title: "Hosting",
    body: "Like most websites, the hosting provider that serves these pages may keep standard technical logs (such as IP addresses) for security and operational purposes. That logging is governed by the hosting provider's own privacy policy.",
  },
  {
    title: "Changes to this policy",
    body: "If the site ever changes in a way that affects your privacy — for example, by adding analytics — this page will be updated first.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="The short version: this site collects nothing about you."
      />
      <Section className="pt-0 sm:pt-0">
        <div className="max-w-3xl space-y-8">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.04}>
              <div>
                <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {section.body}
                </p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="border-t border-border pt-6 text-sm text-muted">
              Questions about this policy? Email me at{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-medium text-primary hover:underline"
              >
                {contactInfo.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
