# Muhammad Zaid Qasim — knowledge base

This file is everything the portfolio chat assistant knows. It answers only from what is written here, so if a fact is missing, the assistant says it doesn't know. Edit it freely — add anything you want visitors to be able to ask about, and keep it in step with `src/data/` when the site changes. Text written in the first person ("I", "my") is Zaid speaking.

## At a glance

- **Name:** Muhammad Zaid Qasim (goes by Zaid)
- **Role:** Software Developer at E-Creatorz, deployed as Resident Engineer at IoBM
- **Location:** Karachi, Pakistan
- **Availability:** Available for opportunities
- **In one line:** I design, build, and maintain secure, scalable enterprise web and mobile applications with .NET, SQL Server, React Native, and .NET MAUI.
- **Résumé:** /Muhammad_Zaid_Qasim_Resume.pdf (PDF download)
- **Years of Experience:** 3+
- **ERP / CMS Modules Delivered:** 15+
- **Projects Completed:** 9+
- **HackerRank Certifications:** 4
- **Focus areas:** .NET Core · Clean Architecture; SQL Server · Stored Procedures · Query Optimization; React Native · .NET MAUI; JWT Auth · RESTful APIs · Production Support

## Biography

Software Developer at E-Creatorz, deployed as a Resident Engineer at IoBM — building ERP systems, campus management platforms, and banking workflow applications used by thousands of people every day.

I am a Software Developer with 3+ years of experience designing, developing, and maintaining enterprise-grade web and mobile applications using C#, .NET, ASP.NET Core, ASP.NET MVC, Web APIs, SQL Server, Entity Framework, React Native, and .NET MAUI.

Currently I work at E-Creatorz as a .NET Developer, deployed as a Resident Engineer at IoBM (Institute of Business Management), where I contribute to the development and maintenance of ERP systems, campus management systems, faculty and student portals, and banking workflow applications.

My work centres on maintainable enterprise systems — clean separation of concerns, stored-procedure data access, robust authentication, and thoughtful API design. I have delivered 15+ ERP/CMS modules serving thousands of students and staff, and I take pride in production support done right: root-cause analysis, performance tuning, and reliability.

Alongside delivery, I am pursuing a Master's in Data Science at NED University, extending my backend depth into analytics and machine learning, and I stay active in community leadership and public speaking.

## Mission and vision

- **Mission:** To build software that is secure, scalable, and genuinely useful — systems that thousands of people can rely on every day.
- **Vision:** Growing toward solution architecture — combining backend engineering depth with data science to deliver measurable business value.

## Experience

### Software Developer — E-Creatorz

- **Deployment:** Resident Engineer at IoBM (Institute of Business Management)
- **Location:** Karachi, Pakistan
- **Dates:** May 2023 – present
- **Technologies:** C#, .NET, ASP.NET WebForms, ASP.NET MVC, REST APIs, Entity Framework, SQL Server, React Native, .NET MAUI

Supporting enterprise-level academic and administrative systems as a Resident Engineer at IoBM — from campus management and ERP modules to cross-platform mobile apps and banking workflows.

Responsibilities:

- Designed, developed, and maintained enterprise web applications using C#, .NET, WebForms, MVC, REST APIs, and Entity Framework.
- Designed and optimized SQL Server databases, stored procedures, and queries to improve application performance and reporting efficiency.
- Contributed to Campus Management System (CMS) modules: student registration, academic management, reporting, surveys, fee management, and trusted-device authentication.
- Developed and maintained ERP modules covering Payroll, Human Resource Management, Supply Chain Management, and Hospital Management systems.
- Enhanced faculty and student portal features: attendance tracking, assessment results, academic monitoring, student ledger, roadmap, and course management.
- Developed cross-platform mobile applications using .NET MAUI and React Native.
- Implemented secure banking transaction workflows in React Native using Maker, Checker, Signatory, and Releasor authorization.
- Resolved production issues through root-cause analysis, improving application stability and minimizing downtime.
- Collaborated with academic, finance, HR, and administrative teams to gather requirements and improve system reliability.
- Successfully delivered 15+ ERP/CMS modules serving thousands of students and staff.

