"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypingEffectProps {
  words: string[];
  className?: string;
}

export function TypingEffect({ words, className }: TypingEffectProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentWord = words[wordIndex];
    const isComplete = !isDeleting && text === currentWord;
    const isEmpty = isDeleting && text === "";

    const delay = isComplete ? 2200 : isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
      } else if (isEmpty) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      } else {
        setText(
          isDeleting
            ? currentWord.slice(0, text.length - 1)
            : currentWord.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={className} aria-label={words[0]}>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-primary"
      />
    </span>
  );
}
