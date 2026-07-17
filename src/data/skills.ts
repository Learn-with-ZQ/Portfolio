import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: [
      { name: ".NET Core", level: 92 },
      { name: "ASP.NET Core", level: 92 },
      { name: "ASP.NET MVC", level: 90 },
      { name: "ASP.NET Web API", level: 90 },
      { name: "ASP.NET WebForms", level: 85 },
      { name: "Entity Framework", level: 85 },
      { name: "LINQ", level: 88 },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: [
      { name: "C#", level: 92 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 78 },
      { name: "Python", level: 82 },
      { name: "C++", level: 75 },
      { name: "VB.NET", level: 70 },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: "database",
    skills: [
      { name: "SQL Server", level: 90 },
      { name: "Stored Procedures", level: 92 },
      { name: "Query Optimization", level: 85 },
      { name: "Performance Tuning", level: 82 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: "smartphone",
    skills: [
      { name: "React Native", level: 82 },
      { name: ".NET MAUI", level: 80 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "HTML", level: 88 },
      { name: "CSS", level: 85 },
      { name: "Angular", level: 75 },
      { name: "Responsive Design", level: 85 },
    ],
  },
  {
    id: "concepts",
    title: "Core Concepts",
    icon: "braces",
    skills: [
      { name: "RESTful APIs", level: 90 },
      { name: "JWT Authentication", level: 88 },
      { name: "OAuth", level: 78 },
      { name: "SOLID Principles", level: 85 },
      { name: "Design Patterns", level: 82 },
      { name: "Dependency Injection", level: 88 },
      { name: "Async / Await", level: 88 },
      { name: "Data Structures & Algorithms", level: 85 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "wrench",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Visual Studio", level: 90 },
      { name: "Postman", level: 88 },
      { name: "Swagger", level: 85 },
      { name: "GitHub Copilot", level: 85 },
      { name: "Cursor", level: 80 },
      { name: "Claude AI", level: 85 },
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    icon: "users",
    skills: [
      { name: "Problem Solving", level: 90 },
      { name: "Production Support", level: 88 },
      { name: "Cross-functional Collaboration", level: 85 },
      { name: "Leadership & Event Management", level: 82 },
      { name: "Public Speaking", level: 80 },
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