### The systems he works on at IoBM

- **Edu-Smartz CMS** (ASP.NET WebForms, SQL Server): Student registration, Academic management, Fee management, Reporting, Surveys, Trusted-device auth
- **Ebiz-Smartz ERP** (ASP.NET, SQL Server): Payroll, Human resources, Supply chain, Purchase requisition, Hospital management
- **Student and faculty portals** (.NET, .NET MAUI): Attendance, Assessment results, Student ledger, Degree roadmap, Course management, LMS, Academic tracking

## Projects

There are 10 projects. Each has its own page at /projects/<slug>; all of them are at /projects.

### From Alarm to Action

- **Page:** /projects/from-alarm-to-action
- **Category:** Research
- **Context:** NED University · Conference paper, AIIE 2026
- **Dates:** Oct 2026 – Nov 2026
- **Technologies:** Python, scikit-learn, SHAP, Hugging Face Transformers, Granite-3.1-8B, Jupyter, Kaggle
- **Paper title:** From Alarm to Action: Explaining Why Machines Fail and What to Do, Using Machine Learning, Explainable AI and Large Language Models
- **Authors:** Abrar Saleem, Zaid Qasim
- **Venue:** International Conference on AI and IoT for Engineering (AIIE 2026)
- **Presented:** 11 Nov 2026

Conference paper on whether an open-weight LLM can explain machine-failure alarms faithfully: machine learning predicts the failure, SHAP shows why, the LLM writes the maintenance report, and code verifies it.

Predictive maintenance models can warn that a machine is likely to fail, but they rarely say why or what to do about it. In this paper, written with Abrar Saleem during my MS at NED University and presented at AIIE 2026, we tested whether a large language model can turn model evidence into a maintenance report without distorting it.

The design keeps the roles apart: code predicts and decides, the LLM explains, and code checks. A calibrated gradient-boosting model raises a cost-based alarm, four failure-type models rank the likely cause, SHAP identifies the readings behind the score, and knowledge cards supply the permitted actions. Granite-3.1-8B, an open-weight model, writes a structured report from that evidence, and an eleven-check verifier tests every report against it.

We locked 250 test cases from the AI4I 2020 benchmark before any report existed, then scored 2,000 LLM reports across eight conditions automatically, against both the evidence and the dataset's ground truth. With evidence, the LLM's reports were as faithful as a deterministic template. Given raw readings alone, the same model named the true failure type for only 46% of real alarms. Grounding made the LLM a faithful explainer, not a diagnostician.

Highlights:

- 2,000 LLM reports in eight conditions, scored on 250 test cases locked before any report was generated
- The full method matched a deterministic template on numerical fidelity, evidence faithfulness and failure-type correctness (100% each)
- Knowledge cards raised action appropriateness from 31.7% to 100%
- Given deliberately swapped evidence, the LLM followed the evidence in all 100 cases
- Showed the limit of rule-based verification: it catches invented content, but passed reports that described a reading in the wrong direction (2.8–7.2%)

### Net 2 Bank

- **Page:** /projects/net-2-bank
- **Category:** Mobile
- **Context:** E-Creatorz · Enterprise Banking Application
- **Dates:** Nov 2024 – present (ongoing)
- **Technologies:** React Native, REST APIs, JavaScript

Secure banking workflow features for transaction processing in React Native — Maker, Checker, Signatory, and Releasor authorization for IBFT, IFT, and cheque-based transactions.

Net 2 Bank is an enterprise banking application where every transaction passes through a multi-stage authorization pipeline before it reaches the core banking system.

I develop the secure workflow features that power this pipeline: a transaction is created by a Maker, verified by a Checker, approved by a Signatory, and finally executed by a Releasor. This separation of duties is what banks rely on to prevent fraud and enforce accountability.

