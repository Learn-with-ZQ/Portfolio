import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { footerNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { SocialIcons } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              Zaid<span className="text-gradient">Qasim</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {profile.role} · {profile.location}. Building secure, scalable
              enterprise web &amp; mobile applications.
            </p>
            <SocialIcons links={socialLinks} className="mt-5" />
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`Footer — ${group.title}`}>
              <h2 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {contactInfo.email}
          </a>
          <a
            href={`tel:${contactInfo.phone}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contactInfo.phoneDisplay}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {contactInfo.location}
          </span>
        </div>

        <p className="mt-6 text-sm text-muted">
          © {year} {profile.name}. Built with Next.js, TypeScript &amp; Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
