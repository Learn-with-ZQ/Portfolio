import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "net-2-bank",
    name: "Net 2 Bank",
    category: "Mobile",
    context: "E-Creatorz · Enterprise Banking Application",
    summary:
      "Secure banking workflow features for transaction processing in React Native — Maker, Checker, Signatory, and Releasor authorization for IBFT, IFT, and cheque-based transactions.",
    description: [
      "Net 2 Bank is an enterprise banking application where every transaction passes through a multi-stage authorization pipeline before it reaches the core banking system.",
      "I develop the secure workflow features that power this pipeline: a transaction is created by a Maker, verified by a Checker, approved by a Signatory, and finally executed by a Releasor. This separation of duties is what banks rely on to prevent fraud and enforce accountability.",
      "The workflows cover Inter-Bank Funds Transfer (IBFT), Intra-Bank Funds Transfer (IFT), and cheque-based transactions, all built in React Native for a consistent cross-platform experience.",
    ],
    highlights: [
      "Four-stage authorization: Maker → Checker → Signatory → Releasor",
      "IBFT, IFT, and cheque-based transaction workflows",
      "Separation-of-duties security model for financial accountability",
      "Cross-platform delivery with React Native",
    ],
    technologies: ["React Native", "REST APIs", "JavaScript"],
    startDate: "2024-11",
    endDate: null,
    featured: true,
  },
  {
    slug: "edu-smartz-cms",
    name: "Edu-Smartz Campus Management System",
    category: "Enterprise",
    context: "E-Creatorz · Deployed at IoBM",
    summary:
      "Enterprise campus management platform covering student registration, fee management, reporting, surveys, trusted-device authentication, and academic operations.",
    description: [
      "Edu-Smartz CMS is the campus management backbone at IoBM — the system through which students register, fees are managed, surveys run, and academic operations flow.",
      "I contribute to the development and maintenance of its core modules, working directly with the academic, finance, and administrative teams who depend on it daily.",
      "My work spans student registration, academic management, reporting, fee management, surveys, and trusted-device authentication — features serving thousands of students and staff.",
    ],
    highlights: [
      "Student registration and academic management modules",
      "Fee management and financial reporting",
      "Trusted-device authentication for secure access",
      "Serves thousands of students and staff at IoBM",
    ],
    technologies: ["ASP.NET", "WebForms", "SQL Server", "C#"],
    startDate: "2023-05",
    endDate: null,
    featured: true,
  },
  {
    slug: "ebiz-smartz-erp",
    name: "Ebiz-Smartz ERP",
    category: "Enterprise",
    context: "E-Creatorz · Enterprise Resource Planning",
    summary:
      "ERP platform covering Payroll, Human Resource Management, Supply Chain Management, Purchase Requisition, and Hospital Management for enterprise administrative operations.",
    description: [
      "Ebiz-Smartz is a full enterprise resource planning suite that runs the administrative side of large organizations.",
      "I work on functionalities across its major modules: Payroll, Human Resource Management (HRM), Supply Chain Management (SCM), Purchase Requisition, and Hospital Management.",
      "The work involves complex business rules, SQL Server stored procedures, and reporting pipelines — the kind of enterprise logic where correctness directly affects salaries, inventory, and operations.",
    ],
    highlights: [
      "Payroll and HRM modules with complex business rules",
      "Supply Chain Management and Purchase Requisition workflows",
      "Hospital Management system functionality",
      "Stored-procedure-driven data access and reporting",
    ],
    technologies: ["ASP.NET", "SQL Server", "C#"],
    startDate: "2023-05",
    endDate: null,
    featured: true,
  },
  {
    slug: "edu-smartz-student-portal",
    name: "Edu-Smartz Student Portal",
    category: "Enterprise",
    context: "E-Creatorz · Web & Mobile",
    summary:
      "Web and mobile student portal with attendance tracking, assessment results, student ledger, roadmap, course management, and LMS functionality built with .NET and MAUI.",
    description: [
      "The Edu-Smartz Student Portal is how students interact with their university — checking attendance, viewing assessment results, tracking their academic roadmap, and managing courses.",
      "I implemented portal features across both web and mobile, using .NET for the backend and .NET MAUI to deliver the mobile experience.",
      "Key features I worked on include attendance tracking, assessment results, the student ledger, degree roadmap, course management, and LMS functionality.",
    ],
    highlights: [
      "Attendance tracking and assessment results",
      "Student ledger and academic roadmap",
      "Course management and LMS features",
      "Cross-platform mobile app with .NET MAUI",
    ],
    technologies: [".NET", ".NET MAUI", "ASP.NET", "SQL Server"],
    startDate: "2023-05",
    endDate: null,
    featured: false,
  },
  {
    slug: "edu-smartz-faculty-portal",
    name: "Edu-Smartz Faculty Portal",
    category: "Enterprise",
    context: "E-Creatorz · Academic Systems",
    summary:
      "Faculty portal with attendance management, surveys, academic tracking, and LMS-related features for enterprise academic systems.",
    description: [
      "The Faculty Portal is the instructor-facing side of the Edu-Smartz platform — where faculty manage attendance, run surveys, and track academic progress.",
      "I worked on attendance management, survey modules, academic tracking, and LMS-related features that faculty at IoBM use every teaching day.",
      "The portal integrates tightly with the CMS and Student Portal, so changes require careful coordination across the whole academic data model.",
    ],
    highlights: [
      "Attendance management for faculty",
      "Survey and academic tracking modules",
      "LMS-related features for course delivery",
      "Deep integration with CMS and Student Portal",
    ],
    technologies: ["ASP.NET", "SQL Server", "C#"],
    startDate: "2023-05",
    endDate: null,
    featured: false,
  },
  {
    slug: "space-optimizer",
    name: "Space Optimizer",
    category: "Academic",
    context: "Final Year Project · PAF-KIET",
    summary:
      "Intelligent space optimization system for the NP-hard 2D Bin Packing Problem — combining optimization algorithms with image recognition for hand-drawn object input.",
    description: [
      "My Final Year Project tackled the Two-Dimensional Bin Packing Problem (2D-BPP) — an NP-hard optimization problem with real applications in logistics, manufacturing, and space planning.",
      "The system arranges user-defined objects to maximize container space utilization, generating optimized placement strategies through optimization algorithms.",
      "What makes it distinctive is the input method: integrated image recognition identifies hand-drawn objects, so users can sketch shapes and have the system recognize, measure, and pack them automatically.",
    ],
    highlights: [
      "Research on the NP-hard 2D Bin Packing Problem",
      "Optimization algorithms for placement strategy generation",
      "Image recognition for hand-drawn object input",
      "ASP.NET front end with Python optimization engine",
    ],
    technologies: ["ASP.NET", "Python", "Image Recognition"],
    startDate: "2023-10",
    endDate: "2024-08",
    featured: true,
  },
  {
    slug: "concurrent-file-access-control",
    name: "Concurrent File Access Control System",
    category: "Academic",
    context: "Parallel & Distributed Computing · PAF-KIET",
    summary:
      "Multithreading-based file access control system using mutex synchronization to manage concurrent file operations and prevent race conditions.",
    description: [
      "A systems-programming project exploring what happens when multiple threads want the same file at the same time.",
      "I implemented a multithreading-based file access control system in C++ that uses mutex synchronization to coordinate concurrent file operations.",
      "The system prevents race conditions during file access, demonstrating correct lock acquisition and release patterns under concurrent load.",
    ],
    highlights: [
      "Mutex-based synchronization for file access",
      "Race condition prevention under concurrent load",
      "Multithreaded C++ systems programming",
    ],
    technologies: ["C++", "Multithreading"],
    startDate: "2023-06",
    endDate: "2023-10",
    featured: false,
  },
  {
    slug: "code-fusion",
    name: "CODE FUSION",
    category: "Academic",
    context: "Cryptography & Discrete Mathematics · PAF-KIET",
    summary:
      "File encryption and decryption tool using custom encryption techniques for secure handling of multiple file formats.",
    description: [
      "A cryptography project implementing file encryption and decryption from first principles.",
      "CODE FUSION applies custom encryption techniques to secure files of multiple formats, handling the full encrypt-store-decrypt lifecycle.",
      "Built in Python as part of my Cryptography and Discrete Mathematics coursework, it was an exercise in translating mathematical foundations into working security code.",
    ],
    highlights: [
      "Custom encryption and decryption techniques",
      "Support for multiple file formats",
      "Cryptography theory applied in Python",
    ],
    technologies: ["Python", "Cryptography"],
    startDate: "2022-09",
    endDate: "2023-01",
    featured: false,
  },
  {
    slug: "water-distribution-management",
    name: "Water Distribution Management System",
    category: "Academic",
    context: "Database Management Systems · PAF-KIET",
    summary:
      "Web-based management system with user authentication, product management, and order processing built on ASP.NET MVC and SQL Server.",
    description: [
      "A database-driven web application built for my DBMS coursework — and my first full ASP.NET MVC project.",
      "The system manages a water distribution business end to end: user authentication, product management, and order processing.",
      "It was where I first put relational design, normalization, and MVC architecture into practice — foundations I still use in enterprise work today.",
    ],
    highlights: [
      "User authentication and role handling",
      "Product management and order processing",
      "Relational database design on SQL Server",
    ],
    technologies: ["ASP.NET", "MVC", "SQL Server"],
    startDate: "2022-02",
    endDate: "2022-06",
    featured: false,
  },
];

export const projectCategories = ["All", "Enterprise", "Mobile", "Academic"] as const;

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
