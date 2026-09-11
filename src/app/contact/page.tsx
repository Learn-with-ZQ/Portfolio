import { createPageMetadata } from "@/lib/metadata";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { SocialIcons } from "@/components/ui/social-icons";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Muhammad Zaid Qasim — email, phone, and social links. Open to roles and collaborations in backend, .NET, and full-stack development.",
  path: "/contact",
});

const contactRows = [
  { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { label: "Phone", value: contactInfo.phoneDisplay, href: `tel:${contactInfo.phone}` },
  { label: "Location", value: contactInfo.location },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Have a question or an opportunity? Send a message — I usually respond within a day."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="surface min-w-0 p-6 sm:p-8">
            <h2 className="type-h3">Send a message</h2>
            <p className="type-meta mt-1.5 max-w-[60ch] text-ink-muted">
              Fill in the form and your message lands straight in my inbox tray — I&apos;ll
              reply to the email (or phone number) you leave here.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside aria-labelledby="direct-title" className="min-w-0">
            <h2 id="direct-title" className="type-h3">
              Reach me directly
            </h2>
            <dl className="mt-4">
              {contactRows.map((row) => (
                <div key={row.label} className="border-t border-rule py-4">
                  <dt className="type-meta text-ink-muted">{row.label}</dt>
                  <dd className="mt-1 [overflow-wrap:anywhere]">
                    {row.href ? (
                      <a href={row.href} className="link">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-ink">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <h2 className="type-meta border-t border-rule pt-5 font-semibold text-ink">
              Find me online
            </h2>
            <SocialIcons links={socialLinks} className="mt-3" />
          </aside>
        </div>
      </Section>
    </>
  );
}
