import type { Education } from "@/types";

export const educationList: Education[] = [
  {
    id: "msds-ned",
    degree: "Master of Science in Data Science",
    shortDegree: "MS Data Science",
    institute: "NED University of Engineering and Technology",
    location: "Karachi, Pakistan",
    startDate: "2026-01",
    endDate: null,
    coursework: [
      "Statistics for Data Science",
      "Data Science Tools & Techniques",
      "Machine Learning",
    ],
  },
  {
    id: "bscs-kiet",
    degree: "Bachelor of Science in Computer Science",
    shortDegree: "BS Computer Science",
    institute: "PAF-KIET (Karachi Institute of Economics and Technology)",
    location: "Main Campus Korangi Creek, Karachi, Pakistan",
    startDate: "2020-09",
    endDate: "2024-06",
    cgpa: "3.06 / 4.00",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Machine Learning",
      "Computer Organization & Architecture",
      "Entity Framework & MVC",
      "Data Science",
    ],
  },
];