The workflows cover Inter-Bank Funds Transfer (IBFT), Intra-Bank Funds Transfer (IFT), and cheque-based transactions, all built in React Native for a consistent cross-platform experience.

Highlights:

- Four-stage authorization: Maker → Checker → Signatory → Releasor
- IBFT, IFT, and cheque-based transaction workflows
- Separation-of-duties security model for financial accountability
- Cross-platform delivery with React Native

#### How the Net 2 Bank authorization works

Transaction types: IBFT, IFT, Cheque (inter-bank funds transfer, intra-bank funds transfer, cheques). Every transaction passes four people in order, and whoever makes a transaction never checks it (separation of duties):

1. **Maker** — Creates the transaction
2. **Checker** — Verifies the details
3. **Signatory** — Approves the transfer
4. **Releasor** — Executes it to core banking

### Edu-Smartz Campus Management System

- **Page:** /projects/edu-smartz-cms
- **Category:** Enterprise
- **Context:** E-Creatorz · Deployed at IoBM
- **Dates:** May 2023 – present (ongoing)
- **Technologies:** ASP.NET, WebForms, SQL Server, C#

Enterprise campus management platform covering student registration, fee management, reporting, surveys, trusted-device authentication, and academic operations.

Edu-Smartz CMS is the campus management backbone at IoBM — the system through which students register, fees are managed, surveys run, and academic operations flow.

I contribute to the development and maintenance of its core modules, working directly with the academic, finance, and administrative teams who depend on it daily.

My work spans student registration, academic management, reporting, fee management, surveys, and trusted-device authentication — features serving thousands of students and staff.

Highlights:

- Student registration and academic management modules
- Fee management and financial reporting
- Trusted-device authentication for secure access
- Serves thousands of students and staff at IoBM

### Ebiz-Smartz ERP

- **Page:** /projects/ebiz-smartz-erp
- **Category:** Enterprise
- **Context:** E-Creatorz · Enterprise Resource Planning
- **Dates:** May 2023 – present (ongoing)
- **Technologies:** ASP.NET, SQL Server, C#

ERP platform covering Payroll, Human Resource Management, Supply Chain Management, Purchase Requisition, and Hospital Management for enterprise administrative operations.

Ebiz-Smartz is a full enterprise resource planning suite that runs the administrative side of large organizations.

I work on functionalities across its major modules: Payroll, Human Resource Management (HRM), Supply Chain Management (SCM), Purchase Requisition, and Hospital Management.

The work involves complex business rules, SQL Server stored procedures, and reporting pipelines — the kind of enterprise logic where correctness directly affects salaries, inventory, and operations.

Highlights:

- Payroll and HRM modules with complex business rules
- Supply Chain Management and Purchase Requisition workflows
- Hospital Management system functionality
- Stored-procedure-driven data access and reporting

### Edu-Smartz Student Portal

- **Page:** /projects/edu-smartz-student-portal
- **Category:** Enterprise
- **Context:** E-Creatorz · Web & Mobile
- **Dates:** May 2023 – present (ongoing)
- **Technologies:** .NET, .NET MAUI, ASP.NET, SQL Server

Web and mobile student portal with attendance tracking, assessment results, student ledger, roadmap, course management, and LMS functionality built with .NET and MAUI.

The Edu-Smartz Student Portal is how students interact with their university — checking attendance, viewing assessment results, tracking their academic roadmap, and managing courses.

I implemented portal features across both web and mobile, using .NET for the backend and .NET MAUI to deliver the mobile experience.

Key features I worked on include attendance tracking, assessment results, the student ledger, degree roadmap, course management, and LMS functionality.

Highlights:

- Attendance tracking and assessment results
- Student ledger and academic roadmap
- Course management and LMS features
- Cross-platform mobile app with .NET MAUI

### Edu-Smartz Faculty Portal

