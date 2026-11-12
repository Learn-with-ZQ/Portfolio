import Image from "next/image";
import { FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";
import { Stats } from "@/components/home/stats";
import { StoryIndex } from "@/components/story/story-index";
import { Status } from "@/components/ui/badge";
import { SocialIcons } from "@/components/ui/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-band border-b border-rule">
      <Container className="pt-10 pb-10 lg:pt-14 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <div className="rise-in flex items-center gap-3">
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

            <h1 id="hero-title" className="type-display rise-in mt-8 text-balance [--rise-delay:70ms]">
              {profile.name}
            </h1>
            <p className="type-h3 rise-in mt-5 max-w-[34ch] font-medium text-balance text-ink [--rise-delay:140ms]">
              {profile.role} at {profile.company}, deployed as {profile.deployment}
            </p>
            <p className="type-body rise-in mt-4 text-ink-muted [--rise-delay:200ms]">{profile.tagline}</p>

            <div className="rise-in mt-8 flex flex-wrap gap-3 [--rise-delay:260ms]">
              <ButtonLink href="/projects" size="lg">
                View my work
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="secondary" size="lg">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download resume
              </ButtonLink>
            </div>

            <SocialIcons links={socialLinks} className="rise-in mt-8 [--rise-delay:320ms]" />
          </div>

          <StoryIndex />
        </div>

        <div className="rise-in mt-10 lg:mt-12 [--rise-delay:380ms]">
          <Stats />
        </div>
      </Container>
    </section>
  );
}
