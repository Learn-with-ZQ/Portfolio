import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "backend-api",
    title: "Backend & API Development",
    icon: "server",
    description:
      "Robust, secure backends built on .NET Core and ASP.NET — clean architecture, RESTful APIs, JWT authentication, and role-based access that scale with your business.",
    deliverables: [
      "RESTful API design & development",
      "JWT / OAuth authentication",
      "Clean, layered architecture",
      "API documentation with Swagger",
    ],
  },
  {
    id: "database",
    title: "Database Design & Optimization",
    icon: "database",
    description:
      "SQL Server schemas, stored procedures, and queries engineered for performance — from relational design to index tuning and reporting efficiency.",
    deliverables: [
      "Relational schema design",
      "Stored procedure development",
      "Query optimization & index tuning",
      "Reporting & data pipelines",
    ],
  },
  {
    id: "enterprise-web",
    title: "Enterprise Web Applications",
    icon: "globe",
    description:
      "Full-featured business platforms — ERP, campus management, portals — built with ASP.NET MVC, WebForms, and Entity Framework, proven in production with thousands of users.",
    deliverables: [
      "ERP & business module development",
      "Portals & dashboards",
      "Legacy system enhancement",
      "Third-party integrations",
    ],
  },
  {
    id: "mobile",
    title: "Cross-Platform Mobile Apps",
    icon: "smartphone",
    description:
      "Native-feeling mobile applications from a single codebase using React Native and .NET MAUI — including secure, workflow-driven fintech features.",
    deliverables: [
      "React Native applications",
      ".NET MAUI applications",
      "Secure transaction workflows",
      "API-connected mobile features",
    ],
  },
  {
    id: "production-support",
    title: "Production Support & Maintenance",
    icon: "shield",
    description:
      "Keeping live systems healthy — root-cause analysis, debugging critical issues, performance optimization, and deployment assistance that minimizes downtime.",
    deliverables: [
      "Root-cause analysis & debugging",
      "Performance profiling & tuning",
      "Deployment assistance",
      "Stability & reliability improvements",
    ],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    icon: "lightbulb",
    description:
      "Practical guidance grounded in real enterprise delivery — requirements gathering with cross-functional teams, architecture reviews, and pragmatic technology choices.",
    deliverables: [
      "Requirements analysis",
      "Architecture review",
      "Technology selection",
      "Process improvement",
    ],
  },
];
