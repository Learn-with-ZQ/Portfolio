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

export type ProjectCategory = "Enterprise" | "Mobile" | "Academic";

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

export type AchievementCategory = "Competition" | "Leadership";

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  category: AchievementCategory;
  description?: string;
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
  rating: number;
  profileImageUrl?: string;
  provider: "google";
  approvedAt?: string;
}

export interface TestimonialSubmission {
  googleUserId: string;
  provider: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  phone: string;
  subject: string;
  message: string;
  rating: number;
  uploadedFileUrl?: string;
  approvalStatus: "Pending" | "Approved" | "Rejected";
  createdAt?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
