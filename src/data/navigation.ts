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
