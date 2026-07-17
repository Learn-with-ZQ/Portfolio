import { seoConfig } from "@/lib/seo";

/** @deprecated Prefer `seoConfig` from `@/lib/seo` for new code. */
export const siteConfig = {
  name: seoConfig.siteName,
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  url: seoConfig.siteUrl,
  ogImage: seoConfig.defaultOgImage,
  locale: seoConfig.locale,
  language: seoConfig.language,
  category: seoConfig.category,
  keywords: [...seoConfig.keywords],
};
