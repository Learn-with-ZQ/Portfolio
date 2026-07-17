import { seoConfig } from "@/lib/seo";
import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: seoConfig.socialUrls.github,
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: seoConfig.socialUrls.linkedin,
    icon: "linkedin",
  },
  {
    name: "HackerRank",
    url: seoConfig.socialUrls.hackerrank,
    icon: "hackerrank",
  },
  {
    name: "Email",
    url: seoConfig.socialUrls.email,
    icon: "mail",
  },
];
