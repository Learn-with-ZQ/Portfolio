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
    <section className="bg-grid relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--primary)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {profile.availability}
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 text-2xl font-semibold text-muted sm:text-3xl"
            >
              <TypingEffect words={profile.typingRoles} className="text-foreground" />
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/projects" size="lg">
                View My Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="outline" size="lg">
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
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[2rem] bg-gradient-brand opacity-70 blur-2xl"
            />
            <div className="glow-primary relative overflow-hidden rounded-[2rem] border border-border-strong">
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
            <div className="card-surface absolute -bottom-4 left-1/2 flex w-max max-w-[90%] -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur">
              <GraduationCap className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              MS Data Science (In Progress)
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
