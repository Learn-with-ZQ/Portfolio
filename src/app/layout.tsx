import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getMetadataBase, getSiteVerification, seoConfig } from "@/lib/seo";
import { getRootSchemaGraph } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={rootSchemaGraph} />
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-gradient-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
