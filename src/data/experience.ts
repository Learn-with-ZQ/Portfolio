import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "e-creatorz",
    role: "Software Developer",
    company: "E-Creatorz",
    location: "Karachi, Pakistan",
    startDate: "2023-05",
    endDate: null,
    // Mirrors the résumé (updated 2026-11-16). Keep the two in step.
    summary:
      "Building and maintaining enterprise applications for banking, ERP, campus management, HR, and healthcare — C#, .NET, and SQL Server on the back end, .NET MAUI and React Native on mobile.",
    responsibilities: [
      "Design, develop, maintain, and optimize enterprise applications using C#, .NET, ASP.NET Core, ASP.NET MVC, WebForms, RESTful APIs, Entity Framework, LINQ, and Microsoft SQL Server.",
      "Develop and optimize complex SQL queries, stored procedures, indexes, and database operations, analyzing execution plans to find performance bottlenecks and improve response times.",
      "Independently investigate and resolve production database performance issues through query optimization, stored procedure tuning, and structured root-cause analysis.",
      "Troubleshoot application, API, database, and integration issues across existing and legacy codebases, shipping reliable enhancements without disrupting business-critical functionality.",
      "Work across the software development lifecycle: requirements analysis, implementation, debugging, deployment, performance optimization, production support, and maintenance.",
      "Apply Dependency Injection, SOLID principles, design patterns, asynchronous programming, middleware, and layered application architecture.",
      "Develop and maintain ERP and Campus Management System modules: student registration, academic management, fee management, attendance, assessments, reporting, surveys, Payroll, HRM, Supply Chain Management, and Hospital Management.",
      "Develop and integrate RESTful APIs and banking transaction workflows with Maker, Checker, Signatory, and Releasor authorization.",
      "Support enterprise applications hosted on IIS, working with QA, business stakeholders, and cross-functional teams to investigate production issues and deliver lasting fixes.",
      "Build cross-platform mobile features with .NET MAUI and React Native, integrating backend APIs and enterprise authentication workflows.",
      "Contributed to 15+ ERP and Campus Management modules serving thousands of students and staff.",
    ],
    technologies: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "ASP.NET MVC",
      "ASP.NET WebForms",
      "REST APIs",
      "Entity Framework",
      "LINQ",
      "SQL Server",
      "IIS",
      "React Native",
      ".NET MAUI",
    ],
  },
];
