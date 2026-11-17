import type { SkillCategory } from "@/types";

/**
 * Skills, grouped as on the résumé (updated 2026-11-16), which is the source
 * of truth. No self-ratings: the site stopped showing Expert/Advanced tiers
 * (audit A3) — evidence lives in the experience and project pages instead.
 *
 * This is the bundled FALLBACK. The live list comes from the Portfolio API
 * (`lib/content.ts`), so change the database too (D:\API\Portfolio).
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: [
      { name: ".NET / .NET Core" },
      { name: "ASP.NET Core" },
      { name: "ASP.NET MVC" },
      { name: "ASP.NET Web API" },
      { name: "Minimal APIs" },
      { name: "ASP.NET WebForms" },
      { name: "Entity Framework" },
      { name: "LINQ" },
      { name: "RESTful APIs" },
      { name: "Middleware" },
      { name: "JWT Authentication" },
      { name: "OAuth" },
      { name: "API Integration" },
    ],
  },
  {
    id: "database",
    title: "Database & query optimization",
    icon: "database",
    skills: [
      { name: "Microsoft SQL Server" },
      { name: "T-SQL" },
      { name: "Complex queries" },
      { name: "Stored procedures" },
      { name: "Query execution plans" },
      { name: "Query optimization" },
      { name: "Index optimization" },
      { name: "Database performance tuning" },
      { name: "Transactions & ACID" },
      { name: "Database normalization" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: [
      { name: "C#" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "C++" },
    ],
  },
  {
    id: "engineering",
    title: "Software engineering",
    icon: "braces",
    skills: [
      { name: "Object-oriented programming" },
      { name: "SOLID principles" },
      { name: "Design patterns" },
      { name: "Dependency Injection" },
      { name: "Async / await" },
      { name: "Data structures & algorithms" },
      { name: "Debugging & root-cause analysis" },
      { name: "Production support" },
      { name: "Legacy code maintenance" },
      { name: "Application performance optimization" },
      { name: "Secure authentication" },
    ],
  },
  {
    id: "mobile-frontend",
    title: "Mobile & frontend",
    icon: "smartphone",
    skills: [
      { name: "React Native" },
      { name: ".NET MAUI" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Angular" },
      { name: "Responsive design" },
    ],
  },
  {
    id: "ai-data",
    title: "AI & data science",
    icon: "sparkles",
    // From the AIIE 2026 paper, the MS, and the Bano Qabil course he teaches.
    skills: [
      { name: "Prompt engineering" },
      { name: "Machine learning" },
      { name: "scikit-learn" },
      { name: "SHAP (model explanations)" },
      { name: "Hugging Face Transformers" },
      { name: "LLM evaluation" },
    ],
  },
  {
    id: "messaging",
    title: "Messaging & distributed systems (working knowledge)",
    icon: "network",
    skills: [
      { name: "Apache Kafka" },
      { name: "RabbitMQ" },
      { name: "Message queues" },
      { name: "Event-driven architecture" },
    ],
  },
  {
    id: "tools",
    title: "Tools & platforms",
    icon: "wrench",
    skills: [
      { name: "Git & GitHub" },
      { name: "Visual Studio" },
      { name: "Postman" },
      { name: "Swagger" },
      { name: "GitHub Copilot" },
      { name: "Cursor" },
      { name: "Claude" },
    ],
  },
];

export const heroTechnologies = [
  "C#",
  ".NET Core",
  "ASP.NET Core",
  "SQL Server",
  "Entity Framework",
  "React Native",
  ".NET MAUI",
  "REST APIs",
  "Python",
  "TypeScript",
];
