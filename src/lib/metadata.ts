import type { Metadata } from "next";
import { absoluteUrl, seoConfig } from "@/lib/seo";

interface CreatePageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  /** Bypass the root layout title template (use for the homepage default title). */
  absoluteTitle?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = seoConfig.defaultOgImage,
  absoluteTitle = false,
}: CreatePageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
      languages: {
        [seoConfig.language]: canonicalPath,
      },
    },
    openGraph: {
      type: "website",
      locale: seoConfig.locale,
      url: absoluteUrl(canonicalPath),
      siteName: seoConfig.siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: seoConfig.defaultOgImageWidth,
          height: seoConfig.defaultOgImageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      ...(seoConfig.twitterHandle
        ? { creator: seoConfig.twitterHandle, site: seoConfig.twitterHandle }
        : {}),
    },
  };
}
