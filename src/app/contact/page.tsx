import { createPageMetadata } from "@/lib/metadata";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { SocialIcons } from "@/components/ui/social-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Muhammad Zaid Qasim — email, phone, and social links. Open to roles and collaborations in backend, .NET, and full-stack development.",
  path: "/contact",
});

const contactRows = [
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactInfo.phoneDisplay,
    href: `tel:${contactInfo.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: contactInfo.location,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact"
        description="Have a question or an opportunity? Send a message — I usually respond within a day."
      />
      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="card-surface rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight">Send a message</h2>
              <p className="mt-2 text-sm text-muted">
                Fill in the form and your message lands straight in my inbox tray —
                I&apos;ll reply to the email (or phone number) you leave here.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold tracking-tight">Reach me directly</h2>
              <ul className="mt-6 space-y-5">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <row.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-muted">{row.label}</p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="mt-0.5 block font-medium break-all transition-colors hover:text-primary"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-medium">{row.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-sm font-semibold tracking-wider uppercase">
                Find me online
              </h3>
              <SocialIcons links={socialLinks} className="mt-4" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
