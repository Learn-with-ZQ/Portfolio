import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { getContactInfo } from "@/lib/content";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for the portfolio website of Muhammad Zaid Qasim — no cookies, anonymous visit statistics only.",
  path: "/privacy",
});

const sections = [
  {
    title: "What this site collects",
    body: "Very little. This site uses no cookies and does not identify you. Beyond the anonymous visit statistics below, the only data it receives is what you type into the contact form or the chat assistant yourself.",
  },
  {
    title: "Visit statistics",
    body: "This site uses Vercel Web Analytics to count visits: which pages are viewed, the site that linked you here, and your country, browser, operating system and device type. It uses no cookies, does not store anything on your device, and cannot follow you to other sites. Visitors are counted with a short-lived anonymous identifier that resets every day, so I see totals, not individual people.",
  },
  {
    title: "Chat assistant",
    body: "The mascot in the corner opens a chat that answers questions about me. When you ask something, your question and the conversation so far are sent to Google's Gemini API to generate the answer. This site does not store the conversation, and it disappears when you leave. Google processes it under its Gemini API terms and may use it to improve its products, so please don't type personal or sensitive information into the chat. Your browser also remembers where you dragged the mascot and whether you closed its speech bubble; that stays on your device and is never sent anywhere.",
  },
  {
    title: "Contact form",
    body: "When you submit the contact form, the details you provide (name, email, optional phone number, subject, and message) are stored in a private database that only I can access, so I can read and reply to your message. They are used for nothing else — no marketing, no sharing with third parties — and you can ask me to delete them at any time.",
  },
  {
    title: "Conversations",
    body: "If you sign in with Google on the Contact page, you can hold a conversation with me there. Your messages, with the name, email address and profile photo Google shares, are stored in a private database that only I can access. When I email you to say I've replied, the email may contain a short summary of my replies written with Google's Gemini; only my replies are sent to Gemini for that. You can ask me to delete the conversation at any time.",
  },
  {
    title: "Testimonials",
    body: "To write a testimonial you sign in with Google, which gives this site your name, email address and profile photo. Your testimonial, rating, phone number and those details are stored in a private database that only I can access; a reference letter, if you attach one, is stored in my Google Drive. Once I approve it, your name, photo, testimonial, rating and a link to the letter are published on this site. Your email address and phone number never are. You can edit your testimonial at any time, and ask me through the contact form to remove it.",
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
    body: "If the site ever changes in a way that affects your privacy, this page will be updated first.",
  },
];

export default async function PrivacyPage() {
  const contactInfo = await getContactInfo();
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="The short version: no cookies, anonymous visit counts, nothing that identifies you."
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
