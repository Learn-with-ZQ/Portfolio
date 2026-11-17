import Image from "next/image";
import { FileText, Mail } from "lucide-react";
import { getProfile, getSocialLinks } from "@/lib/content";
import { Stats } from "@/components/home/stats";
import { StoryIndex } from "@/components/story/story-index";
import { Status } from "@/components/ui/badge";
import { SocialIcons } from "@/components/ui/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export async function Hero() {
  const [profile, socialLinks] = await Promise.all([getProfile(), getSocialLinks()]);
  return (
    // Dark in both themes: the hero opens the dark frame (UI.md §3).
    <section aria-labelledby="hero-title" className="band-dark border-b border-rule">
      <Container className="pt-10 pb-10 lg:pt-14 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <div className="rise-in flex items-center gap-4">
              {/* In full colour (a grayscale filter was tried on 2026-11-17 and
                  removed at Zaid's request). The person is on the first screen,
                  not a 44px dot (audit). Swap in a studio portrait any time. */}
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                width={176}
                height={176}
                sizes="(min-width: 64rem) 88px, 64px"
                priority
                className="h-16 w-16 rounded-[10px] border border-rule object-cover object-top lg:h-[5.5rem] lg:w-[5.5rem]"
              />
              <Status tone="verified">{profile.availability}</Status>
            </div>

            <h1 id="hero-title" className="type-display rise-in mt-8 text-balance [--rise-delay:70ms]">
              {profile.name}
            </h1>
            <p className="type-h3 rise-in mt-5 max-w-[34ch] font-medium text-balance text-ink [--rise-delay:140ms]">
              {/* Kept whole: on phones the line otherwise broke at the hyphen, "E-" / "Creatorz". */}
              {profile.role} at <span className="whitespace-nowrap">{profile.company}</span>,{" "}
              {profile.location}
            </p>
            <p className="type-body rise-in mt-4 text-ink-muted [--rise-delay:200ms]">{profile.tagline}</p>

            <div className="rise-in mt-8 flex flex-wrap gap-3 [--rise-delay:260ms]">
              <ButtonLink href="/contact" size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact me
              </ButtonLink>
              <ButtonLink
                href={profile.resumeUrl}
                external
                ariaLabel="View resume (PDF, opens in a new tab)"
                variant="secondary"
                size="lg"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                View resume
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