- **Page:** /projects/edu-smartz-faculty-portal
- **Category:** Enterprise
- **Context:** E-Creatorz · Academic Systems
- **Dates:** May 2023 – present (ongoing)
- **Technologies:** ASP.NET, SQL Server, C#

Faculty portal with attendance management, surveys, academic tracking, and LMS-related features for enterprise academic systems.

The Faculty Portal is the instructor-facing side of the Edu-Smartz platform — where faculty manage attendance, run surveys, and track academic progress.

I worked on attendance management, survey modules, academic tracking, and LMS-related features that faculty at IoBM use every teaching day.

The portal integrates tightly with the CMS and Student Portal, so changes require careful coordination across the whole academic data model.

Highlights:

- Attendance management for faculty
- Survey and academic tracking modules
- LMS-related features for course delivery
- Deep integration with CMS and Student Portal

### Space Optimizer

- **Page:** /projects/space-optimizer
- **Category:** Academic
- **Context:** Final Year Project · PAF-KIET
- **Dates:** Oct 2023 – Aug 2024
- **Technologies:** ASP.NET, Python, Image Recognition

Intelligent space optimization system for the NP-hard 2D Bin Packing Problem — objects are entered by dimension or drawn by hand, then packed by optimization algorithms.

My Final Year Project tackled the Two-Dimensional Bin Packing Problem (2D-BPP) — an NP-hard optimization problem with real applications in logistics, manufacturing, and space planning.

The system arranges user-defined objects to maximize container space utilization, generating optimized placement strategies through optimization algorithms.

What makes it distinctive is the input method. Users can enter the dimensions of a standard shape — a line, triangle, rectangle, circle or square — or draw an object by hand. Any custom drawing is treated as a hand-drawn image, which integrated image recognition identifies and measures before packing.

Highlights:

- Research on the NP-hard 2D Bin Packing Problem
- Optimization algorithms for placement strategy generation
- Two input modes: dimensions for standard shapes, or a freehand drawing
- Image recognition to identify and measure hand-drawn objects
- ASP.NET front end with Python optimization engine

### Concurrent File Access Control System

- **Page:** /projects/concurrent-file-access-control
- **Category:** Academic
- **Context:** Parallel & Distributed Computing · PAF-KIET
- **Dates:** Jun 2023 – Oct 2023
- **Technologies:** C++, Multithreading

Multithreading-based file access control system using mutex synchronization to manage concurrent file operations and prevent race conditions.

A systems-programming project exploring what happens when multiple threads want the same file at the same time.

I implemented a multithreading-based file access control system in C++ that uses mutex synchronization to coordinate concurrent file operations.

The system prevents race conditions during file access, demonstrating correct lock acquisition and release patterns under concurrent load.

Highlights:

- Mutex-based synchronization for file access
- Race condition prevention under concurrent load
- Multithreaded C++ systems programming

### CODE FUSION

- **Page:** /projects/code-fusion
- **Category:** Academic
- **Context:** Cryptography & Discrete Mathematics · PAF-KIET
- **Dates:** Sep 2022 – Jan 2023
- **Technologies:** Python, Cryptography

File encryption and decryption tool using custom encryption techniques for secure handling of multiple file formats.

A cryptography project implementing file encryption and decryption from first principles.

CODE FUSION applies custom encryption techniques to secure files of multiple formats, handling the full encrypt-store-decrypt lifecycle.

Built in Python as part of my Cryptography and Discrete Mathematics coursework, it was an exercise in translating mathematical foundations into working security code.

Highlights:

- Custom encryption and decryption techniques
- Support for multiple file formats
- Cryptography theory applied in Python

### Water Distribution Management System

- **Page:** /projects/water-distribution-management
- **Category:** Academic
- **Context:** Database Management Systems · PAF-KIET
- **Dates:** Feb 2022 – Jun 2022
- **Technologies:** ASP.NET, MVC, SQL Server

Web-based management system with user authentication, product management, and order processing built on ASP.NET MVC and SQL Server.

A database-driven web application built for my DBMS coursework — and my first full ASP.NET MVC project.

