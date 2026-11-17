import { createPageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { CallToAction } from "@/components/home/cta";
import { NowSection } from "@/components/home/now-section";
import { ScrollyChapter } from "@/components/story/scrolly-chapter";
import { PathChapter } from "@/components/story/path-chapter";
import { seoConfig } from "@/lib/seo";
import { getJourney } from "@/lib/content";

export const metadata = createPageMetadata({
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  path: "/",
  keywords: [...seoConfig.keywords],
  absoluteTitle: true,
});

export default async function HomePage() {
  const journey = await getJourney();
  // Dark frame, light reading (UI.md §3): the hero is dark, the work right
  // after it is on the light ground (it used to come after all four chapters,
  // 13k px down on a phone — audit A4), then the three dark system chapters,
  // the light journey and "now", and the dark call to action.
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ScrollyChapter id="authorization" stageSide="right" />
      <ScrollyChapter id="enterprise" stageSide="left" />
      <ScrollyChapter id="optimization" stageSide="right" />
      <PathChapter journey={journey} />
      <NowSection />
      <CallToAction />
    </>
  );
}
