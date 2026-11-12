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
