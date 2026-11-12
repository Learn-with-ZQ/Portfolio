export interface Profile {
  name: string;
  firstName: string;
  role: string;
  company: string;
  deployment: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  tagline: string;
  typingRoles: string[];
  shortBio: string;
  longBio: string[];
  highlights: string[];
  availability: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "hackerrank" | "mail";
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneDisplay: string;
  location: string;
}

export type SkillLevel = "Expert" | "Advanced" | "Proficient" | "Familiar";

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  deployment?: string;
  location: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export type ProjectCategory = "Enterprise" | "Mobile" | "Academic" | "Research";

export interface PaperAuthor {
  name: string;
  /** The portfolio owner — linked to the Person schema rather than repeated. */
  self?: boolean;
}

/** A project that is also a conference paper. */
export interface Paper {
  title: string;
  authors: PaperAuthor[];
  venue: string;
  venueShort: string;
  /** ISO date the paper was presented, e.g. "2026-11-11". */
  presented: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  context: string;
  summary: string;
  description: string[];
  highlights: string[];
  technologies: string[];
  startDate: string;
  endDate: string | null;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  paper?: Paper;
}

export interface Education {
  id: string;
  degree: string;
  shortDegree: string;
  institute: string;
  location: string;
  startDate: string;
  endDate: string | null;
  cgpa?: string;
  coursework: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerUrl: string;
  year: string;
  credentialUrl?: string;
  stars?: number;
}

export type AchievementCategory = "Research" | "Competition" | "Leadership";

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  category: AchievementCategory;
  description?: string;
  link?: { href: string; label: string };
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  subject: string;
  message: string;
  rating: 1 | 2 | 3 | 4 | 5;
  profileImageUrl?: string;
  createdAt?: string;
  referenceDocumentUrl?: string;
  verificationStatus: "Verified";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  /** Still under way — drawn in pending rather than primary. */
  inProgress?: boolean;
}

export interface StoryStep {
  title: string;
  body: string;
}

export interface StoryChapterMeta {
  id: string;
  /** Position in the story, e.g. "01". */
  number: string;
  title: string;
  context: string;
  link?: { href: string; label: string };
}

export interface StoryChapter extends StoryChapterMeta {
  /** Accessible summary of the pinned diagram — the steps carry the detail. */
  stageLabel: string;
  steps: StoryStep[];
}

export interface EnterpriseSystem {
  id: string;
  name: string;
  stack: string;
  modules: string[];
}

/** The two 3×3 sprite sheets behind the corner mascot. */
export interface MascotSheets {
  /** Served path of the nine head directions. */
  directions: string;
  /** Served path of the nine expressions shown when it is clicked. */
  reactions: string;
}

/** Copy for the chat assistant the corner mascot opens. */
export interface AssistantContent {
  mascot: MascotSheets;
  /** Accessible name of the mascot button. */
  launcherLabel: string;
  title: string;
  /** One line under the title. */
  subtitle: string;
  greeting: string;
  /**
   * Speech bubble beside the mascot until the visitor opens the chat or
   * dismisses it, so it is clear the mascot is a chat (and can be moved).
   */
  nudge: { text: string; hint: string; dismissLabel: string };
  /** Shown before the visitor has asked anything. */
  starterQuestions: string[];
  /**
   * Fixed openers: when the visitor's question matches, the reply starts with
   * this exact line, then Gemini's normal answer follows.
   */
  quips: { match: RegExp; opener: string }[];
  inputLabel: string;
  inputPlaceholder: string;
  /** Under the input: answers are generated and can be wrong. */
  disclaimer: string;
  errors: {
    /** No GEMINI_API_KEY on the server. */
    unavailable: string;
    /** Rate limited, here or by Gemini. */
    busy: string;
    /** Anything else. */
    failed: string;
  };
}

/** One turn of the chat, as sent to /api/chat. */
export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

/** What /api/chat returns on success. */
export interface ChatReply {
  answer: string;
  /** Up to three follow-up questions to offer next. */
  suggestions: string[];
}
