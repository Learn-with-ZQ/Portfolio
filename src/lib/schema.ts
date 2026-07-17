import { profile } from "@/data/profile";
import type { Project } from "@/types";
import { absoluteUrl, seoConfig, seoSocialProfileUrls } from "@/lib/seo";

export const personSchemaId = `${seoConfig.siteUrl}/#person`;
export const websiteSchemaId = `${seoConfig.siteUrl}/#website`;

export function getPersonSchema() {
  return {
    "@type": "Person",
    "@id": personSchemaId,
    name: profile.name,
    givenName: profile.firstName,
    jobTitle: profile.role,
    description: profile.shortBio,
    worksFor: {
      "@type": "Organization",
      name: profile.company,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    url: seoConfig.siteUrl,
    image: absoluteUrl(profile.avatar),
    sameAs: [...seoSocialProfileUrls],
    knowsAbout: [
      "C#",
      ".NET Core",
      "ASP.NET Core",
      "ASP.NET",
      "SQL Server",
      "Entity Framework",
      "React Native",
      ".NET MAUI",
      "REST APIs",
      "TypeScript",
      "Next.js",
      "Data Science",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "PAF-KIET (Karachi Institute of Economics and Technology)",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "NED University of Engineering and Technology",
      },
    ],
    mainEntityOfPage: {
      "@id": websiteSchemaId,
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteSchemaId,
    url: seoConfig.siteUrl,
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    publisher: {
      "@id": personSchemaId,
    },
    about: {
      "@id": personSchemaId,
    },
  };
}

export function getRootSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [getPersonSchema(), getWebSiteSchema()],
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    author: {
      "@id": personSchemaId,
    },
    creator: {
      "@id": personSchemaId,
    },
    keywords: project.technologies.join(", "),
    dateCreated: `${project.startDate}-01`,
    ...(project.endDate ? { dateModified: `${project.endDate}-01` } : {}),
    about: project.category,
  };
}
