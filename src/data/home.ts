import type { StatusTone } from "@/types";

/**
 * Home-page copy that isn't part of the API-backed content (the API serves
 * profile, projects, experience…; see lib/content.ts). Written in Zaid's own
 * voice: plain, practical, specific — no agency language (audit C1).
 */

export const closingCall = {
  title: "Building something that has to work every day?",
  body: "I'm looking for backend and .NET roles where reliability matters, and I'm glad to collaborate on AI and data work. Tell me what you're building — I usually reply within a day.",
  primary: { label: "Contact me", href: "/contact" },
  secondary: { label: "See what I offer", href: "/services" },
};

export interface NowItem {
  /** What kind of work it is — carries information, so it's shown. */
  kind: string;
  title: string;
  detail: string;
  href: string;
  external?: boolean;
  /** research = AI / data science / research (violet); verified = live work. */
  tone: StatusTone;
}

export const nowSection = {
  title: "What I'm doing now",
  description: "Work, teaching and study, side by side.",
  items: [
    {
      kind: "Building",
      title: "Banking, ERP and campus systems",
      detail:
        "Software Developer at E-Creatorz: .NET and SQL Server back ends, mobile features in React Native and .NET MAUI.",
      href: "/experience",
      tone: "verified",
    },
    {
      kind: "Teaching",
      title: "Essentials for AI & Prompt Mastery",
      detail:
        "Instructor at Bano Qabil. A five-month, no-code course: how language models work, prompt engineering, AI for research and writing, automation, and using AI responsibly.",
      href: "https://banoqabil.pk/courses/essentials-for-ai-prompt-mastery-6a649b54f6e4ae8688bff8a5",
      external: true,
      tone: "research",
    },
    {
      kind: "Studying",
      title: "MS in Data Science, NED University",
      detail: "Statistics, machine learning and data science tools, since January 2026.",
      href: "/education",
      tone: "research",
    },
    {
      kind: "Research",
      title: "From Alarm to Action",
      detail:
        "A conference paper on whether an LLM can explain machine-failure alarms faithfully, presented at AIIE 2026.",
      href: "/projects/from-alarm-to-action",
      tone: "research",
    },
  ] satisfies NowItem[],
};
