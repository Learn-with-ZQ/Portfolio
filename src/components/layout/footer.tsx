import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { getContactInfo, getProfile, getSocialLinks } from "@/lib/content";
import { SocialIcons } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";

const quietLink =
  "inline-flex min-h-9 items-center text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline";

export async function Footer() {
  const [profile, contactInfo, socialLinks] = await Promise.all([
    getProfile(),
    getContactInfo(),
    getSocialLinks(),
  ]);
  const year = new Date().getFullYear();

  return (
    // Dark in both themes: closes the dark frame the header opens (UI.md §3).
    <footer className="band-dark border-t border-rule">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div className="reveal">
            <Link href="/" className="wordmark inline-flex min-h-11 items-center text-lg text-ink">
              Zaid Qasim
            </Link>
            <p className="type-meta mt-3 max-w-xs text-ink-muted">
              {profile.role} in {profile.location}. Building secure, scalable
              enterprise web and mobile applications.
            </p>
            <SocialIcons links={socialLinks} className="mt-5" />
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`} className="reveal">
              <h2 className="type-meta font-semibold text-ink">{group.title}</h2>
              <ul className="type-meta mt-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={quietLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* The right padding keeps the copyright clear of the corner mascot
            (components/assistant/assistant.tsx): 64px on phones, 96px from md. */}
        <div className="type-meta mt-12 flex flex-col gap-4 border-t border-rule pt-6 pr-20 text-ink-muted md:flex-row md:items-center md:justify-between md:pr-28">
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <a href={`mailto:${contactInfo.email}`} className={quietLink}>
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contactInfo.phone}`} className={quietLink}>
                {contactInfo.phoneDisplay}
              </a>
            </li>
            <li className="inline-flex min-h-9 items-center">{contactInfo.location}</li>
          </ul>
          <p>
            © {year} {profile.name}. Built with Next.js, TypeScript and Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  );
}
