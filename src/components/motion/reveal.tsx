"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
} as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof directions;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  const offset = directions[direction];
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={staggerChild}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
