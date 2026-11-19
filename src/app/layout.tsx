import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/seo/json-ld";
import { getMetadataBase, getSiteVerification, seoConfig } from "@/lib/seo";
import { getRootSchemaGraph } from "@/lib/schema";
import "./globals.css";

// Variable Archivo with the width axis, so display headings can use the
// expanded cut (see the type-* classes in globals.css).
const archivo = Archivo({
  variable: "--typeface-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Only for real values: dates, durations, counts, identifiers.
const plexMono = IBM_Plex_Mono({
  variable: "--typeface-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteVerification = getSiteVerification();

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: [...seoConfig.keywords],
  authors: [
    {
      name: seoConfig.author.name,
      url: seoConfig.socialUrls.linkedin,
    },
  ],
  creator: seoConfig.author.name,
  publisher: seoConfig.publisher.name,
  category: seoConfig.category,
  alternates: {
    canonical: "./",
    languages: {
      [seoConfig.language]: "./",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(siteVerification ? { verification: siteVerification } : {}),
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: seoConfig.defaultOgImage,
        width: seoConfig.defaultOgImageWidth,
        height: seoConfig.defaultOgImageHeight,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultOgImage],
    ...(seoConfig.twitterHandle
      ? { creator: seoConfig.twitterHandle, site: seoConfig.twitterHandle }
      : {}),
  },
};

const rootSchemaGraph = getRootSchemaGraph();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={rootSchemaGraph} />
        <Providers>
          {/* Public chrome lives in (site)/layout.tsx; /admin has its own. */}
          {children}
        </Providers>
        {/* Vercel Web Analytics: cookie-free page views; a no-op outside Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
