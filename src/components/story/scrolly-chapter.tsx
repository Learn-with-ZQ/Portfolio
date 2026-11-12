"use client";

import { authorizationChapter, enterpriseChapter, optimizationChapter } from "@/data/story";
import { useScrollSteps } from "@/components/story/use-scroll-steps";
import { ScrollyLayout } from "@/components/story/scrolly-layout";
import { AuthorizationStage } from "@/components/story/authorization-stage";
import { EnterpriseStage } from "@/components/story/enterprise-stage";
import { PackingStage } from "@/components/story/packing-stage";

const chapters = {
  authorization: { chapter: authorizationChapter, Stage: AuthorizationStage },
  enterprise: { chapter: enterpriseChapter, Stage: EnterpriseStage },
  optimization: { chapter: optimizationChapter, Stage: PackingStage },
} as const;

interface ScrollyChapterProps {
  id: keyof typeof chapters;
  stageSide?: "left" | "right";
}

/** One scroll-driven chapter: pinned diagram + steps, wired to scroll position. */
export function ScrollyChapter({ id, stageSide = "right" }: ScrollyChapterProps) {
  const { chapter, Stage } = chapters[id];
  const { active, layoutRef, stageRef, pinRef, stepRefs } = useScrollSteps(chapter.steps.length);

  return (
    <ScrollyLayout
      chapter={chapter}
      active={active}
      layoutRef={layoutRef}
      stageRef={stageRef}
      pinRef={pinRef}
      stepRefs={stepRefs}
      stageSide={stageSide}
      stage={<Stage step={active} count={chapter.steps.length} label={chapter.stageLabel} />}
    />
  );
}
