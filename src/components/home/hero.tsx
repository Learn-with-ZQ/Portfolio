"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileDown, GraduationCap, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";
import { TypingEffect } from "@/components/common/typing-effect";
import { SocialIcons } from "@/components/ui/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-6 sm:pt-20 sm:pb-8">
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-[0.32em] text-muted"
            >
              {profile.availability}
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m <span className="text-foreground">{profile.name}</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 text-xl font-medium text-muted sm:text-2xl"
            >
              <TypingEffect words={profile.typingRoles} className="text-foreground" />
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/projects" size="lg" className="rounded-full">
                View My Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="outline" size="lg" className="rounded-full">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </ButtonLink>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <SocialIcons links={socialLinks} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card p-2 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={853}
                priority
                sizes="(max-width: 640px) 20rem, 24rem"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <GraduationCap className="h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
              MS Data Science (In Progress)
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
