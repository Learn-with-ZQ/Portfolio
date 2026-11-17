import type { Profile, Stat, TimelineEvent } from "@/types";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";

export const profile: Profile = {
  name: "Muhammad Zaid Qasim",
  firstName: "Zaid",
  role: "Software Developer",
  company: "E-Creatorz",
  location: "Karachi, Pakistan",
  avatar: "/images/profile.jpg",
  resumeUrl: "/Muhammad_Zaid_Qasim_Resume.pdf",
  tagline:
    "I design, build, and maintain secure, scalable enterprise web and mobile applications with .NET, SQL Server, React Native, and .NET MAUI.",
  typingRoles: [
    "Software Developer",
    ".NET Developer",
    "Backend Engineer",
    "Full-Stack Developer",
    "Mobile App Developer",
  ],
  shortBio:
    "Software Developer at E-Creatorz — building ERP systems, campus management platforms, and banking workflow applications used by thousands of people every day.",
  longBio: [
    "I am a Software Developer with 3.5 years of commercial experience building enterprise applications with C#, .NET, ASP.NET Core, ASP.NET MVC, Web APIs, Entity Framework, and Microsoft SQL Server — across banking, ERP, campus management, HR, and healthcare.",
    "At E-Creatorz I develop and maintain ERP systems, a campus management system, faculty and student portals, and banking workflow applications, and build their mobile features with .NET MAUI and React Native.",
    "My strongest ground is SQL Server: complex queries, stored procedures, indexing, and execution-plan analysis to find and fix performance bottlenecks. I have contributed to 15+ ERP/CMS modules serving thousands of students and staff, and I take pride in production support done right: root-cause analysis, performance tuning, and reliability.",
    "Alongside delivery, I am pursuing a Master's in Data Science at NED University, extending my backend depth into analytics and machine learning, and I stay active in community leadership and public speaking.",
  ],
  highlights: [
    ".NET Core · Clean Architecture",
    "SQL Server · Stored Procedures · Query Optimization",
    "React Native · .NET MAUI",
    "JWT Auth · RESTful APIs · Production Support",
  ],
  availability: "Available for opportunities",
};

// Counts are derived from the lists they describe, so they always match what
// the site shows ("Projects Completed: 9+" once sat beside "All 10 projects",
// with 5 of the 10 still ongoing). Keep knowledge.md in step.
export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "ERP / CMS Modules Delivered" },
  { value: projects.length, suffix: "", label: "Projects" },
  {
    value: certifications.filter((c) => c.issuer === "HackerRank").length,
    suffix: "",
    label: "HackerRank Certifications",
  },
];

export const journey: TimelineEvent[] = [
  {
    year: "2020",
    title: "Started BS Computer Science",
    description:
      "Began my Computer Science journey at PAF-KIET, Karachi — building foundations in data structures, algorithms, databases, and software engineering.",
  },
  {
    year: "2023",
    title: "Joined E-Creatorz as Software Developer",
    description:
      "Started building enterprise systems professionally — campus management, ERP, and portal systems.",
  },
  {
    year: "2024",
    title: "Graduated & Shipped Final Year Project",
    description:
      "Completed my BSCS degree and delivered Space Optimizer — an intelligent 2D bin-packing research project combining optimization algorithms with image recognition.",
  },
  {
    year: "2025",
    title: "Banking & Mobile Workflows",
    description:
      "Built secure banking transaction workflows in React Native — Maker, Checker, Signatory, and Releasor authorization for IBFT, IFT, and cheque-based transactions.",
  },
  {
    year: "2026",
    title: "Started MS in Data Science",
    description:
      "Enrolled at NED University of Engineering and Technology to extend my engineering depth into statistics, machine learning, and data science.",
    inProgress: true,
  },
  {
    year: "2026",
    title: "Presented a Conference Paper at AIIE 2026",
    description:
      "Co-authored and presented “From Alarm to Action”: machine learning predicts a machine failure, SHAP shows why, and a large language model explains what to do, with every report checked by code.",
  },
];

export const mission =
  "To build software that is secure, scalable, and genuinely useful — systems that thousands of people can rely on every day.";

export const vision =
  "Growing toward solution architecture — combining backend engineering depth with data science to deliver measurable business value.";
