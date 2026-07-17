import type { Profile, Stat, TimelineEvent } from "@/types";

export const profile: Profile = {
  name: "Muhammad Zaid Qasim",
  firstName: "Zaid",
  role: "Software Developer",
  company: "E-Creatorz",
  deployment: "Resident Engineer at IoBM",
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
    "Software Developer at E-Creatorz, deployed as a Resident Engineer at IoBM — building ERP systems, campus management platforms, and banking workflow applications used by thousands of people every day.",
  longBio: [
    "I am a Software Developer with 3+ years of experience designing, developing, and maintaining enterprise-grade web and mobile applications using C#, .NET, ASP.NET Core, ASP.NET MVC, Web APIs, SQL Server, Entity Framework, React Native, and .NET MAUI.",
    "Currently I work at E-Creatorz as a .NET Developer, deployed as a Resident Engineer at IoBM (Institute of Business Management), where I contribute to the development and maintenance of ERP systems, campus management systems, faculty and student portals, and banking workflow applications.",
    "My work centres on maintainable enterprise systems — clean separation of concerns, stored-procedure data access, robust authentication, and thoughtful API design. I have delivered 15+ ERP/CMS modules serving thousands of students and staff, and I take pride in production support done right: root-cause analysis, performance tuning, and reliability.",
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

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "ERP / CMS Modules Delivered" },
  { value: 9, suffix: "+", label: "Projects Completed" },
  { value: 4, suffix: "", label: "HackerRank Certifications" },
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
      "Started building enterprise systems professionally — deployed as a Resident Engineer at IoBM, working on campus management, ERP, and portal systems.",
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
  },
];

export const mission =
  "To build software that is secure, scalable, and genuinely useful — systems that thousands of people can rely on every day.";

export const vision =
  "Growing toward solution architecture — combining backend engineering depth with data science to deliver measurable business value.";
