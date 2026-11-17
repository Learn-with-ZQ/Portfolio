import type {
  Achievement,
  Certification,
  ContactInfo,
  Education,
  Experience,
  Profile,
  Project,
  Service,
  SkillCategory,
  SocialLink,
  Stat,
  TimelineEvent,
} from "@/types";
import { achievements } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { contactInfo } from "@/data/contact";
import { educationList } from "@/data/education";
import { experiences } from "@/data/experience";
import { journey, mission, profile, stats, vision } from "@/data/profile";
import { authorizationFlow, projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillCategories } from "@/data/skills";
import { socialLinks } from "@/data/social";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";

/**
 * The site's content, read from the Portfolio API (ASP.NET Core + PostgreSQL
 * on the Oracle Cloud VM, `D:\API\Portfolio`). Server-side only.
 *
 * - Set `PORTFOLIO_API_URL` (e.g. https://test1.tail7827de.ts.net). Unset, the
 *   site uses the bundled `src/data/*.ts` files, exactly as before.
 * - Responses are cached for 10 minutes, so pages stay static (ISR) and an
 *   edit made through the API shows within 10 minutes, with no redeploy.
 * - If the API is down, slow (5s), or answers with something unexpected, the
 *   page falls back to the bundled files. The site never depends on the VM.
 *   Keep those files roughly current: they are the fallback.
 *
 * Each GET's JSON equals the matching export of the data files (checked
 * field by field by the API project), so no mapping is needed.
 */
const API_URL = PORTFOLIO_API_BASE;
export const CONTENT_REVALIDATE_SECONDS = 600;
const TIMEOUT_MS = 5000;

// One warning per endpoint per server process: with the API down, every page
// of a build would otherwise repeat the same few lines (132 in one build).
const warned = new Set<string>();

type Shape = (data: unknown) => boolean;
const list: Shape = (data) => Array.isArray(data);
const objectWith =
  (key: string): Shape =>
  (data) =>
    typeof data === "object" && data !== null && key in data;

async function fromApi<T>(path: string, fallback: T, isValid: Shape): Promise<T> {
  if (!API_URL) return fallback;
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags: ["content"] },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (!isValid(data)) throw new Error("unexpected response shape");
    return data as T;
  } catch (error) {
    if (!warned.has(path)) {
      warned.add(path);
      console.warn(`[content] ${path}: using the bundled data (${(error as Error).message})`);
    }
    return fallback;
  }
}

export const getProfile = () => fromApi<Profile>("/api/profile", profile, objectWith("name"));
export const getStats = () => fromApi<Stat[]>("/api/profile/stats", stats, list);
export const getJourney = () =>
  fromApi<TimelineEvent[]>("/api/profile/journey", journey, list);
export const getStatement = () =>
  fromApi<{ mission: string; vision: string }>(
    "/api/profile/statement",
    { mission, vision },
    objectWith("mission"),
  );
export const getContactInfo = () =>
  fromApi<ContactInfo>("/api/contact", contactInfo, objectWith("email"));
export const getSocialLinks = () => fromApi<SocialLink[]>("/api/social", socialLinks, list);
export const getExperiences = () =>
  fromApi<Experience[]>("/api/experience", experiences, list);
export const getProjects = () => fromApi<Project[]>("/api/projects", projects, list);
export const getAuthorizationFlow = () =>
  fromApi<typeof authorizationFlow>(
    "/api/projects/authorization-flow",
    authorizationFlow,
    objectWith("stages"),
  );
export const getSkillCategories = () =>
  fromApi<SkillCategory[]>("/api/skills", skillCategories, list);
export const getServices = () => fromApi<Service[]>("/api/services", services, list);
export const getEducation = () => fromApi<Education[]>("/api/education", educationList, list);
export const getCertifications = () =>
  fromApi<Certification[]>("/api/certifications", certifications, list);
export const getAchievements = () =>
  fromApi<Achievement[]>("/api/achievements", achievements, list);

// Helpers over the project list, so a page fetches it once (and from cache).
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.featured);
}
