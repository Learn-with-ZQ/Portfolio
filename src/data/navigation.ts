import type { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// Testimonials is linked even while none is approved (Zaid's choice,
// 2026-11-17, so visitors can find the form). It was hidden from 2026-11-16 to
// 11-17 because a linked "none yet" page can read as nobody vouching; its
// empty state now invites people to add one instead.
export const moreNav: NavLink[] = [
  { label: "Education", href: "/education" },
  { label: "Certifications", href: "/certifications" },
  { label: "Achievements", href: "/achievements" },
  { label: "Testimonials", href: "/testimonials" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Projects", href: "/projects" },
      { label: "Skills", href: "/skills" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Services", href: "/services" },
      { label: "Education", href: "/education" },
      { label: "Certifications", href: "/certifications" },
      { label: "Achievements", href: "/achievements" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
