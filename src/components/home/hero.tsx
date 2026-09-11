import Image from "next/image";
import { FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";
import { AuthorizationSchematic } from "@/components/home/authorization-schematic";
import { Stats } from "@/components/home/stats";
import { Status } from "@/components/ui/badge";
import { SocialIcons } from "@/components/ui/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-band border-b border-rule">
      <Container className="pt-12 pb-12 sm:pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                width={88}
                height={88}
                sizes="44px"
                className="h-11 w-11 rounded-full border border-rule object-cover object-top"
              />
              <Status tone="verified">{profile.availability}</Status>
            </div>

            <h1 id="hero-title" className="type-display mt-8 text-balance">
              {profile.name}
            </h1>
            <p className="type-h3 mt-5 max-w-[34ch] font-medium text-balance text-ink">
              {profile.role} at {profile.company}, deployed as {profile.deployment}
            </p>
            <p className="type-body mt-4 text-ink-muted">{profile.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects" size="lg">
                View my work
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="secondary" size="lg">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download resume
              </ButtonLink>
            </div>

            <SocialIcons links={socialLinks} className="mt-8" />
          </div>

          <AuthorizationSchematic />
        </div>

        <div className="mt-14 lg:mt-16">
          <Stats />
        </div>
      </Container>
    </section>
  );
}
