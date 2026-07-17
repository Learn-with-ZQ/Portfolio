import type { Metadata } from "next";

const siteName = "Muhammad Zaid Qasim";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhammad-zaid-qasim.vercel.app";

export const seoConfig = {
  siteName,
  siteUrl,
  defaultTitle: `${siteName} — Software Developer Portfolio`,
  titleTemplate: `${siteName} | %s`,
  defaultDescription:
    "Portfolio of Muhammad Zaid Qasim — Software Developer with 3+ years of experience building enterprise web and mobile applications with C#, .NET, ASP.NET Core, SQL Server, React Native, and .NET MAUI. Based in Karachi, Pakistan. Currently at E-Creatorz, deployed as Resident Engineer at IoBM.",
  defaultOgImage: "/images/profile.jpg",
  defaultOgImageWidth: 960,
  defaultOgImageHeight: 1280,
  locale: "en_US",
  language: "en-US",
  category: "Technology",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "",
  author: {
    name: siteName,
    url: siteUrl,
  },
  publisher: {
    name: siteName,
    url: siteUrl,
  },
  socialUrls: {
    github: "https://github.com/Learn-with-ZQ",
    linkedin: "https://www.linkedin.com/in/m-zaid-qasim",
    hackerrank: "https://www.hackerrank.com/profile/learnwithzq",
    email: "mailto:zaidqasim1234@gmail.com",
  },
  keywords: [
    "Muhammad Zaid Qasim",
    "Software Developer",
    ".NET Developer",
    "ASP.NET Core",
    "C#",
    "SQL Server",
    "React Native",
    ".NET MAUI",
    "Karachi",
    "Pakistan",
    "Portfolio",
  ],
} as const;

/** Profile URLs used in JSON-LD `sameAs` (excludes email). */
export const seoSocialProfileUrls = [
  seoConfig.socialUrls.github,
  seoConfig.socialUrls.linkedin,
  seoConfig.socialUrls.hackerrank,
] as const;

export function absoluteUrl(path: string): string {
  return new URL(path, seoConfig.siteUrl).toString();
}

/** Normalized origin used by Next.js `metadataBase` for relative URL resolution. */
export function getMetadataBase(): URL {
  return new URL(seoConfig.siteUrl);
}

/** Search-engine ownership tokens — only emitted when the env var is set. */
export function getSiteVerification(): Metadata["verification"] | undefined {
  const verification: NonNullable<Metadata["verification"]> = {};

  if (process.env.GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.GOOGLE_SITE_VERIFICATION;
  }

  if (process.env.YANDEX_VERIFICATION) {
    verification.yandex = process.env.YANDEX_VERIFICATION;
  }

  if (process.env.BING_SITE_VERIFICATION) {
    verification.other = {
      ...(verification.other ?? {}),
      "msvalidate.01": process.env.BING_SITE_VERIFICATION,
    };
  }

  return Object.keys(verification).length > 0 ? verification : undefined;
}
