import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { contactInfo } from "@/data/contact";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for the portfolio website of Muhammad Zaid Qasim — no cookies, no tracking, no data collection.",
  path: "/privacy",
});

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
        title="Privacy Policy"
        description="The short version: this site collects nothing about you."
      />
      <Section>
        {/* Two columns from xl, so the policy doesn't sit in a narrow strip
            with the rest of a wide screen empty. */}
        <div className="max-w-[68ch] xl:grid xl:max-w-none xl:grid-cols-2 xl:gap-x-16">
          {sections.map((section) => (
            <section
              key={section.title}
              className="reveal border-t border-rule py-8 first:border-t-0 first:pt-0 xl:[&:nth-child(2)]:border-t-0 xl:[&:nth-child(2)]:pt-0"
            >
              <h2 className="type-h3">{section.title}</h2>
              <p className="type-body mt-3 text-ink-muted">{section.body}</p>
            </section>
          ))}
          <p className="type-meta border-t border-rule pt-6 text-ink-muted xl:col-span-2">
            Questions about this policy? Email me at{" "}
            <a href={`mailto:${contactInfo.email}`} className="link">
              {contactInfo.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
