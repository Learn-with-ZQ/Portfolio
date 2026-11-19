/**
 * The content sections the dashboard edits, described as data: which API
 * endpoint holds each one and which fields its form shows. The shared
 * SectionEditor renders any of them. To add a field, add a line here.
 *
 * Each section is read with GET <endpoint> and saved whole with PUT
 * <endpoint> (the API's existing admin save endpoints). Keys the form
 * doesn't know about are kept untouched, so a save never drops data.
 *
 * Imported by both server code (the endpoint, in the save action) and the
 * client editor, so it holds nothing server-only.
 */

export type Field =
  /** `optional`: left out when empty. `blank`: may be empty but is always sent. */
  | { kind: "text"; key: string; label: string; optional?: boolean; blank?: boolean; hint?: string; wide?: boolean }
  | { kind: "textarea"; key: string; label: string; optional?: boolean; hint?: string; rows?: number }
  /** A list of strings, one per line. */
  | { kind: "lines"; key: string; label: string; hint?: string; rows?: number }
  | { kind: "number"; key: string; label: string; optional?: boolean; hint?: string }
  | { kind: "boolean"; key: string; label: string; optional?: boolean; hint?: string }
  | { kind: "select"; key: string; label: string; options: string[]; optional?: boolean; hint?: string }
  /** "YYYY-MM". With `current`, a checkbox saves null ("to date"). */
  | { kind: "month"; key: string; label: string; current?: string }
  /** "YYYY-MM-DD". */
  | { kind: "date"; key: string; label: string }
  /** A nested object. `optional` adds a checkbox that adds or removes it. */
  | { kind: "group"; key: string; label: string; fields: Field[]; optional?: string }
  /** A nested list of objects. */
  | {
      kind: "list";
      key: string;
      label: string;
      fields: Field[];
      itemTitle: string[];
      newItem: Record<string, unknown>;
    };

export type SectionShape =
  | { type: "object"; fields: Field[] }
  /** A list of objects; `itemTitle` lists the keys whose values name an item. */
  | { type: "list"; fields: Field[]; itemTitle: string[]; newItem: Record<string, unknown>; itemName: string }
  | { type: "strings"; label: string; hint?: string };

export type SectionGroup = "About you" | "Work" | "Credentials";

export interface SectionDef {
  slug: string;
  /** Where it sits in the dashboard sidebar. */
  group: SectionGroup;
  title: string;
  description: string;
  endpoint: string;
  shape: SectionShape;
}

const month = (key: string, label: string, current?: string): Field => ({
  kind: "month",
  key,
  label,
  current,
});

