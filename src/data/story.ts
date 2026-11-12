import type {
  EnterpriseSystem,
  StoryChapter,
  StoryChapterMeta,
} from "@/types";
import { journey } from "@/data/profile";

/**
 * The home page is told as four chapters. Each scroll step's text carries the
 * full meaning on its own; the pinned diagram beside it only illustrates.
 * Facts here are drawn from projects.ts, experience.ts and profile.ts.
 */

export const authorizationChapter: StoryChapter = {
  id: "authorization",
  number: "01",
  title: "Every transaction passes four people",
  context: "Net 2 Bank, enterprise mobile banking",
  link: { href: "/projects/net-2-bank", label: "View the Net 2 Bank project" },
  stageLabel:
    "Diagram of a bank transaction passing four approvals — Maker, Checker, Signatory and Releasor — before it reaches the core banking system.",
  steps: [
    {
      title: "No single person can move the money",
      body: "Net 2 Bank is an enterprise banking application. Every inter-bank transfer, intra-bank transfer and cheque has to clear a four-stage authorization pipeline before it reaches the core banking system.",
    },
    {
      title: "The Maker creates it",
      body: "One person enters the transaction. Creating it is the first of four sign-offs — nothing has moved yet.",
    },
    {
      title: "The Checker verifies it",
      body: "A second person checks the details. Under separation of duties, whoever made a transaction is never the one who checks it.",
    },
    {
      title: "The Signatory approves it",
      body: "A third person approves the transfer. Each approval is a separate, accountable decision.",
    },
    {
      title: "The Releasor executes it",
      body: "Only then does a fourth person release it to the core banking system.",
    },
    {
      title: "Fraud prevention, built into the workflow",
      body: "This separation of duties is what banks rely on to prevent fraud and enforce accountability. I build these workflows in React Native, so they behave the same on every platform.",
    },
  ],
};

export const enterpriseChapter: StoryChapter = {
  id: "enterprise",
  number: "02",
  title: "The systems a university runs on",
  context: "Edu-Smartz and Ebiz-Smartz, deployed at IoBM",
  link: { href: "/experience", label: "Read the full role" },
  stageLabel:
    "Diagram of the modules in three production systems at IoBM: the Edu-Smartz campus management system, the Ebiz-Smartz ERP, and the student and faculty portals.",
  steps: [
    {
      title: "Fifteen-plus modules in production",
      body: "As a Resident Engineer at IoBM, I build and maintain the campus management system, the ERP, and the student and faculty portals — used every day by thousands of students and staff.",
    },
    {
      title: "Edu-Smartz CMS",
      body: "The campus management backbone: student registration, academic management, fee management, reporting, surveys, and trusted-device authentication.",
    },
    {
      title: "Ebiz-Smartz ERP",
      body: "Payroll, human resources, supply chain, purchase requisition and hospital management — enterprise logic where correctness directly affects salaries, inventory, and operations.",
    },
    {
      title: "Student and faculty portals",
      body: "Attendance, assessment results, the student ledger, degree roadmap, course management and LMS features — on the web, and on mobile with .NET MAUI.",
    },
    {
      title: "Kept healthy in production",
      body: "I resolve production issues through root-cause analysis to keep downtime low, working directly with the academic, finance, HR and administrative teams who depend on these systems.",
    },
  ],
};

export const enterpriseSystems: EnterpriseSystem[] = [
  {
    id: "cms",
    name: "Edu-Smartz CMS",
    stack: "ASP.NET WebForms, SQL Server",
    modules: [
      "Student registration",
      "Academic management",
      "Fee management",
      "Reporting",
      "Surveys",
      "Trusted-device auth",
    ],
  },
  {
    id: "erp",
    name: "Ebiz-Smartz ERP",
    stack: "ASP.NET, SQL Server",
    modules: [
      "Payroll",
      "Human resources",
      "Supply chain",
      "Purchase requisition",
      "Hospital management",
    ],
  },
  {
    id: "portals",
    name: "Student and faculty portals",
    stack: ".NET, .NET MAUI",
    modules: [
      "Attendance",
      "Assessment results",
      "Student ledger",
      "Degree roadmap",
      "Course management",
      "LMS",
      "Academic tracking",
    ],
  },
];

export const optimizationChapter: StoryChapter = {
  id: "optimization",
  number: "03",
  title: "An NP-hard problem, drawn by hand",
  context: "Space Optimizer, final year project at PAF-KIET",
  link: { href: "/projects/space-optimizer", label: "View the Space Optimizer project" },
  stageLabel:
    "Diagram: a circle, two triangles, squares, a rectangle and a line are measured onto a grid and packed into a 10 by 7 container, leaving no wasted area.",
  steps: [
    {
      title: "Fill a container as fully as possible",
      body: "The two-dimensional bin packing problem asks how to arrange objects so they make the best use of a container's space. It's NP-hard, with real uses in logistics, manufacturing and space planning.",
    },
    {
      title: "Give the dimensions, or draw it",
      body: "Users can enter the dimensions of a standard shape — a line, triangle, rectangle, circle or square — or draw the object by hand. Any custom drawing is treated as a hand-drawn image.",
    },
    {
      title: "Recognize and measure",
      body: "Every object is measured on the same grid of cells — a circle or a triangle becomes the cells it covers, and hand-drawn images are measured by image recognition — so shapes of different types can be packed together.",
    },
    {
      title: "Generate the placement",
      body: "Optimization algorithms then choose which objects to place and where, to make the most of the container, and report the area left unused — an ASP.NET front end over a Python optimization engine.",
    },
  ],
};

export const pathChapter: StoryChapterMeta = {
  id: "path",
  number: "04",
  title: "From first semester to production",
  context: `${journey[0].year} to ${journey[journey.length - 1].year}`,
  link: { href: "/about", label: "Read the full story" },
};

export const storyChapters: StoryChapterMeta[] = [
  authorizationChapter,
  enterpriseChapter,
  optimizationChapter,
  pathChapter,
];
