import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { TechMarquee } from "@/components/home/tech-marquee";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { SkillsPreview } from "@/components/home/skills-preview";
import { Journey } from "@/components/home/journey";
import { CallToAction } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Stats />
      <FeaturedProjects />
      <SkillsPreview />
      <Journey />
      <CallToAction />
    </>
  );
}