The system manages a water distribution business end to end: user authentication, product management, and order processing.

It was where I first put relational design, normalization, and MVC architecture into practice — foundations I still use in enterprise work today.

Highlights:

- User authentication and role handling
- Product management and order processing
- Relational database design on SQL Server

## Skills

Levels are tiers: Expert, Advanced, Proficient, Familiar.

- **Backend:** .NET Core (Expert), ASP.NET Core (Expert), ASP.NET MVC (Expert), ASP.NET Web API (Expert), ASP.NET WebForms (Advanced), Entity Framework (Advanced), LINQ (Advanced)
- **Languages:** C# (Expert), JavaScript (Advanced), TypeScript (Proficient), Python (Advanced), C++ (Proficient), VB.NET (Proficient)
- **Database:** SQL Server (Expert), Stored Procedures (Expert), Query Optimization (Advanced), Performance Tuning (Advanced)
- **Mobile:** React Native (Advanced), .NET MAUI (Advanced)
- **Frontend:** HTML (Advanced), CSS (Advanced), Angular (Proficient), Responsive Design (Advanced)
- **Core Concepts:** RESTful APIs (Expert), JWT Authentication (Advanced), OAuth (Proficient), SOLID Principles (Advanced), Design Patterns (Advanced), Dependency Injection (Advanced), Async / Await (Advanced), Data Structures & Algorithms (Advanced)
- **Tools & Platforms:** Git & GitHub (Advanced), Visual Studio (Expert), Postman (Advanced), Swagger (Advanced), GitHub Copilot (Advanced), Cursor (Advanced), Claude AI (Advanced)
- **Soft Skills:** Problem Solving (Expert), Production Support (Advanced), Cross-functional Collaboration (Advanced), Leadership & Event Management (Advanced), Public Speaking (Advanced)

## Education

- **Master of Science in Data Science**, NED University of Engineering and Technology, Karachi, Pakistan — Jan 2026 – present (in progress). Coursework: Statistics for Data Science, Data Science Tools & Techniques, Machine Learning.
- **Bachelor of Science in Computer Science**, PAF-KIET (Karachi Institute of Economics and Technology), Main Campus Korangi Creek, Karachi, Pakistan — Sep 2020 – Jun 2024. Coursework: Data Structures & Algorithms, Database Management Systems (DBMS), Machine Learning, Computer Organization & Architecture, Entity Framework & MVC, Data Science.

## Certifications

- C# (Basic) Certification — HackerRank, 2023
- Python — HackerRank, 2023
- Problem Solving — HackerRank, 2023
- SQL — HackerRank, 2023

## Achievements

- **Paper presented — From Alarm to Action** — AIIE 2026, International Conference on AI and IoT for Engineering, 2026 (Research). Co-authored with Abrar Saleem and presented at the conference: a pre-specified evaluation of whether an open-weight large language model can explain predictive-maintenance alarms faithfully, scored on 2,000 reports.
- **Winner — Master Mind Category** — AWS Hackathon, 2020 (Competition). Won the Master Mind category at the AWS Hackathon, competing against teams on cloud-based problem solving.
- **1st Position** — Flair'22 Network Designing Competition, 2022 (Competition). Secured first position in the network designing competition at Flair'22.
- **Runner-Up** — Pakistan Day Programming Competition, 2022 (Competition). Runner-up in a timed competitive programming contest held on Pakistan Day.
- **Runner-Up** — E-Code Chef Speed Programming Competition, 2021 (Competition). Runner-up in a speed programming competition focused on rapid algorithmic problem solving.
- **Head of Delegate Affairs** — YMNA V Leadership Conference, 2025 (Leadership). Led delegate affairs for the fifth YMNA Leadership Conference — coordinating participants, logistics, and the delegate experience.
- **Director of Guest & Protocol** — YMNA IV Leadership Conference, 2023 (Leadership). Directed guest relations and protocol for the fourth YMNA Leadership Conference.
- **Special Mention — Development in IT and Human Rights** — YMNA III, 2023 (Leadership). Received a special mention for contributions on the topic of development in IT and human rights.
- **Head of Programming & Deputy Marketing Manager** — KIET Technological Fair, 2022 (Leadership). Headed the programming competition track and served as deputy marketing manager for the university's technological fair.

