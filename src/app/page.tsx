import { createPageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { CallToAction } from "@/components/home/cta";
import { ScrollyChapter } from "@/components/story/scrolly-chapter";
import { PathChapter } from "@/components/story/path-chapter";
import { seoConfig } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  path: "/",
  keywords: [...seoConfig.keywords],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollyChapter id="authorization" stageSide="right" />
      <ScrollyChapter id="enterprise" stageSide="left" />
      <ScrollyChapter id="optimization" stageSide="right" />
      <PathChapter />
      <FeaturedProjects />
      <CallToAction />
    </>
  );
}