export const SECTIONS: SectionDef[] = [
  {
    slug: "profile",
    group: "About you",
    title: "Profile",
    description: "Your name, role, bios and the links to your photo and résumé.",
    endpoint: "/api/profile",
    shape: {
      type: "object",
      fields: [
        { kind: "text", key: "name", label: "Full name" },
        { kind: "text", key: "firstName", label: "First name" },
        { kind: "text", key: "role", label: "Role" },
        { kind: "text", key: "company", label: "Company" },
        { kind: "text", key: "location", label: "Location" },
        { kind: "text", key: "availability", label: "Availability" },
        { kind: "text", key: "avatar", label: "Photo", hint: "A path on the site, e.g. /images/profile.jpg", wide: true },
        { kind: "text", key: "resumeUrl", label: "Résumé", hint: "A path on the site, e.g. /Muhammad_Zaid_Qasim_Resume.pdf", wide: true },
        { kind: "textarea", key: "tagline", label: "Tagline", rows: 2 },
        { kind: "lines", key: "typingRoles", label: "Typing roles", hint: "One per line" },
        { kind: "textarea", key: "shortBio", label: "Short bio", rows: 3 },
        { kind: "lines", key: "longBio", label: "Long bio", hint: "One paragraph per line", rows: 8 },
        { kind: "lines", key: "highlights", label: "Focus areas", hint: "One per line" },
      ],
    },
  },
  {
    slug: "statement",
    group: "About you",
    title: "Mission and vision",
    description: "The two statements on the About page.",
    endpoint: "/api/profile/statement",
    shape: {
      type: "object",
      fields: [
        { kind: "textarea", key: "mission", label: "Mission", rows: 4 },
        { kind: "textarea", key: "vision", label: "Vision", rows: 4 },
      ],
    },
  },
  {
    slug: "contact",
    group: "About you",
    title: "Contact details",
    description: "The email, phone and location on the Contact page.",
    endpoint: "/api/contact",
    shape: {
      type: "object",
      fields: [
        { kind: "text", key: "email", label: "Email" },
        { kind: "text", key: "phone", label: "Phone (for links)", hint: "Digits with country code, e.g. +923001234567" },
        { kind: "text", key: "phoneDisplay", label: "Phone (as shown)" },
        { kind: "text", key: "location", label: "Location" },
      ],
    },
  },
  {
    slug: "hero",
    group: "About you",
    title: "Hero technologies",
    description: "The technology names shown in the home page's opening section.",
    endpoint: "/api/skills/hero",
    shape: { type: "strings", label: "Technologies", hint: "One per line, in display order" },
  },
  {
    slug: "stats",
    group: "About you",
    title: "Stats",
    description: "The figures on the home and About pages.",
    endpoint: "/api/profile/stats",
    shape: {
      type: "list",
      itemName: "stat",
      itemTitle: ["label"],
      newItem: { value: 0, suffix: "", label: "" },
      fields: [
        { kind: "text", key: "label", label: "Label" },
        { kind: "number", key: "value", label: "Value" },
        { kind: "text", key: "suffix", label: "Suffix", blank: true, hint: "e.g. +, or leave empty" },
        {
          kind: "select",
          key: "derivedFrom",
          label: "Counted automatically",
          options: ["ProjectCount", "HackerRankCertificationCount"],
          optional: true,
          hint: "Leave empty to use the value above",
        },
      ],
    },
  },
  {
    slug: "journey",
    group: "About you",
    title: "Journey",
    description: "The timeline on the home and About pages, oldest first.",
    endpoint: "/api/profile/journey",
    shape: {
      type: "list",
      itemName: "milestone",
      itemTitle: ["year", "title"],
      newItem: { year: "", title: "", description: "" },
      fields: [
        { kind: "text", key: "year", label: "Year" },
        { kind: "text", key: "title", label: "Title" },
        { kind: "textarea", key: "description", label: "Description", rows: 3 },
        { kind: "boolean", key: "inProgress", label: "Still in progress", optional: true },
      ],
    },
  },
  {
    slug: "social",
    group: "About you",
    title: "Social links",
    description: "Links in the footer and on the Contact page.",
    endpoint: "/api/social",
    shape: {
      type: "list",
      itemName: "link",
      itemTitle: ["name"],
      newItem: { name: "", url: "", icon: "github" },
      fields: [
        { kind: "text", key: "name", label: "Name" },
        { kind: "text", key: "url", label: "URL", wide: true },
        { kind: "select", key: "icon", label: "Icon", options: ["github", "linkedin", "hackerrank", "mail"] },
      ],
    },
  },
  {
    slug: "experience",
    group: "Work",
    title: "Experience",
    description: "Your jobs, newest first.",
    endpoint: "/api/experience",
    shape: {
      type: "list",
      itemName: "job",
      itemTitle: ["role", "company"],
      newItem: { id: "", role: "", company: "", location: "", startDate: "", endDate: null, summary: "", responsibilities: [], technologies: [] },
      fields: [
        { kind: "text", key: "id", label: "ID", hint: "Short and unique, e.g. ecreatorz-developer" },
        { kind: "text", key: "role", label: "Role" },
        { kind: "text", key: "company", label: "Company" },
        { kind: "text", key: "companyUrl", label: "Company website", optional: true },
        { kind: "text", key: "location", label: "Location" },
        month("startDate", "Started"),
        month("endDate", "Ended", "Still working here"),
        { kind: "textarea", key: "summary", label: "Summary", rows: 3 },
        { kind: "lines", key: "responsibilities", label: "Responsibilities", hint: "One per line", rows: 6 },
        { kind: "lines", key: "technologies", label: "Technologies", hint: "One per line" },
      ],
    },
  },
  {
    slug: "projects",
    group: "Work",
    title: "Projects",
    description: "Every project, in the order the Projects page lists them.",
    endpoint: "/api/projects",
    shape: {
      type: "list",
      itemName: "project",
      itemTitle: ["name"],
      newItem: {
        slug: "", name: "", category: "Enterprise", context: "", summary: "", description: [],
        highlights: [], technologies: [], startDate: "", endDate: null, featured: false,
      },
      fields: [
        { kind: "text", key: "slug", label: "Slug", hint: "Its address: /projects/<slug>. Lowercase words and hyphens." },
        { kind: "text", key: "name", label: "Name" },
        { kind: "select", key: "category", label: "Category", options: ["Enterprise", "Mobile", "Academic", "Research"] },
        { kind: "text", key: "context", label: "Context", hint: "e.g. E-Creatorz, or NED University" },
        { kind: "boolean", key: "featured", label: "Featured on the home page" },
        month("startDate", "Started"),
        month("endDate", "Ended", "Still in progress"),
        { kind: "textarea", key: "summary", label: "Summary", rows: 3 },
        { kind: "lines", key: "description", label: "Description", hint: "One paragraph per line", rows: 6 },
        { kind: "lines", key: "highlights", label: "Highlights", hint: "One per line", rows: 5 },
        { kind: "lines", key: "technologies", label: "Technologies", hint: "One per line" },
        { kind: "text", key: "liveUrl", label: "Live URL", optional: true, wide: true },
        { kind: "text", key: "githubUrl", label: "GitHub URL", optional: true, wide: true },
        {
          kind: "group",
          key: "paper",
          label: "Paper",
          optional: "This project is also a paper",
          fields: [
            { kind: "text", key: "title", label: "Title", wide: true },
            { kind: "text", key: "venue", label: "Venue", wide: true },
            { kind: "text", key: "venueShort", label: "Venue (short)" },
            { kind: "date", key: "presented", label: "Presented on" },
            {
              kind: "list",
              key: "authors",
              label: "Authors",
              itemTitle: ["name"],
              newItem: { name: "" },
              fields: [
                { kind: "text", key: "name", label: "Name" },
                { kind: "boolean", key: "self", label: "This is me", optional: true },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "authorization-flow",
    group: "Work",
    title: "Authorization flow",
    description: "The stages of the home page's authorization diagram.",
    endpoint: "/api/projects/authorization-flow",
    shape: {
      type: "object",
      fields: [
        { kind: "text", key: "projectSlug", label: "Project slug", hint: "The project this diagram belongs to" },
        { kind: "lines", key: "transactionTypes", label: "Transaction types", hint: "One per line" },
        {
          kind: "list",
          key: "stages",
          label: "Stages",
          itemTitle: ["role"],
          newItem: { role: "", duty: "", state: "", activeLabel: "", doneLabel: "" },
          fields: [
            { kind: "text", key: "role", label: "Role" },
            { kind: "text", key: "state", label: "State" },
            { kind: "textarea", key: "duty", label: "Duty", rows: 2 },
            { kind: "text", key: "activeLabel", label: "Label while active" },
            { kind: "text", key: "doneLabel", label: "Label when done" },
          ],
        },
      ],
    },
  },
  {
    slug: "skills",
    group: "Work",
    title: "Skills",
    description: "Skill groups on the Skills page.",
    endpoint: "/api/skills",
    shape: {
      type: "list",
      itemName: "group",
      itemTitle: ["title"],
      newItem: { id: "", title: "", icon: "", skills: [] },
      fields: [
        { kind: "text", key: "id", label: "ID", hint: "Short and unique, e.g. backend" },
        { kind: "text", key: "title", label: "Title" },
        { kind: "text", key: "icon", label: "Icon", hint: "A lucide icon name, e.g. Server" },
        {
          kind: "list",
          key: "skills",
          label: "Skills",
          itemTitle: ["name"],
          newItem: { name: "" },
          fields: [{ kind: "text", key: "name", label: "Name" }],
        },
      ],
    },
  },
  {
    slug: "services",
    group: "Work",
    title: "Services",
    description: "What you offer, on the Services page.",
    endpoint: "/api/services",
    shape: {
      type: "list",
      itemName: "service",
      itemTitle: ["title"],
      newItem: { id: "", title: "", icon: "", description: "", deliverables: [] },
      fields: [
        { kind: "text", key: "id", label: "ID", hint: "Short and unique" },
        { kind: "text", key: "title", label: "Title" },
        { kind: "text", key: "icon", label: "Icon", hint: "A lucide icon name" },
        { kind: "textarea", key: "description", label: "Description", rows: 3 },
        { kind: "lines", key: "deliverables", label: "Deliverables", hint: "One per line" },
      ],
    },
  },
  {
    slug: "education",
    group: "Credentials",
    title: "Education",
    description: "Degrees, newest first.",
    endpoint: "/api/education",
    shape: {
      type: "list",
      itemName: "degree",
      itemTitle: ["degree"],
      newItem: { id: "", degree: "", shortDegree: "", institute: "", location: "", startDate: "", endDate: null, coursework: [] },
      fields: [
        { kind: "text", key: "id", label: "ID", hint: "Short and unique" },
        { kind: "text", key: "degree", label: "Degree", wide: true },
        { kind: "text", key: "shortDegree", label: "Short name", hint: "e.g. MS Data Science" },
        { kind: "text", key: "institute", label: "Institute" },
        { kind: "text", key: "location", label: "Location" },
        month("startDate", "Started"),
        month("endDate", "Ended", "Still studying"),
        { kind: "text", key: "cgpa", label: "CGPA", optional: true },
        { kind: "lines", key: "coursework", label: "Coursework", hint: "One per line" },
      ],
    },
  },
  {
    slug: "certifications",
    group: "Credentials",
    title: "Certifications",
    description: "Certificates on the Certifications page.",
    endpoint: "/api/certifications",
    shape: {
      type: "list",
      itemName: "certification",
      itemTitle: ["name", "issuer"],
      newItem: { id: "", name: "", issuer: "", issuerUrl: "", year: "" },
      fields: [
        { kind: "text", key: "id", label: "ID", hint: "Short and unique" },
        { kind: "text", key: "name", label: "Name", wide: true },
        { kind: "text", key: "issuer", label: "Issuer" },
        { kind: "text", key: "issuerUrl", label: "Issuer website" },
        { kind: "text", key: "year", label: "Year" },
        { kind: "text", key: "credentialUrl", label: "Credential URL", optional: true, wide: true },
        { kind: "number", key: "stars", label: "Stars", optional: true, hint: "HackerRank stars, if any" },
      ],
    },
  },
  {
    slug: "achievements",
    group: "Credentials",
    title: "Achievements",
    description: "Awards, competitions and leadership.",
    endpoint: "/api/achievements",
    shape: {
      type: "list",
      itemName: "achievement",
      itemTitle: ["title"],
      newItem: { id: "", title: "", event: "", year: "", category: "Competition" },
      fields: [
        { kind: "text", key: "id", label: "ID", hint: "Short and unique" },
        { kind: "text", key: "title", label: "Title", wide: true },
        { kind: "text", key: "event", label: "Event" },
        { kind: "text", key: "year", label: "Year" },
        { kind: "select", key: "category", label: "Category", options: ["Research", "Competition", "Leadership"] },
        { kind: "textarea", key: "description", label: "Description", optional: true, rows: 3 },
        {
          kind: "group",
          key: "link",
          label: "Link",
          optional: "Add a link",
          fields: [
            { kind: "text", key: "href", label: "URL", wide: true },
            { kind: "text", key: "label", label: "Link text" },
          ],
        },
      ],
    },
  },
];

export function findSection(slug: string): SectionDef | undefined {
  return SECTIONS.find((section) => section.slug === slug);
}

export const SECTION_GROUPS: SectionGroup[] = ["About you", "Work", "Credentials"];
