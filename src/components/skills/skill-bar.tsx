"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types";

export function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="font-mono text-xs text-muted">{skill.level}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
        className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft"
      >
        <motion.div
          className="bg-gradient-brand h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
