import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { seoConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const staticRoutes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/services",
    "/education",
    "/certifications",
    "/achievements",
    "/testimonials",
    "/contact",
    "/privacy",
  ].map((route) => ({
    url: `${seoConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${seoConfig.siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