## Journey

- **2020 — Started BS Computer Science.** Began my Computer Science journey at PAF-KIET, Karachi — building foundations in data structures, algorithms, databases, and software engineering.
- **2023 — Joined E-Creatorz as Software Developer.** Started building enterprise systems professionally — deployed as a Resident Engineer at IoBM, working on campus management, ERP, and portal systems.
- **2024 — Graduated & Shipped Final Year Project.** Completed my BSCS degree and delivered Space Optimizer — an intelligent 2D bin-packing research project combining optimization algorithms with image recognition.
- **2025 — Banking & Mobile Workflows.** Built secure banking transaction workflows in React Native — Maker, Checker, Signatory, and Releasor authorization for IBFT, IFT, and cheque-based transactions.
- **2026 — Started MS in Data Science.** Enrolled at NED University of Engineering and Technology to extend my engineering depth into statistics, machine learning, and data science.
- **2026 — Presented a Conference Paper at AIIE 2026.** Co-authored and presented “From Alarm to Action”: machine learning predicts a machine failure, SHAP shows why, and a large language model explains what to do, with every report checked by code.

## Services he offers

- **Backend & API Development:** Robust, secure backends built on .NET Core and ASP.NET — clean architecture, RESTful APIs, JWT authentication, and role-based access that scale with your business. Deliverables: RESTful API design & development; JWT / OAuth authentication; Clean, layered architecture; API documentation with Swagger.
- **Database Design & Optimization:** SQL Server schemas, stored procedures, and queries engineered for performance — from relational design to index tuning and reporting efficiency. Deliverables: Relational schema design; Stored procedure development; Query optimization & index tuning; Reporting & data pipelines.
- **Enterprise Web Applications:** Full-featured business platforms — ERP, campus management, portals — built with ASP.NET MVC, WebForms, and Entity Framework, proven in production with thousands of users. Deliverables: ERP & business module development; Portals & dashboards; Legacy system enhancement; Third-party integrations.
- **Cross-Platform Mobile Apps:** Native-feeling mobile applications from a single codebase using React Native and .NET MAUI — including secure, workflow-driven fintech features. Deliverables: React Native applications; .NET MAUI applications; Secure transaction workflows; API-connected mobile features.
- **Production Support & Maintenance:** Keeping live systems healthy — root-cause analysis, debugging critical issues, performance optimization, and deployment assistance that minimizes downtime. Deliverables: Root-cause analysis & debugging; Performance profiling & tuning; Deployment assistance; Stability & reliability improvements.
- **Technical Consulting:** Practical guidance grounded in real enterprise delivery — requirements gathering with cross-functional teams, architecture reviews, and pragmatic technology choices. Deliverables: Requirements analysis; Architecture review; Technology selection; Process improvement.

## Contact and links

- **Email:** zaidqasim1234@gmail.com
- **Phone:** +92 301 1552289
- **Location:** Karachi, Pakistan
- **Contact form:** /contact
- **GitHub:** https://github.com/Learn-with-ZQ
- **LinkedIn:** https://www.linkedin.com/in/m-zaid-qasim
- **HackerRank:** https://www.hackerrank.com/profile/learnwithzq

## Pages on this site

- / — Home — the four-chapter story of his work
- /about — Biography, focus areas, mission and vision, journey
- /experience — Current role and responsibilities
- /projects — All projects, filterable
- /skills — Skills by category with level tiers
- /services — What he can be hired for
- /education — Degrees and coursework
- /certifications — HackerRank certifications
- /achievements — Research, competitions, leadership
- /testimonials — Testimonials and a form to leave one
- /contact — Contact form and direct details
